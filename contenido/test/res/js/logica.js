/**
 * Modulo Principal. Es el encargado de controlar el proceso del juego
 */


import Ficha 	   from "./clases/Ficha.js";
import Jugador     from "./clases/Jugador.js";
import Mensajero   from "./clases/Mensajero.js";
import Partida     from "./clases/Partida.js";
import Tablero     from "./clases/Tablero.js";
import Tesoro      from "./clases/Tesoro.js";





function setTesoroAvatar(imgId,imageSrc)
{
	$("#" + imgId).attr("hidden",false);
	$("#" + imgId).attr("src",imageSrc);
	
}


function rotarFichaSobrante(ficha, contenedor) 
{
	ficha.rotarIzquierda();
	contenedor.src = "res/img/fichas/" + ficha.numeroActual + ".png";

}

function redibujarFicha(fila,columna,nuevaFicha)
{
	const imgFicha = $("#Ficha" + fila + "000" + columna);
	imgFicha.attr("src","res/img/fichas/" + nuevaFicha + ".png");
}


function redibujarFichaSobrante(fichaSobrante)
{
	const contenedorFichaSobrante = document.getElementById("fichaSobrante");
	contenedorFichaSobrante.removeEventListener("click",rotarFichaSobrante);
	contenedorFichaSobrante.addEventListener("click",function(){rotarFichaSobrante(fichaSobrante,contenedorFichaSobrante);});
	contenedorFichaSobrante.src = "res/img/fichas/" + fichaSobrante.numeroActual + ".png";
}


function deshabilitarInsercion(partida,tablero)
{
	//Elimina el listener y las animaciones de todas las flechas
	let flechaActual = null;
	let flechaHTML = null;
	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		flechaActual= tablero.listaFlechas[flecha]; //Obtiene la instancia de la flecha

		//Agrega el listener según el id de la flecha
		flechaHTML = document.getElementById("Flecha" + flechaActual.id);
		flechaHTML.removeEventListener("click",{});
		
		//Agrega efecto over a la flecha con las animaciones de CSS
		if(flechaActual.orientacion === "vertical-superior")
		{
			toggleMovimientoVertical("Flecha" + flechaActual.id);
		}
	}
	partida.proximaFase();
	
}

function deshabilitarMovimiento()
{
	$(".animacionCaminoResaltado").removeClass("animacionCaminoResaltado");
}


function moverJugador(partida,tablero,fila,columna)
{
	if(partida.estaEnMovimiento() && tablero.verificarMovimientosPermitidos(fila,columna))
	{

		deshabilitarMovimiento();
		partida.proximaFase();partida.proximaFase();
		partida.moverJugadorActual(fila,columna);

		if(partida.tesoroEncontrado(fila,columna))
		{
			partida.asignarProximoTesoro();
		}

		proximoTurno(partida,tablero);
	}
}

/**
 * Activa todos los eventos encargados de capturar el movimiento del jugador
 * @param {Partida} partida 
 * @param {Tablero} tablero 
 */
function activarListenersFichas(partida,tablero)
{
	//Setea un listener en todas las fichas

	let fichaHTML = null;
	for(let fila = 0; fila < tablero.filas; ++fila)
	{
		for(let columna = 0; columna < tablero.columnas; ++columna)
		{
			//Agrega el listener según el id de la ficha
			fichaHTML = document.getElementById("bloque" + fila + "000" + columna);
			fichaHTML.addEventListener("click",function(){moverJugador(partida,tablero,fila,columna);});
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
function flechaPresionada(partida,tablero, flecha)
{
	if(partida.estaEnInsercion())
	{
		//Obtiene la instancia de la flecha presionada
		const flechaPresionada = tablero.listaFlechas[flecha];
		let fichaRemplazada = null;
		let aux = null;
		let fichaPerdida = null;

		
		const columna = flechaPresionada.columnaFilaAsociada;
		//Realiza la inserción según la posición de la flecha
		switch(flechaPresionada.orientacion)
		{
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
			fichaRemplazada = tablero.getFichaSobrante();
			tablero.setFichaSobrante(fichaPerdida);
			tablero.setFicha(fichaRemplazada,0,columna);
			redibujarFicha(0,columna,tablero.getFicha(0,columna).numeroActual);
			
			break;
		}
		redibujarFichaSobrante(tablero.getFichaSobrante());

		//Una vez se ha presionado la flecha, se habilita el movimiento
		deshabilitarInsercion(partida,tablero);
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

function toggleMovimientoVertical(idFlecha)
{
	toggleClaseAnimacion(idFlecha,"animacionFlechasVerticales");
}

function activarEventosFlechas(partida,tablero)
{
	//Setea un listener en todas las flechas
	let flechaActual = null;
	let flechaHTML = null;
	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		flechaActual= tablero.listaFlechas[flecha]; //Obtiene la instancia de la flecha

		//Agrega el listener según el id de la flecha
		flechaHTML = document.getElementById("Flecha" + flechaActual.id);
		flechaHTML.addEventListener("click",function(){flechaPresionada(partida,tablero,flecha);});
	}
}

function habilitarInsercion(partida,tablero)
{
	partida.actualizarInformacionEstados();
	//Setea un listener en todas las flechas
	let flechaActual = null;
	for(let flecha = 0; flecha < tablero.listaFlechas.length; ++flecha)
	{
		
	
		flechaActual = tablero.listaFlechas[flecha];
		//Agrega efecto over a la flecha con las animaciones de CSS
		if(flechaActual.orientacion === "vertical-superior")
		{
			toggleMovimientoVertical("Flecha" + flechaActual.id);
		}

	}
}


function proximoTurno(partida,tablero)
{

	if(!partida.finalizada)
	{
		partida.asignarProximoJugador();
		partida.representarTurnoJugadorActual();
		partida.actualizarInformacionEstados();

		habilitarInsercion(partida,tablero);
		//Fin del turno
		//partida.jugadorTurno = (partida.jugadorTurno + 1) % partida.jugadores.length; //TODO: ver que pasa con los jugadores descalificados
		//partida.contadorTurnos++;
	}
	else
	{
		//Despliega un mensaje indicando quien fue el ganador, y algunas estadísticas adicionales
		partida.finalizar();
	}
}

/**
 * Este método recibe las variables necesarias para el desarrollo del juego
 * 
 */
function inicializarVariables()
{
	
	const filas = 13;
	const columnas = 13;
	const tiempoTurno = 120;
	const ayudas = true;

	const partida = new Partida();
	const tablero = new Tablero(filas,columnas,tiempoTurno,ayudas);


	//Crea los jugadores
	const jugadores = Array();
	jugadores.push(new Jugador("Esteban",1,"avatar1",7,8));
	jugadores.push(new Jugador("Joel",2,"avatar5",4,4));
	partida.jugadores = jugadores;

	//Crea los tesoros
	//Por el momento solo 1 por jugador
	//TODO: buscar forma de cargar todos los tesoros existentes en las carpetas de recursos


	const tesoros = Array();
	tesoros.push(new Tesoro(1,"crown","crown","Corona",8,8,1)); //Asocia el tesoro a Esteban
	tesoros.push(new Tesoro(2,"chest","chest","Cofre del tesoro",9,8,1)); 
	tesoros.push(new Tesoro(3,"sword_iron","sword_iron","Cofre del tesoro",4,5,2)); //Asocia el tesoro a Joel
	tesoros.push(new Tesoro(4,"potion_red_small","potion_red_small","Cofre del tesoro",5,4,2));
	partida.tesoros = tesoros;

	tablero.crearTablero();

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
	contenedorFichaSobrante.addEventListener("click",function(){rotarFichaSobrante(fichaSobrante,contenedorFichaSobrante);});
	contenedorFichaSobrante.src = "res/img/fichas/" + fichaSobrante.numeroActual + ".png";
	partida.construirJugadores();
	partida.asignarTesorosIniciales();

	activarEventosFlechas(partida,tablero);
	activarListenersFichas(partida,tablero);

	//Conecta con el websocket
	const mensajero = new Mensajero("2ce54c2DF");
	mensajero.iniciarConexion();

	//Inicia la partida
	proximoTurno(partida,tablero);
}



/**
 * Función ejecutada una vez que el documento está listo.
 * Se encarga de inicializar las variables del juego  y de crear el tablero.
 */
$(document).ready(function()
{

	inicializarVariables();


});






