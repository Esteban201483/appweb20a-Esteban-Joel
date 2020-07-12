export default class Posicion
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