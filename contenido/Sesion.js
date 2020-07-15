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
		this.jugadores = [""]; //Indice 0: id, 1: Nombre, 2: Avatar 3:Fila Inicial 4:Columna inicial 5:SocketId
		this.tesoros = []; //Indice 0: id, 1: Imagen, 2: Kanji 3:Traduccion 4:Fila Inicial 5:Columna inicial

		this.informacionInicial = "";

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

	agregarJugador(id,nombre,avatar,fila,columna,socketId)
	{
		this.jugadores.push([id,nombre,avatar,fila,columna,socketId]);
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