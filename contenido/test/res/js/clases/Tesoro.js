export default class Tesoro
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

