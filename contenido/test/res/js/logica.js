/**
 * Modulo Principal. Es el encargado de controlar el proceso del juego
 */


import Ficha 	   from "./clases/Ficha.js";
import Jugador     from "./clases/Jugador.js";
import Partida     from "./clases/Partida.js";
import Tablero     from "./clases/Tablero.js";
import Tesoro      from "./clases/Tesoro.js";





function setTesoroAvatar(imgId,imageSrc)
{
	$("#" + imgId).attr("hidden",false);
	$("#" + imgId).attr("src",imageSrc);
	
}


function rotarFichaSobrante(numeroFicha, contenedor, partida) 
{
	if(partida.estaEnInsercion())
	{
		const nuevaFicha = new Ficha(numeroFicha);

		nuevaFicha.rotarIzquierda();
		contenedor.src = "res/img/fichas/" + nuevaFicha.numeroActual + ".png";
		
		partida.fichaSobrante = nuevaFicha;
	}

}

function redibujarFicha(fila,columna,nuevaFicha)
{
	const imgFicha = $("#Ficha" + fila + "000" + columna);
	imgFicha.attr("src","res/img/fichas/" + nuevaFicha + ".png");
}


function redibujarFichaSobrante(fichaSobrante, partida)
{
	partida.fichaSobrante = fichaSobrante;
	const contenedorFichaSobrante = document.getElementById("fichaSobrante");
	contenedorFichaSobrante.removeEventListener("click",rotarFichaSobrante);
	contenedorFichaSobrante.addEventListener("click",function(){avisarRotarFichaSobrante(fichaSobrante,contenedorFichaSobrante,partida);});
	contenedorFichaSobrante.src = "res/img/fichas/" + fichaSobrante.numeroActual + ".png";
}


function desactivarRotacionFicha(partida,tablero,socket)
{

}

function desactivarFlechas(partida,tablero,socket)
{

	//Si las flechas se desactivan, también desactiva la rotación de la ficha
	desactivarRotacionFicha(partida,tablero,socket);

	//Elimina el listener y las animaciones de todas las flechas
	let flechaActual = null;
	let flechaHTML = null;

	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		flechaActual= tablero.listaFlechas[flecha]; //Obtiene la instancia de la flecha

		//Agrega el listener según el id de la flecha
		//flechaHTML = document.getElementById("Flecha" + flechaActual.id);
		//flechaHTML.removeEventListener("click",avisarFlecha);
		
		$("#Flecha" + flechaActual.id).off("click");

		//Agrega efecto over a la flecha con las animaciones de CSS
		if(flechaActual.orientacion === "vertical-superior")
		{
			$("#Flecha" + flechaActual.id).removeClass("animacionFlechasVerticales");
		}
	}
}


function deshabilitarInsercion(partida,tablero, socket)
{
	desactivarFlechas(partida,tablero,socket);
	partida.proximaFase();
	
}

function deshabilitarMovimiento()
{
	$(".animacionCaminoResaltado").removeClass("animacionCaminoResaltado");
}


function moverJugador(partida,tablero,fila,columna, socket)
{

	if(partida.estaEnMovimiento() && tablero.verificarMovimientosPermitidos(fila,columna))
	{

		deshabilitarMovimiento();
		tablero.limpiarMovimientosPermitidos();
		partida.proximaFase();partida.proximaFase();
		partida.moverJugadorActual(fila,columna);

		if(partida.tesoroEncontrado(fila,columna))
		{
			//Envía el ID del tesoro que se comió
			socket.emit("comerTesoro",partida.jugadores[partida.miId].tesoroAsignado.id);

			//Pide un nuevo tesoro por socket
			socket.emit("solicitarTesoro","Por favor!");
		}

		if(partida.esMiTurno())
			socket.emit("finTurno","");

		/*partida.asignarProximoJugador();
		proximoTurno(partida,tablero,socket);*/
	}
}

function avisarMoverJugador(partida,tablero,fila,columna,socket)
{
	if(partida.esMiTurno())
		socket.emit("movimiento","{\"fila\" : "+fila+" , \"columna\" : "+columna+"}");
}

/**
 * Activa todos los eventos encargados de capturar el movimiento del jugador
 * @param {Partida} partida 
 * @param {Tablero} tablero 
 */
function activarListenersFichas(partida,tablero,socket)
{
	//Setea un listener en todas las fichas

	let fichaHTML = null;
	for(let fila = 0; fila < tablero.filas; ++fila)
	{
		for(let columna = 0; columna < tablero.columnas; ++columna)
		{
			//Agrega el listener según el id de la ficha
			fichaHTML = document.getElementById("bloque" + fila + "000" + columna);
			fichaHTML.addEventListener("click",function(){avisarMoverJugador(partida,tablero,fila,columna, socket);});
		}
	}	
}

function habilitarMovimiento(partida,tablero)
{
	partida.actualizarInformacionEstados();
	const accionActual = $("#accionActual");
	accionActual.text("Moviendose...");

	//Obtiene el jugador con el turno actual
	
	const jugador = partida.jugadores[partida.jugadorTurno];

	tablero.reiniciarMovimientosPermitidos(); //Anula los movimientos permitidos anteriores
	tablero.calcularMovimientosPermitidos(jugador.filaActual, jugador.columnaActual); //Calcula los movimientos permitidos de acuerdo con la ubicación del jugador

	const movimientosPermitidos = tablero.getMovimientosPermitidos();

	//Elimina todos los filtros anteriores
	$(".animacionCaminoResaltado").removeClass("animacionCaminoResaltado");

	//Recorre cada movimiento permitido 
	for(let m = 0; m < movimientosPermitidos.length; ++m)
	{
		const camino = movimientosPermitidos[m];

		$("#Filtro"+camino[0] + "000" + camino[1]).addClass("animacionCaminoResaltado");
	}

}

/**
 * Función disparada al presionar sobre una flecha. Permite realizar la inserción
 * según la flecha presionada
 * @param {Partida} partida Instancia de la partida
 * @param {Tablero} tablero Instancia del tablero
 * @param {Number} flecha  posición del array de flechas de la flecha presionada
 */
function flechaPresionada(partida,tablero, flechaPresionada)
{
	if(partida.estaEnInsercion())
	{
		//Obtiene la instancia de la flecha presionada
		let fichaRemplazada = null;
		let aux = null;
		let fichaPerdida = null;

		
		const columna = flechaPresionada.columnaFilaAsociada;
		const filaAsociada  = flechaPresionada.columnaFilaAsociada;

		//Realiza la inserción según la posición de la flecha
		switch(flechaPresionada.orientacion)
		{

		case "lateral-derecha":
	
			fichaPerdida = tablero.getFicha(filaAsociada,0); //La que se pierde del tablero sería la ficha más a la izquierda
			fichaRemplazada = tablero.getFicha(filaAsociada, tablero.columnas -1); //La ficha a remplazar primero es la ficha más a la derecha

			for(let columnai = tablero.filas-1; columnai >= 0; --columnai)
			{
				aux = tablero.getFicha(filaAsociada,columnai);
				tablero.setFicha(fichaRemplazada,filaAsociada,columnai);
				fichaRemplazada = aux;
				//Indica al tablero que debe redibujar la ficha
				redibujarFicha(filaAsociada,columnai,tablero.getFicha(filaAsociada,columnai).numeroActual);
			}

			//Intercambia la ficha rotada por la primer ficha
			fichaRemplazada = partida.fichaSobrante;
			partida.fichaSobrante = fichaPerdida;
			tablero.setFicha(fichaRemplazada,filaAsociada,tablero.columnas -1);
			redibujarFicha(filaAsociada,tablero.columnas -1,tablero.getFicha(filaAsociada,tablero.columnas -1).numeroActual);

			break;


		case "lateral-izquierda":
		
			fichaPerdida = tablero.getFicha(filaAsociada, tablero.columnas -1); //La que se pierde del tablero sería la ficha más a la derecha
			fichaRemplazada = tablero.getFicha(filaAsociada,0); //La ficha a remplazar primero es la ficha más a la izquierda

			for(let columnai = 1; columnai < tablero.filas; ++columnai)
			{
				aux = tablero.getFicha(filaAsociada,columnai);
				tablero.setFicha(fichaRemplazada,filaAsociada,columnai);
				fichaRemplazada = aux;
				//Indica al tablero que debe redibujar la ficha
				redibujarFicha(filaAsociada,columnai,tablero.getFicha(filaAsociada,columnai).numeroActual);
			}

			//Intercambia la ficha rotada por la primer ficha
			fichaRemplazada = partida.fichaSobrante;
			partida.fichaSobrante = fichaPerdida;
			tablero.setFicha(fichaRemplazada,filaAsociada,0);
			redibujarFicha(filaAsociada,0,tablero.getFicha(filaAsociada,0).numeroActual);

			break;
				
		case "vertical-superior":
			
			fichaPerdida = tablero.getFicha(tablero.filas -1, columna); //La que se pierde del tablero
			fichaRemplazada = tablero.getFicha(0,columna);

			for(let fila = 1; fila < tablero.filas; ++fila)
			{
				aux = tablero.getFicha(fila,columna);
				tablero.setFicha(fichaRemplazada,fila,columna);
				fichaRemplazada = aux;
				//Indica al tablero que debe redibujar la ficha
				redibujarFicha(fila,columna,tablero.getFicha(fila,columna).numeroActual);
			}

			//Intercambia la ficha rotada por la primer ficha
			fichaRemplazada = partida.fichaSobrante;
			partida.fichaSobrante = fichaPerdida;
			tablero.setFicha(fichaRemplazada,0,columna);
			redibujarFicha(0,columna,tablero.getFicha(0,columna).numeroActual);
			
			break;
		case "vertical-inferior":
			
			fichaPerdida = tablero.getFicha(0, columna); //La que se pierde del tablero va a ser la primer ficha
			fichaRemplazada = tablero.getFicha(tablero.filas-1,columna);

			for(let fila = tablero.filas - 1; fila >= 0 ; --fila)
			{
				aux = tablero.getFicha(fila,columna);
				tablero.setFicha(fichaRemplazada,fila,columna);
				fichaRemplazada = aux;
				//Indica al tablero que debe redibujar la ficha
				redibujarFicha(fila,columna,tablero.getFicha(fila,columna).numeroActual);
			}

			//Intercambia la ficha rotada por la primer ficha
			fichaRemplazada = partida.fichaSobrante;
			partida.fichaSobrante = fichaPerdida;
			tablero.setFicha(fichaRemplazada,tablero.filas-1,columna);
			redibujarFicha(tablero.filas-1,columna,tablero.getFicha(tablero.filas-1,columna).numeroActual);
			
			break;
		}
		redibujarFichaSobrante(partida.fichaSobrante,partida);

		//Una vez se ha presionado la flecha, se habilita el movimiento
		deshabilitarInsercion(partida,tablero,0);
		habilitarMovimiento(partida,tablero);
	}
}

function toggleClaseAnimacion(idElemento, nombreAnimacion)
{
	const contenedor = document.getElementById(idElemento);

	if(!contenedor.classList.contains(nombreAnimacion))
	{
		contenedor.classList.add(nombreAnimacion);
	}
	else
	{
		contenedor.classList.remove(nombreAnimacion);
	}
}

function toggleMovimientoHorizontal(idFlecha)
{
	//toggleClaseAnimacion(idFlecha,"animacionFlechasHorizontales");
}


function toggleMovimientoVertical(idFlecha)
{
	toggleClaseAnimacion(idFlecha,"animacionFlechasVerticales");
}


function avisarFlecha(partida,tablero,flecha,socket)
{
	console.log("Avisando flecha " +flecha+ ",  con el socket: " + socket.id);
	//El socket le avisa al servidor que realizó la inserción, enviandole el id de la fecha con la cual realizó la inserción
	socket.emit("insercion","" + flecha);

}

function activarEventosFlechas(partida,tablero,socket)
{

	//Setea un listener en todas las flechas
	let flechaActual = null;
	//let flechaHTML = null;
	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		flechaActual= tablero.listaFlechas[flecha]; //Obtiene la instancia de la flecha

		//Agrega el listener según el id de la flecha
		//flechaHTML = document.getElementById("Flecha" + flechaActual.id);
		//flechaHTML.addEventListener("click",function(){/*flechaPresionada(partida,tablero,flecha);*/ avisarFlecha(partida,tablero,flecha,socket);});
		$("#Flecha" + flechaActual.id).click(function() {avisarFlecha(partida,tablero,flecha,socket);});
	}

}

function habilitarInsercion(partida,tablero, socket)
{
	partida.actualizarInformacionEstados();
	//Setea un listener en todas las flechas
	let flechaActual = null;
	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		
	
		flechaActual = tablero.listaFlechas[flecha];
		//Agrega efecto over a la flecha con las animaciones de CSS
		if(flechaActual.orientacion === "vertical-superior" || flechaActual.orientacion === "vertical-inferior")
		{
			toggleMovimientoVertical("Flecha" + flechaActual.id);
			
		}
		else if(flechaActual.orientacion === "lateral-izquierda" || flechaActual.orientacion === "lateral-derecha")
		{
			toggleMovimientoHorizontal("Flecha" + flechaActual.id);
		}

	}
	activarEventosFlechas(partida,tablero, socket);
	activarEventosFlechas(partida,tablero, socket);
}


function proximoTurno(partida,tablero, socket)
{

	if(!partida.finalizada)
	{
		//partida.asignarProximoJugador();
		partida.representarTurnoJugadorActual();
		partida.actualizarInformacionEstados();
		if(partida.esMiTurno())
		{
			alert("Es mi turno");
			habilitarInsercion(partida,tablero, socket);
		}
		else
		{
			desactivarFlechas(partida,tablero,socket);
		}

		//Fin del turno
		//partida.jugadorTurno = (partida.jugadorTurno + 1) % partida.jugadores.length; //TODO: ver que pasa con los jugadores descalificados
		//partida.contadorTurnos++;
	}
	else
	{
		//Despliega un mensaje indicando quien fue el ganador, y algunas estadísticas adicionales
		//partida.finalizar();
	}
}

function avisarRotarFichaSobrante(fichaSobrante,contenedorFichaSobrante, partida, socket)
{
	if(partida.esMiTurno())
		socket.emit("rotarFicha",partida.fichaSobrante.numeroActual);
}

/**
 * Este método recibe las variables necesarias para el desarrollo del juego
 * 
 */
function inicializarVariables(estructura, socket)
{

	const filas = Number(estructura["filas"]);
	const columnas = Number(estructura["columnas"]);
	const tiempoTurno = 120;
	const ayudas = true;

	const partida = new Partida();
	partida.tesorosPorJugador = Number(estructura["cantidadTesoros"]);

	if(partida.miId < 0)
		socket.emit("Asigneme","porfa", function (response) {
			console.log(response);
		});


	
	socket.on("deme",function(data){
		/*socket.emit("Asigneme","porfa", function (response) {
			console.log(response);
		});*/
		console.log("Soy el jugador con el id: " + data);
		partida.miId = Number(data);
		partida.distingame();
		socket.emit("solicitarTesoro","Por favor!");
		proximoTurno(partida,tablero,socket);
		
		
	}); 



	const tablero = new Tablero(filas,columnas,tiempoTurno,ayudas);

	//Crea los jugadores basados en la información sumistrada por el JSON
	const jugadores = Array();
	//jugadores.push(new Jugador("Esteban",1,"avatar1",7,8));
	//jugadores.push(new Jugador("Joel",2,"avatar5",4,4));


	const bancoJugadores = estructura["Jugadores"];

	for(let jugador = 0; jugador < bancoJugadores.length; ++jugador)
	{
		// ID = AVATAR
		jugadores.push(new Jugador(
			bancoJugadores[jugador]["nombre"],
			bancoJugadores[jugador]["id"],
			"avatar" + bancoJugadores[jugador]["id"],
			bancoJugadores[jugador]["fila"],
			bancoJugadores[jugador]["columna"]
		));
	}


	partida.jugadores = jugadores;

	


	const tesoros = Array();

	//Crea los tesoros leyendo el JSON generado
	const bancoTesoros = estructura["Tesoros"];

	//Por el momento solo asigna 2 tesoros por cada jugador
	for(let tesoro = 0; tesoro < jugadores.length * partida.tesorosPorJugador; ++tesoro)
	{
		tesoros.push(new Tesoro(
			bancoTesoros[tesoro]["id"],
			bancoTesoros[tesoro]["imagen"],
			bancoTesoros[tesoro]["kanji"],
			bancoTesoros[tesoro]["traduccion"],
			Number(bancoTesoros[tesoro]["fila"]),
			Number(bancoTesoros[tesoro]["columna"]),
			0
		));
	}


	partida.tesoros = tesoros;

	console.log(tesoros);

	//socket.emit("solicitarTesoro","Por favor!");
	tablero.crearTablero(estructura["Tiles"]);

	//Crea caminos de cruz alrededor del jugador y los tesoros para debugear
	tablero.modificarTipo(7,8,15);
	tablero.modificarTipo(9,8,15);
	tablero.modificarTipo(8,8,15);

	tablero.modificarTipo(4,4,15);
	tablero.modificarTipo(4,5,15);
	tablero.modificarTipo(5,4,15);

	//Posiciona todos los jugadores en el tablero
	for(let jugador = 0; jugador < partida.jugadores.length; ++jugador)
	{
		const jugadorActual = partida.jugadores[jugador];

		//Coloca el jugador
		setTesoroAvatar("avatar" + jugadorActual.filaActual + "000" + jugadorActual.columnaActual, 
			"res/img/avatares/sinFondo/" + jugadorActual.avatar + ".png");
	}

	//Posiciona todos los tesoros en el tablero
	for(let tesoro = 0; tesoro < partida.tesoros.length; ++tesoro)
	{
		const tesoroActual = partida.tesoros[tesoro];

		setTesoroAvatar("tesoro" + tesoroActual.filaActual + "000" +  tesoroActual.columnaActual, 
			"res/img/tesoros/" + tesoroActual.imagen + ".png");
	}

	const fichaSobrante = new Ficha(9);
	tablero.setFichaSobrante(fichaSobrante);

	const contenedorFichaSobrante = document.getElementById("fichaSobrante");
	contenedorFichaSobrante.addEventListener("click",function(){avisarRotarFichaSobrante(fichaSobrante,contenedorFichaSobrante, partida, socket);});
	contenedorFichaSobrante.src = "res/img/fichas/" + fichaSobrante.numeroActual + ".png";
	partida.fichaSobrante = fichaSobrante;

	partida.construirJugadores();
	partida.asignarTesorosIniciales();

	activarEventosFlechas(partida,tablero, socket);
	activarListenersFichas(partida,tablero, socket);

	socket.on("insercionBroadcast",function(data)
	{
		console.log("Flecha detectada: " + data);
		flechaPresionada(partida,tablero,tablero.getFlechaById(data));
	});

	socket.on("movimientoBroadcast",function(data){
		const pos = JSON.parse(data);
		console.log("Me movieron");

		moverJugador(partida,tablero,pos["fila"],pos["columna"], socket);
	});

	socket.on("GO",function(data){
		//socket.emit("solicitarTesoro","Por favor!");
		//proximoTurno(partida,tablero,socket);
	});
	



	socket.on("asignarTesoro",function(data){
		console.log("Me asignaron un tesoro: " + data);
		partida.cambiarMiTesoroAsignado(data);
	});

	socket.on("comerTesoroBroadcast",function(data){
		partida.comerTesoro(partida.jugadores[partida.jugadorTurno].filaActual,partida.jugadores[partida.jugadorTurno].columnaActual, data);
	});
	
	socket.on("finTurnoBroadcast",function(data){
		partida.asignarProximoJugador();
		proximoTurno(partida,tablero,socket);
	});

	socket.on("fin",function(data){
		//alert("Partida Finalizada");
		partida.finalizar();
	});

	socket.on("rotarFichaBroadcast",function(data){
		rotarFichaSobrante(data,document.getElementById("fichaSobrante"),partida);
	});


	
}



/**
 * Función ejecutada una vez que el documento está listo.
 * Se encarga de inicializar las variables del juego  y de crear el tablero.
 */
$(document).ready(function()
{

	//sync disconnect on unload para que el socket se desconecte cuando se cierra la pestaña del navegador.
	//Basado en la respuesta del usuario Carlos Atención, en la pregunta de StackOverFlow:
	//https://stackoverflow.com/questions/9077719/how-can-i-handle-close-event-in-socket-io
	const socket = io().connect( "http://localhost", {
		"sync disconnect on unload": true });

		
	socket.on("connect", function(data){
		console.log("MI id Socket: " + this.id); //Agarra el id del socket

		socket.emit("Listo",""); 

		/*socket.emit("Asigneme","porfa", function (response) {
			console.log(response);
		}); */

	});






	socket.on("Inicio", function(data){


		//Limpia la tabla de jugadores
		$("#datosJugadores").html("");

		console.log(data);
		const estructura = JSON.parse(data);
		inicializarVariables(estructura, socket);
		
	});

	socket.on("error", function (err) {
		console.log("Error: " + err);
	});





	
});






