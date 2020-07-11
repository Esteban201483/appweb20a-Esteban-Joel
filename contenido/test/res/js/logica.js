//10.3
class Flecha
{
	constructor(id,orientacion,columnaFilaAsociada)
	{
		this.id = id;
		this.orientacion = orientacion;
		this.columnaFilaAsociada = columnaFilaAsociada; //Un solo valor. La orientación determina si es fila o columna
	}

	getId()
	{
		return this.id;
	}

	setId(id)
	{
		this.id = id;
	}

	getOrientacion()
	{
		return this.orientacion;
	}

	setOrientacion(orientacion)
	{
		this.orientacion = orientacion;
	}

	getColumnaFilaAsociada()
	{
		return this.columnaFilaAsociada;
	}
}


/**
 * Define la clase jugador, la cual será la encargada de almacenar todos los datos relacionados
 * a los jugadores de la partida.
 * 
 * Además, se encarga de crear y mantener actualizados los datos de los jugadores
 */ 
class Jugador
{

	constructor(nombre,id,avatar,filaActual,columnaActual)
	{
		this.nombre = nombre; 
		this.id = id;
		this.avatar = avatar; //String con la dirección del avatar del jugador
		this.filaActual = filaActual;
		this.columnaActual = columnaActual;

		this.cantidadTesorosEncontrados = 0;
		this.tesorosEncontrados = [];
		this.tesoroAsignado = null;
	}

	verificarTesoroEncontrado(fila,columna)
	{
		const encontrado = (this.tesoroAsignado.filaActual === fila && this.tesoroAsignado.columnaActual === columna);

		if(encontrado)
			this.tesoroAsignado.ocultese();

		return encontrado;
	}

	actualizarDatosTesoro()
	{
		//Indica que ya encontró el tesoro
		$("#tesoro" + this.id + "encontrado" + this.cantidadTesorosEncontrados).attr("src","res/img/tesoros/" + this.tesoroAsignado.imagen + ".png");
		++this.cantidadTesorosEncontrados;
	}


	/**
	 * Asigna un tesoro al jugador
	 * @param {Tesoro} tesoroAsignado 
	 */
	asignarTesoro(tesoroAsignado)
	{
		this.tesoroAsignado = tesoroAsignado;
	}


	actualizarEstado(nuevoEstado)
	{
		$("#parrafoEstado" + this.id).text(nuevoEstado);
	}

	moverse(nuevaFila, nuevaColumna)
	{
		$("#avatar" + this.filaActual + "000" + this.columnaActual).attr("hidden",true); //Elimina el viejo avatar

		//Coloca el nuevo avatar
		$("#avatar" + nuevaFila + "000" + nuevaColumna).attr("hidden",false);
		$("#avatar" + nuevaFila + "000" + nuevaColumna).attr("src","res/img/avatares/sinFondo/" + this.avatar + ".png");

		this.filaActual = nuevaFila;
		this.columnaActual = nuevaColumna;
	}

	/**
	 * Agarra el contenedor de jugadores e ingresa los datos del juegador
	 */
	generarVistaJugador()
	{
		const contenedorJugador = $("#datosJugadores");

		contenedorJugador.html(contenedorJugador.html() + " " + 
			"<div id=\"contenedorJugador"+this.id+"\" class=\"contenedorJugador\">" +
			"<img id=\"avatarJugador"+this.id+"\" class=\"avatarJugadorFondo\" src=\"res/img/avatares/conFondo/"+this.avatar+".png\"></img>" +
			"<p id=\"parrafoJugador"+this.id+"\" class=\"parrafoNombre\">"+this.nombre+"</p>" +
			"<div id=\"seccionTesoros"+this.id+"\" class=\"seccionTesoro\"> Tesoros: "+ 
			"<img id=\"tesoro"+this.id+"encontrado0\" class=\"tesoroEncontrado\" src=\"res/img/tesoros/tesoroVacio.png\">"+
			"<img id=\"tesoro"+this.id+"encontrado1\" class=\"tesoroEncontrado\" src=\"res/img/tesoros/tesoroVacio.png\">"+ 
			"<img id=\"tesoro"+this.id+"encontrado2\" class=\"tesoroEncontrado\" src=\"res/img/tesoros/tesoroVacio.png\">"+ 
			"<img id=\"tesoro"+this.id+"encontrado3\" class=\"tesoroEncontrado\" src=\"res/img/tesoros/tesoroVacio.png\">"+ 
			"<img id=\"tesoro"+this.id+"encontrado4\" class=\"tesoroEncontrado\" src=\"res/img/tesoros/tesoroVacio.png\">"+  
			"</div>" +
			"<p id=\"parrafoEstado"+this.id+"\" class=\"parrafoTesoro\">Insertando Ficha </p>" +
			"</div>");
	}

	representarTurno()
	{
		//Elimina las clases y animaciones del jugador activo
		$(".jugadorActivo").removeClass("jugadorActivo");
		$(".animacionParpadeo").removeClass("animacionParpadeo");

		const nuevoContenedor = $("#contenedorJugador" +this.id);

		nuevoContenedor.addClass("jugadorActivo");
		nuevoContenedor.addClass("animacionParpadeo");
	}

	getNombre()
	{
		return this.nombre;
	}

	setNombre(nombre)
	{
		this.nombre = nombre;
	}

	getId()
	{
		return this.id;
	}

	setId(id)
	{
		this.id = id;
	}

	getAvatar()
	{
		return this.avatar;
	}

	setAvatar(avatar)
	{
		this.avatar = avatar;
	}

	getFilaActual()
	{
		return this.filaActual;
	}

	setFilaActual(fila)
	{
		this.filaActual = fila;
	}

	getColumnaActual()
	{
		return this.columnaActual;
	}

	setColumnaActual(columna)
	{
		this.columnaActual = columna;
	}
}


class Tesoro
{
	constructor(id,imagen,kanji,traduccion,filaActual,columnaActual, idJugador)
	{
		this.id = id;
		this.imagen = imagen; //Nombre de la imagen, sin extensión
		this.kanji = kanji;
		this.traduccion = traduccion;
		this.filaActual = filaActual;
		this.columnaActual = columnaActual;
		this.idJugador = idJugador;
		this.encontrado = false;
	}

	/**
	 * Indica al tesoro que ya no debe encontrarse en el tablero
	 */
	ocultese()
	{
		$("#tesoro" + this.filaActual + "000" + this.columnaActual).attr("hidden",true);
		this.encontrado = true;
	}

	/**
	 * Indica si un tesoro puede ser asignado al jugador específicado
	 * @param {Number} idJugador 
	 */
	esAsignable(idJugador)
	{ 
		return ((this.idJugador === idJugador) && !this.encontrado);
	}

	setEncontrado(encontrado)
	{
		this.encontrado = encontrado;
	}
}

/**
 * Define la clase partida, la cual será la encargada de almacenar algunos datos relacionados con la partida
 */
class Partida
{
	constructor(jugadores)
	{
		this.jugadores = jugadores;
		this.duracionTurno = 0;
		this.jugadorTurno = -1; //Indice de la lista jugadores que indica cual es el jugador actual
		this.finalizada = false;
		this.contadorTurnos = 0;
		this.fase = 0; //0 => insercion, 1 => movimiento
		this.tesoros = [];

		this.fases = ["Insertando Ficha", "Realizando Movimiento", "Esperando"];
	}

	/**
	 * Desactiva cualquier acción y despliega la información del ganador de la partida
	 */
	finalizar()
	{
		this.fase = -1;

		alert("Felicidades, el jugador " + this.jugadores[this. jugadorTurno].nombre + " ha ganado la partida");

		//Recorre todas las secciones de los jugadores e indica quien ganó
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			const jugadorActual = this.jugadores[jugador];

			if(jugador !== this.jugadorTurno)
			{
				jugadorActual.actualizarEstado(".");
			}
			else
			{
				jugadorActual.actualizarEstado("Ganador");
			}
		}
	}

	/**
	 * Verifica si el jugador actual encontró su tesoro asignado
	 */
	tesoroEncontrado(fila,columna)
	{
		const encontrado = this.jugadores[this.jugadorTurno].verificarTesoroEncontrado(fila,columna);

		if(encontrado)
		{
			this.jugadores[this.jugadorTurno].actualizarDatosTesoro();
			if(!this.asignarProximoTesoro()) //Le asigna otro tesoro al jugador
			{
				//Si no pudo asignar otro tesoro, quiere decir que la partida ha terminado
				this.finalizada = true;
			}
		}

		return encontrado;
	}

	/**
	 * Le asigna un tesoro al próximo Jugador
	 */
	asignarProximoTesoro()
	{
		const jugadorAnalizado = this.jugadores[this.jugadorTurno];
		let tesoroAsignado = false;

		for(let tesoro = 0; tesoro < this.tesoros.length && !tesoroAsignado; ++tesoro)
		{
			const tesoroAnalizado = this.tesoros[tesoro];

			if(tesoroAnalizado.esAsignable(jugadorAnalizado.id))
			{
				tesoroAsignado = true;
				jugadorAnalizado.asignarTesoro(tesoroAnalizado);
			}
		}

		return tesoroAsignado;
	}

	/**
	 * Asigna un tesoro a cada jugador
	 */
	asignarTesorosIniciales()
	{
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			let tesoroAsignado = false;
			const jugadorAnalizado = this.jugadores[jugador];
			for(let tesoro = 0; tesoro < this.tesoros.length && !tesoroAsignado; ++tesoro)
			{
				const tesoroAnalizado = this.tesoros[tesoro];

				if(tesoroAnalizado.esAsignable(jugadorAnalizado.id))
				{
					tesoroAsignado = true;
					jugadorAnalizado.asignarTesoro(tesoroAnalizado);
				}
			}
		}
	}


	moverJugadorActual(fila,columna)
	{
		this.jugadores[this.jugadorTurno].moverse(fila,columna);
	}

	asignarProximoJugador()
	{
		if(this.jugadorTurno !== -1)
			this.jugadores[this.jugadorTurno].actualizarEstado(this.fases[2]);
		this.jugadorTurno = (this.jugadorTurno + 1) % this.jugadores.length;
	}

	estaEnInsercion()
	{
		return (this.fase === 0);
	}

	estaEnMovimiento()
	{
		return (this.fase === 1);
	}

	estaEnEspera()
	{
		return (this.fase === 2);
	}

	actualizarInformacionEstados()
	{
		//Actualiza la información de todas las secciones de jugadores
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			const jugadorActual = this.jugadores[jugador];

			if(jugador !== this.jugadorTurno)
			{
				jugadorActual.actualizarEstado(this.fases[2]);
			}
			else
			{
				jugadorActual.actualizarEstado(this.fases[this.fase]);
			}
		}

	}

	proximaFase()
	{
		this.fase = (this.fase + 1) % 3; //Solo existen 3 etapas	
	}

	construirJugadores()
	{
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
			this.jugadores[jugador].generarVistaJugador();
	
	}

	representarTurnoJugadorActual()
	{
		this.jugadores[this.jugadorTurno].representarTurno();
	}
}

class Posicion
{
	constructor(fila,columna)
	{
		this.fila = fila;
		this.columna = columna;
	}

	getFila()
	{
		return this.fila;
	}

	setFila(fila)
	{
		this.fila = fila;
	}

	getColumna()
	{
		return this.columna;
	}

	setColumna(columna)
	{
		this.columna = columna;
	}
}

/**
 * Define la clase tablero, la cual será la encargada de almacenar la representación lógica del tablero
 * y algunos de sus atributos
 */
class Tablero
{
	constructor(filas, columnas, tiempoTurno, ayudas)
	{
		this.filas = filas;
		this.columnas = columnas;
		this.tiempoTurno = tiempoTurno;
		this.ayudas = ayudas;
		this.fichaSobrante = null;
		this.movimientosPermitidos = Array();

		//Crea un tablero lógico para el control del movimiento de los jugadores
		//Debe almacenar instancias de fichas
		this.tableroLogico = Array(this.filas);

		for(let i = 0; i < this.filas; ++i)
		{
			this.tableroLogico[i] = Array(this.columnas);

			for(let j = 0; j < this.columnas; ++j)
			{
				this.tableroLogico[i][j] = -1;
			}
		}

		this.listaFlechas = Array();

	}

	modificarTipo(fila,columna,nuevaFicha)
	{
		this.tableroLogico[fila][columna].numeroActual = nuevaFicha;

		//Actualiza la imagen de la ficha
		$("#Ficha" + fila + "000" + columna).attr("src","res/img/fichas/" + this.tableroLogico[fila][columna].numeroActual + ".png");
	}

	getMovimientosPermitidos()
	{
		return this.movimientosPermitidos;
	}

	/**
	 * Calcula todos los movimientos posibles desde una posición inicial
	 * Deja los datos cargados en el array movimientosPermitidos
	 * 
	 * Utiliza la busqueda exhaustiva para determinar cuales movimientos pueden realizarse.
	 * Para ello, utiliza un array para determinar las proximas posiciones en las que "hay camino"
	 * y un array para determinar las posiciones ya analizadas
	 * @param {*} filaInicial 
	 * @param {*} columnaInicial 
	 */
	calcularMovimientosPermitidos(filaInicial, columnaInicial)
	{
		this.movimientosPermitidos = Array();
		const proximasPosiciones = Array();
		const diccionarioPosiciones = Array(this.filas);
		let posicionActual = null;

		for(let c = 0; c < this.columnas; ++c)
			diccionarioPosiciones[c] = Array();

		proximasPosiciones.push(new Posicion(filaInicial,columnaInicial));
	

		while(proximasPosiciones.length > 0)
		{
			posicionActual = proximasPosiciones.shift();
			let posicionAnalizada = false;

			//Verifica en el diccionario si la posición ya fue analizada
			posicionAnalizada = diccionarioPosiciones[posicionActual.fila].includes(posicionActual.columna);
			
			if(!posicionAnalizada)
			{
				const filaAnalizada = posicionActual.fila;
				const columnaAnalizada = posicionActual.columna;

				diccionarioPosiciones[filaAnalizada].push(columnaAnalizada);

				//Obtiene la representación binaria de la ficha de la posicon
				const numero = this.getFicha(filaAnalizada,columnaAnalizada).numeroActual;
			
				//Utiliza operaciones binarias para determinar en cuales direcciones existe un camino
				//Uso de operaciones binarias basadas en el tutorial de https://www.w3schools.com/js/js_bitwise.asp 
				const caminoDerecho = (numero & 1) !== 0;
				const caminoIzquierdo = (numero & 2) !== 0;
				const caminoSuperior = (numero & 8) !== 0;
				const caminoInferior = (numero & 4) !== 0;

				/*console.log("Camino derecho: ", caminoDerecho);
				console.log("Camino izquierdo: ", caminoIzquierdo);
				console.log("Camino superior: ", caminoSuperior);
				console.log("Camino inferior: ", caminoInferior);
				console.log("Ficha: ", numero);*/

				//Indica que hay un movimiento posible en esta ficha
				this.movimientosPermitidos.push(Array(filaAnalizada,columnaAnalizada));

				//Si existe camino y no se sale del borde, agrega las respectivas fichas adyacentes
				if(caminoSuperior && filaAnalizada > 0)
				{
					//Verifica que la ficha adyacente tenga camino con la ficha actual
					const fichaAdyacente = this.tableroLogico[filaAnalizada -1][columnaAnalizada];
					if((fichaAdyacente.numeroActual & 4) !== 0) //existe camino inferior!
						proximasPosiciones.push(new Posicion(filaAnalizada - 1,columnaAnalizada));
				}

				//Si existe camino y no se sale del borde, agrega las respectivas fichas adyacentes
				if(caminoInferior && filaAnalizada < this.filas -1)
				{
					const fichaAdyacente = this.tableroLogico[filaAnalizada + 1][columnaAnalizada];
					if((fichaAdyacente.numeroActual & 8) !== 0) //existe camino superior!
						proximasPosiciones.push(new Posicion(filaAnalizada + 1,columnaAnalizada));
				}

				//Si existe camino y no se sale del borde, agrega las respectivas fichas adyacentes
				if(caminoIzquierdo && columnaAnalizada > 0)
				{
					const fichaAdyacente = this.tableroLogico[filaAnalizada][columnaAnalizada -1];
					if((fichaAdyacente.numeroActual & 1) !== 0) //existe camino derecho!
						proximasPosiciones.push(new Posicion(filaAnalizada,columnaAnalizada - 1));
				}

				//Si existe camino y no se sale del borde, agrega las respectivas fichas adyacentes
				if(caminoDerecho && columnaAnalizada < this.columnas -1)
				{
					const fichaAdyacente = this.tableroLogico[filaAnalizada][columnaAnalizada +1];
					if((fichaAdyacente.numeroActual & 2) !== 0)//existe camino izquierdo!
						proximasPosiciones.push(new Posicion(filaAnalizada,columnaAnalizada + 1));
				}

				
			}

			console.log("Iteración");


		}
		console.log("Fin jaja");
		console.log(this.movimientosPermitidos);
	}

	/**
	 * Indica si se puede realizar o no un movimiento en una posición determinada
	 * @param {Number} fila 
	 * @param {Number} columna 
	 */
	verificarMovimientosPermitidos(fila,columna)
	{
		let permitido = false;

		for(let m = 0; m < this.movimientosPermitidos.length && !permitido; ++m)
		{
			const fichaPermitida = this.movimientosPermitidos[m];

			permitido =( fichaPermitida[0] === fila && fichaPermitida[1] === columna) ;
		}

		return permitido;
	}

	agregarMovimientosPermitidos(fila,columna)
	{
		this.movimientosPermitidos.push(Array(fila,columna));
	}

	reiniciarMovimientosPermitidos()
	{
		this.movimientosPermitidos = Array();
	}

	setFichaSobrante(ficha)
	{
		this.fichaSobrante = ficha;
	}

	getFichaSobrante()
	{
		return this.fichaSobrante;
	}

	agregarFlecha(flecha)
	{
		this.listaFlechas.push(flecha);
	}

	setFicha(ficha,fila,columna)
	{
		this.tableroLogico[fila][columna] = ficha;
	}

	getFicha(fila,columna)
	{
		return this.tableroLogico[fila][columna];
	}

	debugTablero()
	{
		console.log(this.tableroLogico);
		console.log(this.listaFlechas);
	}
}

/**
 * Clase que representa una ficha de tablero. 
 * Cuenta con el método para rotar hacia la derecha
 */
class Ficha
{
	constructor(numeroActual)
	{
		this.numeroActual = numeroActual;

		//Declara los vectores para determinar como se deben rotar las fichas
		this.rotacionBloqueo = [0];
		this.rotacionCruz = [15];
		this.rotacionT = [7,14,11,13];
		this.rotacionRecta = [3,12];
		this.rotacionL = [9,5,6,10];


	}

	encontrarRotacion(array, direccion)
	{
		return array[(array.indexOf( this.numeroActual) + direccion) %  array.length];
	}

	rotar(direccion)
	{
		const tipo = this.getTipoFicha( this.numeroActual);

		switch(tipo)
		{
		case "BLOQUEO": case "": case "CRUZ":
			break;
		case "RECTA":
			this.numeroActual =  this.encontrarRotacion(this.rotacionRecta,direccion);
			break;
		case "L":
			this.numeroActual =  this.encontrarRotacion(this.rotacionL,direccion);
			break;
		case "T":
			this.numeroActual =  this.encontrarRotacion(this.rotacionT,direccion);
			break;
		}

	}

	rotarIzquierda()
	{
		this.rotar(+1);
	}

	rotarDerecha()
	{
		this.rotar(-1);
	}
	

	getTipoFicha(numeroFicha)
	{
		let tipo = "";

		switch(numeroFicha)
		{
		case 0:
			tipo = "BLOQUEO";
			break;
		case 15:
			tipo = "CRUZ";
			break;
		case 7: case 13: case 11: case 14:
			tipo = "T";
			break;
		case 3: case 12:
			tipo = "RECTA";
			break;
		case 9: case 5: case 6: case 10:
			tipo = "L";
			break;
		default:
			tipo = "";               
		}

		return tipo;
	}
}


function setTesoroAvatar(imgId,imageSrc)
{
	$("#" + imgId).attr("hidden",false);
	$("#" + imgId).attr("src",imageSrc);
	
}

/**
 * Devuelve el código de un salto de línea semánticamente correcto
 */
function obtenerSaltoLinea()
{
	return "<br/>"; 
}

/**
 * Devuelve el código para crear un elemento IMG.
 * @param {String} id El identificador del nuevo elemento img
 * @param {int} dimension El ancho y alto al que se debe redimensionar la imagen
 * @param {String} rutaImagen La dirección de la imagen
 * @param {String} classElement La clase del elemento img
 */
function obtenerElementoImg(id, dimension, rutaImagen, classElement)
{
	return "<img id=\""+id+"\" class=\""+classElement+"\"" +
	" src=\""+rutaImagen+"\" height=\""+dimension+"\" width=\""+dimension+"\" />";
}

function obtenerElementoImgOculto(id, dimension, classElement)
{
	return "<img id=\""+id+"\" hidden=\"hidden\" class=\""+classElement+"\""+
	" height=\""+dimension+"\" width=\""+dimension+"\" />";
}

function obtenerAperturaDivContenedor(id)
{
	return "<div id=\"bloque"+id+"\" class=\"contenedorImagen\">";
}

function obtenerDivFiltrador(id)
{
	return  "<div class=\"contenedorFiltroAmarillo\" id=\""+id+"\"></div>";
}

/**
 * Devuelve el código para crear todos los elementos que representan una ficha.
 * Los elementos en total son:
 *      div contenedor
 *      img para la ficha del tablero
 *      img para la ficha del avatar de jugador (Oculto por defecto)
 *      img para la ficha del tesoro (Oculto por defecto)
 * @param {String} id El identificador del nuevo elemento img
 * @param {int} dimension El ancho y alto al que se debe redimensionar la imagen
 * @param {String} rutaImagen La dirección de la imagen
 */
function obtenerBloqueTablero(id, dimension, rutaImagen)
{
	return obtenerAperturaDivContenedor(id) + " " + 
	obtenerElementoImg("Ficha" + id,dimension,rutaImagen,"fichaTablero") + " " + 
	obtenerDivFiltrador("Filtro" + id) + " " + 
	obtenerElementoImgOculto("avatar" + id,dimension,"avatarTablero") + " " + 
	obtenerElementoImgOculto("tesoro" + id, dimension,"tesoroTablero") +  " </div>";
}

/**
 * Se encarga de crear un tablero de forma dinámica.
 * todo: Especificar como se obtienen los datos para la creación del tablero
 */
function crearTablero(tablero)
{
	
	const contenedorTablero = $("#contenedorTablero"); //Obtiene el div que almacenará al tablero
	contenedorTablero.height($("main").height());
	contenedorTablero.width($("main").width());
	let innerHTML = ""; 
	const size = 100 / Math.max(tablero.filas + 2, tablero.columnas + 2) + "%";

	//let size = 550 / Math.min(tablero.filas + 2,tablero.columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
	//let size = contenedorTablero.height() / Math.min(tablero.filas + 2,tablero.columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
	let idFlecha = 0; //Contador para identificar las flechas
	const nombreFlecha = "Flecha";

	const fichas = [0,3,5,6,7,9,10,11,12,13,14,15];

	innerHTML += (obtenerElementoImg("",size, "res/img/fichas/vacia.png","contenedorImagen"));
	//crea las flechas superiores
	for(let columna = 0; columna < (tablero.columnas); ++columna)
	{
		if((columna % 2) === 0) //Coloca imagenes vacias en las posiciones pares
			innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
		else //Coloca las imagenes de las flechas verticales
		{
			//Indica al tablero de forma lógica que se va a crear una nueva flecha
			tablero.agregarFlecha(new Flecha(idFlecha,"vertical-superior",columna));

			innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha superior.png","contenedorImagen"));
			++idFlecha;
		}
	}

	innerHTML += (obtenerSaltoLinea());

	for(let fila = 0; fila < tablero.filas; ++fila)
	{

		//Controla la creación de flechas al lado izquierdo del tablero
		if(((fila+1) % 2 !== 0) && (fila+1) !== tablero.filas+2) //Coloca imagenes vacias en las posiciones pares
			innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
		else //Coloca las imagenes de las flechas izquierdas
		{
			//Indica al tablero de forma lógica que se va a crear una nueva flecha
			tablero.agregarFlecha(new Flecha(idFlecha,"lateral-izquierda",fila));

			innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha izquierda.png","contenedorImagen"));
			++idFlecha;
		}


		/////////////////////////////////Coloca las fichas de la fila actual
		for(let columna = 0; columna < tablero.columnas; ++columna)
		{
			const fichaNueva = Math.floor(Math.random() * fichas.length );

			//Indica en el tablero de forma lógica la nueva ficha
			tablero.setFicha(new Ficha(fichas[fichaNueva]),fila,columna);

			//Indica en el tablero de forma física la nueva ficha
			innerHTML += (obtenerBloqueTablero(fila + "000" + columna , size, 
				"res/img/fichas/" + fichas[fichaNueva] + ".png")); 
		}


		//Controla la creación de flechas al lado derecho del tablero
		if(((fila+1) % 2 !== 0) && (fila+1) !== tablero.filas+2 ) //Coloca imagenes vacias en las posiciones pares
		{
			innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
		}
		else //Coloca las imagenes de las flechas verticales
		{
			//Indica al tablero de forma lógica que se va a crear una nueva flecha
			tablero.agregarFlecha(new Flecha(idFlecha,"lateral-derecha",fila));
			innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha derecha.png","contenedorImagen"));
			++idFlecha;
		}

		innerHTML += (obtenerSaltoLinea());
	}

	//crea las flechas Inferiores
	innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
	for(let columna = 0; columna < (tablero.columnas); ++columna)
	{
		if(columna % 2 === 0) //Coloca imagenes vacias en las posiciones pares
			innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen") );
		else //Coloca las imagenes de las flechas verticales
		{
			//Indica al tablero de forma lógica que se va a crear una nueva flecha
			tablero.agregarFlecha(new Flecha(idFlecha,"vertical-inferior",columna));

			innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha inferior.png","contenedorImagen") );
			++idFlecha;
		}
	}

	contenedorTablero.html(innerHTML);

	$(".contenedorImagen").height(size);
	$(".contenedorImagen").width(size);
	$(".tesoroTablero").height("75%");
	$(".tesoroTablero").width("75%");
	$(".avatarTablero").height("50%");
	$(".avatarTablero").width("50%");

	
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

	crearTablero(tablero);

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






