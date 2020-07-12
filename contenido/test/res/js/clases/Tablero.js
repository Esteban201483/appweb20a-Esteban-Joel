import FabricaHtml 	   from "./FabricaHtml.js";
import Ficha 	   from "./Ficha.js";
import Flecha 	   from "./Flecha.js";
import Posicion    from "./Posicion.js";

/**
 * Define la clase tablero, la cual será la encargada de almacenar la representación lógica del tablero
 * y algunos de sus atributos
 */
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
	 * Se encarga de crear un tablero de forma dinámica.
	 * todo: Especificar como se obtienen los datos para la creación del tablero
	 */
	crearTablero()
	{
		const fabrica = new FabricaHtml();
		
		const contenedorTablero = $("#contenedorTablero"); //Obtiene el div que almacenará al tablero
		contenedorTablero.height($("main").height());
		contenedorTablero.width($("main").width());
		let innerHTML = ""; 
		const size = 100 / Math.max(this.filas + 2, this.columnas + 2) + "%";

		//let size = 550 / Math.min(tablero.filas + 2,tablero.columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
		//let size = contenedorTablero.height() / Math.min(tablero.filas + 2,tablero.columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
		let idFlecha = 0; //Contador para identificar las flechas
		const nombreFlecha = "Flecha";

		const fichas = [0,3,5,6,7,9,10,11,12,13,14,15];

		innerHTML += (fabrica.obtenerElementoImg("",size, "res/img/fichas/vacia.png","contenedorImagen"));
		//crea las flechas superiores
		for(let columna = 0; columna < (this.columnas); ++columna)
		{
			if((columna % 2) === 0) //Coloca imagenes vacias en las posiciones pares
				innerHTML += (fabrica.obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
			else //Coloca las imagenes de las flechas verticales
			{
				//Indica al tablero de forma lógica que se va a crear una nueva flecha
				this.agregarFlecha(new Flecha(idFlecha,"vertical-superior",columna));

				innerHTML += (fabrica.obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha superior.png","contenedorImagen"));
				++idFlecha;
			}
		}

		innerHTML += (fabrica.obtenerSaltoLinea());

		for(let fila = 0; fila < this.filas; ++fila)
		{

			//Controla la creación de flechas al lado izquierdo del tablero
			if(((fila+1) % 2 !== 0) && (fila+1) !== this.filas+2) //Coloca imagenes vacias en las posiciones pares
				innerHTML += (fabrica.obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
			else //Coloca las imagenes de las flechas izquierdas
			{
				//Indica al tablero de forma lógica que se va a crear una nueva flecha
				this.agregarFlecha(new Flecha(idFlecha,"lateral-izquierda",fila));

				innerHTML += (fabrica.obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha izquierda.png","contenedorImagen"));
				++idFlecha;
			}


			/////////////////////////////////Coloca las fichas de la fila actual
			for(let columna = 0; columna < this.columnas; ++columna)
			{
				const fichaNueva = Math.floor(Math.random() * fichas.length );

				//Indica en el tablero de forma lógica la nueva ficha
				this.setFicha(new Ficha(fichas[fichaNueva]),fila,columna);

				//Indica en el tablero de forma física la nueva ficha
				innerHTML += (fabrica.obtenerBloqueTablero(fila + "000" + columna , size, 
					"res/img/fichas/" + fichas[fichaNueva] + ".png")); 
			}


			//Controla la creación de flechas al lado derecho del tablero
			if(((fila+1) % 2 !== 0) && (fila+1) !== this.filas+2 ) //Coloca imagenes vacias en las posiciones pares
			{
				innerHTML += (fabrica.obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
			}
			else //Coloca las imagenes de las flechas verticales
			{
				//Indica al tablero de forma lógica que se va a crear una nueva flecha
				this.agregarFlecha(new Flecha(idFlecha,"lateral-derecha",fila));
				innerHTML += (fabrica.obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha derecha.png","contenedorImagen"));
				++idFlecha;
			}

			innerHTML += (fabrica.obtenerSaltoLinea());
		}

		//crea las flechas Inferiores
		innerHTML += (fabrica.obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen"));
		for(let columna = 0; columna < (this.columnas); ++columna)
		{
			if(columna % 2 === 0) //Coloca imagenes vacias en las posiciones pares
				innerHTML += (fabrica.obtenerElementoImg("",size,"res/img/fichas/vacia.png","contenedorImagen") );
			else //Coloca las imagenes de las flechas verticales
			{
				//Indica al tablero de forma lógica que se va a crear una nueva flecha
				this.agregarFlecha(new Flecha(idFlecha,"vertical-inferior",columna));

				innerHTML += (fabrica.obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha inferior.png","contenedorImagen") );
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