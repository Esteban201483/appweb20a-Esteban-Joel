/**
 * Define la clase tablero, la cual será la encargada de almacenar la representación lógica del tablero
 * y algunos de sus atributos
 */

import Posicion    from "./Posicion.js";
export default class Tablero
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