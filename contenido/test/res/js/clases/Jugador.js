/**
 * Define la clase jugador, la cual será la encargada de almacenar todos los datos relacionados
 * a los jugadores de la partida.
 * 
 * Además, se encarga de crear y mantener actualizados los datos de los jugadores
 */ 
export default class Jugador
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
	 * Asigna un tesoro al jugador.  Este método solo se llama al jugador que tiene el tesoro asignado.
	 * Los demás jugadores no reciben el llamado a este método
	 * @param {Tesoro} tesoroAsignado 
	 */
	asignarTesoro(tesoroAsignado)
	{
		console.log("Mi tesoro :3 " + tesoroAsignado);
		this.tesoroAsignado = tesoroAsignado;

		//Modifica la información del tesoro buscado
		$("#labelTraduccion").text(tesoroAsignado.traduccion);
		$("#kanjiTesoro").attr("src","res/img/kanjis/" + tesoroAsignado.kanji + ".png");
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