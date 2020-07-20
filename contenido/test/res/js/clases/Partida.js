/**
 * Define la clase partida, la cual será la encargada de almacenar algunos datos relacionados con la partida
 */
export default class Partida
{
	constructor(jugadores)
	{
		this.jugadores = jugadores;
		this.duracionTurno = 0;
		this.jugadorTurno = 0; //Indice de la lista jugadores que indica cual es el jugador actual
		this.finalizada = false;
		this.contadorTurnos = 0;
		this.fase = 0; //0 => insercion, 1 => movimiento
		this.tesoros = [];
		this.miId = -1; //Indica cuál es mi ID. Este id es el que me diferencia de los demás jugadores

		this.fichaSobrante = null;
		this.tesorosPorJugador = 5;

		this.fases = ["Insertando Ficha", "Realizando Movimiento", "Esperando"];
	}

	/**
	 * Coloca un emoji de estrella al final del nombre del panel del jugador actual 
	 */
	distingame()
	{
		this.jugadores[this.miId].agregarEstrella();
	}

	/**
	 * Cambia mi tesoro asignado
	 * @param {} idTesoro 
	 */
	cambiarMiTesoroAsignado(idTesoro)
	{
		let tesoro = null;

		//Busca la instancia del tesoro que coincida con el id
		for(let indiceTesoro = 0; indiceTesoro < this.tesoros.length && tesoro === null; ++indiceTesoro)
		{
			if(Number(this.tesoros[indiceTesoro].id) === Number(idTesoro))
				tesoro = this.tesoros[indiceTesoro];
		}


		//Actualiza el tesoro del jugador
		this.jugadores[this.miId].asignarTesoro(tesoro);

	}

	esMiTurno()
	{

		console.log("Turno de: " + this.jugadorTurno + ", mi id: " + this.miId);
		return this.jugadorTurno === this.miId;
	}

	/**
	 * Desactiva cualquier acción y despliega la información del ganador de la partida
	 */
	finalizar()
	{
		this.fase = -1;
		this.finalizada = true;

		alert("Felicidades, el jugador " + this.jugadores[this. jugadorTurno].nombre + " ha ganado la partida");



		//Recorre todas las secciones de los jugadores e indica quien ganó
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			const jugadorActual = this.jugadores[jugador];

			jugadorActual.actualizarEstado(".");

		}
		

		this.jugadores[this. jugadorTurno].actualizarEstado("Ganador");
	}

	comerTesoro(fila,columna, tesoroId)
	{
		this.jugadores[this.jugadorTurno].comerTesoro(fila,columna, this.tesoros[tesoroId]);
		this.jugadores[this.jugadorTurno].actualizarDatosTesoro(this.tesoros[tesoroId]);

	}

	/**
	 * Verifica si el jugador actual encontró su tesoro asignado
	 */
	tesoroEncontrado(fila,columna)
	{
		const encontrado = this.jugadores[this.jugadorTurno].verificarTesoroEncontrado(fila,columna);


		return encontrado;
	}

	/**
	 * Le asigna un tesoro al próximo Jugador
	 */
	asignarProximoTesoro()
	{
		const jugadorAnalizado = this.jugadores[this.jugadorTurno];
		let tesoroAsignado = false;

		for(let tesoro = 0; tesoro < this.tesoros.length && !tesoroAsignado; ++tesoro)
		{
			const tesoroAnalizado = this.tesoros[tesoro];

			if(tesoroAnalizado.esAsignable(jugadorAnalizado.id))
			{
				tesoroAsignado = true;
				jugadorAnalizado.asignarTesoro(tesoroAnalizado);
			}
		}

		return tesoroAsignado;
	}

	/**
	 * Asigna un tesoro a cada jugador
	 */
	asignarTesorosIniciales()
	{
		/*for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			let tesoroAsignado = false;
			const jugadorAnalizado = this.jugadores[jugador];
			for(let tesoro = 0; tesoro < this.tesoros.length && !tesoroAsignado; ++tesoro)
			{
				const tesoroAnalizado = this.tesoros[tesoro];

				if(tesoroAnalizado.esAsignable(jugadorAnalizado.id))
				{
					tesoroAsignado = true;
					jugadorAnalizado.asignarTesoro(tesoroAnalizado);
				}
			}
		}*/
	}


	moverJugadorActual(fila,columna)
	{
		this.jugadores[this.jugadorTurno].moverse(fila,columna);
	}

	asignarProximoJugador()
	{
		if(!this.finalizada)
		{
			if(this.jugadorTurno !== -1)
				this.jugadores[this.jugadorTurno].actualizarEstado(this.fases[2]);
			this.jugadorTurno = (this.jugadorTurno + 1) % this.jugadores.length;
		}
	}

	estaEnInsercion()
	{
		return (this.fase === 0);
	}

	estaEnMovimiento()
	{
		return (this.fase === 1);
	}

	estaEnEspera()
	{
		return (this.fase === 2);
	}

	actualizarInformacionEstados()
	{
		//Actualiza la información de todas las secciones de jugadores
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			const jugadorActual = this.jugadores[jugador];

			if(jugador !== this.jugadorTurno)
			{
				jugadorActual.actualizarEstado(this.fases[2]);
			}
			else
			{
				jugadorActual.actualizarEstado(this.fases[this.fase]);
			}
		}

	}

	proximaFase()
	{
		this.fase = (this.fase + 1) % 3; //Solo existen 3 etapas	
	}

	construirJugadores()
	{
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
			this.jugadores[jugador].generarVistaJugador();
	
	}

	representarTurnoJugadorActual()
	{
		this.jugadores[this.jugadorTurno].representarTurno();
	}
}

