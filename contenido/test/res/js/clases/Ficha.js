/**
 * Clase que representa una ficha de tablero. 
 * Cuenta con el método para rotar hacia la derecha
 */
export default class Ficha
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