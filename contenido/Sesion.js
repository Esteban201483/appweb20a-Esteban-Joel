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


		this.filas = 15;
		this.columnas = 15; 
		this.jugadores = []; //Indice 0: id, 1: Nombre, 2: Avatar 3:Fila Inicial 4:Columna inicial 5:SocketId 6:contadorTesoros
		this.tesorosPosibles = []; //Indice 0: id, 1: Imagen, 2: Kanji 3:Traduccion 4:Fila Inicial 5:Columna inicial
		this.tesorosPorJugador = 1; //Todo: cambiar por 5
		this.informacionInicial = "";
		this.cantidadMaximaJugadores = 8;

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
	 * @param {Number} socketId 
	 */
	obtenerProximoTesoro(socketId)
	{
		let indiceJugador = -1;

		for(let jugador = 0; jugador < this.jugadores.length && indiceJugador === -1; ++jugador)
		{
			if(this.jugadores[jugador][5] === socketId)
				indiceJugador = jugador;
		}

		let nuevoIdTesoro = -1;

		if(this.jugadores[indiceJugador][6] >= this.tesorosPorJugador)
			nuevoIdTesoro = -2;
		else
		{
			nuevoIdTesoro = this.jugadores[indiceJugador][6] +  this.jugadores.length * this.jugadores[indiceJugador][0];
			this.jugadores[indiceJugador][6] += 1;
		}
		

		console.log("Enviando un " + nuevoIdTesoro);

		return nuevoIdTesoro;
	}	

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
				tablero.push(fichas[Math.floor(Math.random() * fichas.length)]);
		}

		//Setea las esquinas con valores obligatorios
		tablero[0] = 5;
		tablero[this.columnas-1] = 6;
		tablero[tablero.length - this.columnas] = 9;
		tablero[tablero.length - 1] = 10; 

		return tablero;
	}

	/**
	 * Representa los datos iniciales de la partida. Dicha información se debe enviar a cada uno de los clientes, el cual se encarga de construir la partida
	 * Los datos se construyen en formato JSON
	 */
	construirInformacionInicial()
	{
		const fichas = [0,3,5,6,7,9,10,11,12,13,14,15];

		this.poblarTesoros();

		const fichasTablero = this.poblarTablero(fichas);
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
		this.jugadores[0] = ([0,"Esteban","avatar1",5,6,this.jugadores[0][5],0]);
		this.jugadores[1] = ([1,"Joel","avatar5",2,2,this.jugadores[1][5],0]);

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


	agregarTesoro(id,imagen,kanji,traduccion,fila,columna)
	{
		//this.tesoros.push([id,imagen,kanji,traduccion,fila,columna]);
	}

	agregarJugador(/*id,nombre,avatar,fila,columna,*/socketId)
	{
		this.jugadores.push([this.jugadores.length,"","",0,0,socketId,-1]);
	}

	/**
	 * Agrega el nombre y id de un nuevo jugador, para la sala de espera.
	 * No realiza operaciones realizacionadas con el tablero
	 */
	registrarJugador(nombre)
	{
		//Impide que alguien se ponga el emoji de estrella a proposito para confundir a los demas jugadores
		nombre = nombre.replace("🌟","");
		this.jugadores.push([this.jugadores.length,nombre,"",0,0,0,-1]);
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