/**
 * Almacena los datos requeridos para el manejo de cada room de socket.io.
 * Además construye algunos datos importantes, como el JSON o XML que define al tablero
 * tesoros y jugadores, en otros
 * 
 * SE ASUME QUE EL JUGADOR 0 ES EL HOST
 */
module.exports = class Sesion
{
	constructor(id)
	{
		this.id = id; //Room Id

		//Valores por default
		this.filas = 15;
		this.columnas = 15; 
		this.jugadores = []; //Indice 0: id, 1: Nombre, 2: Avatar 3:Fila Inicial 4:Columna inicial 5:SocketId 6:contadorTesoros
		this.tesorosPosibles = []; //Indice 0: id, 1: Imagen, 2: Kanji 3:Traduccion 4:Fila Inicial 5:Columna inicial
		this.tesorosPorJugador = 3; //Todo: cambiar por 5
		this.informacionInicial = "";
		this.cantidadMaximaJugadores = 8;

		this.partidaIniciada = false;
		this.jugadoresEnTablero = 0;
	}

	/**
	 * Asigna una posición a todos los tesoros y jugadores en el tablero.
	 * Soporta máximo 8 jugadores, pero lo ideal serian 2-3
	 */
	posicionarElementos()
	{
		//Posiciona a los jugadores
		let posicionesDisponibles = [];

		//Agrega las 8 posiciones posibles
		posicionesDisponibles.push([0,0]);
		posicionesDisponibles.push([0,Math.floor(this.columnas/2)]);
		posicionesDisponibles.push([this.filas-1,Math.floor(this.columnas/2)]);
		posicionesDisponibles.push([Math.floor(this.filas/2),Math.floor(this.columnas/2)]);
		posicionesDisponibles.push([Math.floor(this.filas/2),0]);
		posicionesDisponibles.push([0,this.columnas-1]);
		posicionesDisponibles.push([this.filas-1,0]);
		posicionesDisponibles.push([this.filas-1,this.columnas-1]);



		//Ordena el vector
		for(let iteracion = 0; iteracion < 8; ++iteracion)
		{
			const id1 = Math.floor(Math.random() * posicionesDisponibles.length);	
			const id2 = Math.floor(Math.random() * posicionesDisponibles.length);

			const aux = posicionesDisponibles[id1];
			posicionesDisponibles[id1] = posicionesDisponibles[id2];
			posicionesDisponibles[id2] = aux; 

		}


		for(let indiceJugador = 0; indiceJugador < this.jugadores.length; ++ indiceJugador)
		{
			const jugador = this.jugadores[indiceJugador];
			jugador[3] = posicionesDisponibles[indiceJugador][0]; //Asigna la fila
			jugador[4] = posicionesDisponibles[indiceJugador][1]; //Asigna la columna
			console.log("Al jugador con id: " + indiceJugador + " le asigné la posición: " + posicionesDisponibles[indiceJugador][0] + "," + posicionesDisponibles[indiceJugador][1]);
		}


		//Posiciona los tesoros
		//Crea todas las posiciones posibles (NO permite que queden alineados con los bordes)
		posicionesDisponibles = [];

		for(let fila = 1; fila < this.filas; ++fila)
		{
			for(let columna = 1; columna < this.columnas; ++columna)
			{
				posicionesDisponibles.push([fila,columna]);
			}
		}

		//Ordena el vector
		for(let iteracion = 0; iteracion < (this.filas + this.columnas) * 5; ++iteracion)
		{
			const id1 = Math.floor(Math.random() * posicionesDisponibles.length);	
			const id2 = Math.floor(Math.random() * posicionesDisponibles.length);

			const aux = posicionesDisponibles[id1];
			posicionesDisponibles[id1] = posicionesDisponibles[id2];
			posicionesDisponibles[id2] = aux; 

		}

		//A cada tesoro le asigna una de las posiciones
		for(let tesoro =0 ; tesoro < this.jugadores.length * this.tesorosPorJugador; ++tesoro)
		{
			const tesoroActual = this.getTesoroById(tesoro);
			tesoroActual[4] = posicionesDisponibles[tesoro][0]; 
			tesoroActual[5] = posicionesDisponibles[tesoro][1]; 

			console.log("Asigné: " + posicionesDisponibles[tesoro][0] + ", " + posicionesDisponibles[tesoro][1] + " a algún tesoro xdddd");
		}


	}

	listo()
	{
		console.log("Listo? " + this.jugadores.length + " === " + this.cantidadMaximaJugadores);
		return (this.jugadores.length  === this.cantidadMaximaJugadores);
	}

	getNombreJugadores()
	{
		const nombres = [];

		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
			nombres.push(this.jugadores[jugador][1]); //Mete el nombre de jugador en la lista

		return nombres;
	}

	getTesoroById(id)
	{
		let tesoro = null;

		for(let indice = 0; indice < this.tesorosPosibles.length && tesoro === null; ++indice)
		{
			if(Number(this.tesorosPosibles[indice][0]) === Number(id))
				tesoro = this.tesorosPosibles[indice];
		}

		return tesoro;
	}

	/**
	 * Recibe una solicitud de un usuario para obtener su proximo tesoro.
	 * El campo 6 del array de jugadores contiene el contador de tesoros. Para saber cual tesoro le pertenece, simplemente se hace un:
	 * id + contadorTesoros * total de jugadores
	 * 
	 * Además, se incrementa el contador de dicho jugador en 1
	 * @param {Number} id 
	 */
	obtenerProximoTesoro(id)
	{
		let indiceJugador = -1;

		for(let jugador = 0; jugador < this.jugadores.length && indiceJugador === -1; ++jugador)
		{
			if(Number(this.jugadores[jugador][0]) === Number(id))
				indiceJugador = jugador;
		}

		let nuevoIdTesoro = -1;

		if(this.jugadores[indiceJugador][6] >= this.tesorosPorJugador)
			nuevoIdTesoro = -2;
		else
		{
			//nuevoIdTesoro = this.jugadores[indiceJugador][6] +  this.jugadores.length * this.jugadores[indiceJugador][0];
			nuevoIdTesoro = this.jugadores[indiceJugador][6] +  this.jugadores[indiceJugador][0] * this.tesorosPorJugador;
			this.jugadores[indiceJugador][6] += 1;
		}
		

		console.log("Enviando un " + nuevoIdTesoro);

		return nuevoIdTesoro;
	}	

	/**
	 * Carga todos los tesoros disponibles y les asigna un ID aleatorio
	 */
	poblarTesoros()
	{
		this.tesorosPosibles.push([0,"apple_red","apple_red","manzana",0,0]);
		this.tesorosPosibles.push([1,"arrow_iron","arrow_iron","flecha",0,0]);
		this.tesorosPosibles.push([2,"banana","banana","banana",0,0]);
		this.tesorosPosibles.push([3,"book","book","libro",0,0]);
		this.tesorosPosibles.push([4,"berries","berries","cerezas",0,0]);
		this.tesorosPosibles.push([5,"beef","beef","carne",0,0]);
		this.tesorosPosibles.push([6,"bomb_basic","bomb_basic","bomba",0,0]);
		this.tesorosPosibles.push([7,"bow_oak","bow_oak","arco",0,0]);
		this.tesorosPosibles.push([8,"bread","bread","pan",0,0]);
		this.tesorosPosibles.push([9,"carrot","carrot","zanahoria",0,0]);
		this.tesorosPosibles.push([10,"chest","chest","cofre",0,0]);
		this.tesorosPosibles.push([11,"chicken","chicken","pollo",0,0]);
		this.tesorosPosibles.push([12,"coin_gold_2","coin_gold_2","moneda de oro",0,0]);
		this.tesorosPosibles.push([13,"crown","crown","corona",0,0]);
		this.tesorosPosibles.push([14,"diamond_2","diamond_2","diamante",0,0]);
		this.tesorosPosibles.push([15,"fish","fish","pescado",0,0]);
		this.tesorosPosibles.push([16,"horn","horn","cuerno",0,0]);
		this.tesorosPosibles.push([17,"key","key","llave",0,0]);
		this.tesorosPosibles.push([18,"lumber","lumber","madera",0,0]);
		this.tesorosPosibles.push([19,"mushroom","mushroom","hongo",0,0]);
		this.tesorosPosibles.push([20,"potion_red_small","potion_red_small","pocion",0,0]);
		this.tesorosPosibles.push([21,"ring_ruby","ring_ruby","anillo",0,0]);
		this.tesorosPosibles.push([22,"shield_kite_bronze_2","shield_kite_bronze_2","escudo",0,0]);
		this.tesorosPosibles.push([23,"sword_iron","sword_iron","espada",0,0]);
		this.tesorosPosibles.push([24,"warhammer_iron","warhammer_iron","martillo",0,0]);
		this.tesorosPosibles.push([25,"whip","whip","latigo",0,0]);
		this.tesorosPosibles.push([26,"wool","wool","lana",0,0]);

		//Reordena el id de los tesoros
		let aux = -1;
		for(let iteracion = 0; iteracion < 50; ++iteracion)
		{
			const id1 = Math.floor(Math.random() * this.tesorosPosibles.length);	
			const id2 = Math.floor(Math.random() * this.tesorosPosibles.length);

			aux = this.tesorosPosibles[id1][0];
			this.tesorosPosibles[id1][0] = this.tesorosPosibles[id2][0]; //Cambia el id del tesoro
			this.tesorosPosibles[id2][0] = aux; //Cambia el id del tesoro

		}

		for(let t = 0; t < this.tesorosPosibles.length; ++t)
			console.log(this.tesorosPosibles[t]);
	}




	poblarTablero(fichas,fichasTablero)
	{
		const tablero = [];

		for(let fila = 0; fila < this.filas; ++fila)
		{
			for(let columna = 0; columna < this.columnas; ++ columna)
				//tablero.push(fichas[Math.floor(Math.random() * fichas.length)]);
				tablero.push(15);
		}

		//Setea las esquinas con valores obligatorios
		/*tablero[0] = 5;
		tablero[this.columnas-1] = 6;
		tablero[tablero.length - this.columnas] = 9;
		tablero[tablero.length - 1] = 10; */


		//A cada posición del tesoro le asigna una ficha 15
		for(let tesoro = 0; tesoro < this.jugadores.length * this.tesorosPorJugador; ++ tesoro)
		{
			const tesoroActual = this.getTesoroById([tesoro]);
			tablero[tesoroActual[4] * this.columnas + tesoroActual[5]] = 15;
			
		}

		return tablero;
	}

	validar()
	{
		
		if(this.filas < 10 || isNaN(this.filas))
			this.filas = 10;

		if(this.filas > 15)
			this.filas = 15;

			
		if(this.columnas < 10 || isNaN(this.columnas))
			this.columnas = 10;

		if(this.columnas > 15)
			this.columnas = 15;

		if(this.cantidadMaximaJugadores < 1 || isNaN(this.cantidadMaximaJugadores)) //Permite partidas de un solo jugador a propósito
			this.cantidadMaximaJugadores = 2;

		if(this.cantidadMaximaJugadores > 4)
			this.cantidadMaximaJugadores = 4;
	}

	/**
	 * Representa los datos iniciales de la partida. Dicha información se debe enviar a cada uno de los clientes, el cual se encarga de construir la partida
	 * Los datos se construyen en formato JSON
	 */
	construirInformacionInicial()
	{

		this.validar();



		const fichas = [0,3,5,6,7,9,10,11,12,13,14,15];

		this.poblarTesoros();



		
		let contadorFichasTablero = 0;

		/*this.tesorosPosibles.push([0,"apple_red","apple_red","Manzana"]);
		this.tesorosPosibles.push([1,"chest","chest","Cofre"]);
		this.tesorosPosibles.push([2,"sword_iron","sword_iron","Espada"]);
		this.tesorosPosibles.push([3,"potion_red_small","potion_red_small","Poción"]);*/


		this.informacionInicial = "{\n";

		//Agrega los datos generales de la partida
		this.informacionInicial += "\"jugadores\": " + this.jugadores.length + ",";
		this.informacionInicial += "\"filas\": " + this.filas + ",";
		this.informacionInicial += "\"columnas\": " + this.columnas + ",";
		this.informacionInicial += "\"cantidadTesoros\": " + this.tesorosPorJugador + ",";


		//Agrega los datos de los jugadores
		//TODO: Usar los nombres capturados en los formularios
		//this.jugadores[0] = ([0,"Jugador 1","avatar1",5,6,this.jugadores[0][5],0]);
		//this.jugadores[1] = ([1,"Jugador 2","avatar5",2,2,this.jugadores[1][5],0]);

		this.posicionarElementos();
		const fichasTablero = this.poblarTablero(fichas);


		//Agrega los datos de los tesoros
		this.informacionInicial += "\"Tesoros\":\n[\n";

		for(let indiceTesoro = 0; indiceTesoro < this.tesorosPosibles.length; ++indiceTesoro)
		{
			const tesoro = this.getTesoroById(indiceTesoro);

			this.informacionInicial += "{\n";	

			this.informacionInicial += "\"id\": " + tesoro[0] + ", " +
			"\"imagen\": \"" + tesoro[1] + "\", " +
			"\"kanji\": \"" + tesoro[2] + "\", " +
			"\"traduccion\": \"" + tesoro[3] + "\", " +
			"\"fila\": \"" + tesoro[4] + "\", " +
			"\"columna\": \"" + tesoro[5] + "\" ";

			if(indiceTesoro !== this.tesorosPosibles.length- 1)
				this.informacionInicial += "\n},\n";
			else
				this.informacionInicial += "\n}\n";
		}

		this.informacionInicial += "\n],\n"; // Cierra el array de Tesoros

		this.informacionInicial += "\"Jugadores\":\n[\n";

		for(let indiceJugador = 0; indiceJugador < this.jugadores.length; ++indiceJugador)
		{
			const jugador = this.jugadores[indiceJugador];
			console.log("Jugador: " + indiceJugador + " = " + jugador);
			this.informacionInicial += "{\n";	


			this.informacionInicial += "\"id\": " + jugador[0] + ", " +
				"\"nombre\": \"" + jugador[1] + "\", " +
				"\"avatar\": \"" + jugador[2] + "\", " +
				"\"fila\": " + jugador[3] + ", " +
				"\"columna\": " + jugador[4] + " "
			;

			if(indiceJugador !== this.jugadores.length - 1)
				this.informacionInicial += "\n},\n";
			else
				this.informacionInicial += "\n}\n";
		}

		this.informacionInicial += "\n],\n"; // Cierra el array de jugadores

		//Agrega los datos de los tesoros


		//Agrega las fichas
		this.informacionInicial += "\"Tiles\": \n[\n";


		for(let fila = 0; fila < this.filas; ++fila)
		{
			for(let columna = 0; columna < this.columnas; ++columna)
			{
				//Agrega una ficha de forma aleatoria
				this.informacionInicial += "{\n";	
 
				this.informacionInicial += "\t\"numero\": " + fichasTablero[contadorFichasTablero];
				++contadorFichasTablero;


				this.informacionInicial += "\n},\n";
		
					
			}
		}

		//Crea la ficha sobrante
		this.informacionInicial += "{\n";
		this.informacionInicial += "\t\"numero\": " + fichas[Math.floor(Math.random() * fichas.length)];
		this.informacionInicial += "\n}\n";

		this.informacionInicial += "\n]\n"; // Cierra las fichas
		this.informacionInicial += "}\n"; //Cierra todo el JSON

	
	}

	getInformacionInicial()
	{
		return this.informacionInicial;	
	}

	/**
	 * Agrega el nombre y id de un nuevo jugador, para la sala de espera.
	 * No realiza operaciones realizacionadas con el tablero
	 */
	registrarJugador(nombre)
	{
		const nuevoID = this.jugadores.length;
		//Impide que alguien se ponga el emoji de estrella a proposito para confundir a los demas jugadores
		nombre = nombre.replace("🌟","");
		this.jugadores.push([nuevoID,nombre,"",0,0,0,0]);

		return nuevoID;
	}	

	obtenerJugador(indice)
	{
		this.return(this.jugadores[indice]);
	}


	getCantidadJugadores()
	{
		return this.jugadores.length;
	}

	getId()
	{
		return this.id;
	}

};