/**
 * Almacena los datos requeridos para el manejo de cada room de socket.io.
 * Además construye algunos datos importantes, como el JSON o XML que define al tablero
 * tesoros y jugadores, en otros
 */
module.exports = class Sesion
{
	constructor(id)
	{
		this.id = id;


		this.filas = 111;
		this.columnas = 11; 
		this.jugadores = []; //Indice 0: id, 1: Nombre, 2: Avatar 3:Fila Inicial 4:Columna inicial 5:SocketId 6:contadorTesoros
		this.tesoros = []; //Indice 0: id, 1: Imagen, 2: Kanji 3:Traduccion 4:Fila Inicial 5:Columna inicial

		this.informacionInicial = "";

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

		const nuevoIdTesoro = this.jugadores[indiceJugador][6] +  this.jugadores.length * this.jugadores[indiceJugador][0];
		this.jugadores[indiceJugador][6] += 1;

		console.log("Enviando un " + nuevoIdTesoro);

		return nuevoIdTesoro;
	}	

	/**
	 * Representa los datos iniciales de la partida. Dicha información se debe enviar a cada uno de los clientes, el cual se encarga de construir la partida
	 * Los datos se construyen en formato JSON
	 */
	construirInformacionInicial()
	{
		const fichas = [0,3,5,6,7,9,10,11,12,13,14,15];

		const tesorosPosibles = [];
		tesorosPosibles.push([0,"apple_red","apple_red","Manzana"]);
		tesorosPosibles.push([1,"chest","chest","Cofre"]);
		tesorosPosibles.push([2,"sword_iron","sword_iron","Espada"]);
		tesorosPosibles.push([3,"potion_red_small","potion_red_small","Poción"]);

		const tesorosPorJugador = 2; //TODO: Cambiar a 5

		this.informacionInicial = "{\n";

		//Agrega los datos generales de la partida
		this.informacionInicial += "\"jugadores\": " + this.jugadores.length + ",";
		this.informacionInicial += "\"filas\": " + this.filas + ",";
		this.informacionInicial += "\"columnas\": " + this.columnas + ",";

		//Agrega los datos de los jugadores
		//TODO: Usar los nombres capturados en los formularios
		this.jugadores[0] = ([0,"Esteban","avatar1",5,6,this.jugadores[0][5],0]);
		this.jugadores[1] = ([1,"Joel","avatar5",2,2,this.jugadores[1][5],0]);

		//Agrega los datos de los tesoros
		//TODO: generarlos automátciamente

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
 
				this.informacionInicial += "\t\"numero\": " + fichas[Math.floor(Math.random() * fichas.length)];


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
		this.tesoros.push([id,imagen,kanji,traduccion,fila,columna]);
	}

	agregarJugador(/*id,nombre,avatar,fila,columna,*/socketId)
	{
		this.jugadores.push([this.jugadores.length,"","",0,0,socketId,-1]);
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