export default class Flecha
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