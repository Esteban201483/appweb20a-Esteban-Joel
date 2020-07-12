export default class FabricaHTMl
{
	constructor(ruta)
	{
		this.ruta = ruta;
	}

	/**
	 * Devuelve el código de un salto de línea semánticamente correcto
	 */
	obtenerSaltoLinea()
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
	obtenerElementoImg(id, dimension, rutaImagen, classElement)
	{
		return "<img id=\""+id+"\" class=\""+classElement+"\"" +
		" src=\""+rutaImagen+"\" height=\""+dimension+"\" width=\""+dimension+"\" />";
	}

	obtenerElementoImgOculto(id, dimension, classElement)
	{
		return "<img id=\""+id+"\" hidden=\"hidden\" class=\""+classElement+"\""+
		" height=\""+dimension+"\" width=\""+dimension+"\" />";
	}

	obtenerAperturaDivContenedor(id)
	{
		return "<div id=\"bloque"+id+"\" class=\"contenedorImagen\">";
	}

	obtenerDivFiltrador(id)
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
	obtenerBloqueTablero(id, dimension, rutaImagen)
	{
		return this.obtenerAperturaDivContenedor(id) + " " + 
		this.obtenerElementoImg("Ficha" + id,dimension,rutaImagen,"fichaTablero") + " " + 
		this.obtenerDivFiltrador("Filtro" + id) + " " + 
		this.obtenerElementoImgOculto("avatar" + id,dimension,"avatarTablero") + " " + 
		this.obtenerElementoImgOculto("tesoro" + id, dimension,"tesoroTablero") +  " </div>";
	}
}

