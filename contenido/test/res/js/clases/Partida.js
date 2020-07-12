/**
 * Define la clase partida, la cual será la encargada de almacenar algunos datos relacionados con la partida
 */
export default class Partida
{
	constructor(jugadores)
	{
		this.jugadores = jugadores;
		this.duracionTurno = 0;
		this.jugadorTurno = -1; //Indice de la lista jugadores que indica cual es el jugador actual
		this.finalizada = false;
		this.contadorTurnos = 0;
		this.fase = 0; //0 => insercion, 1 => movimiento
		this.tesoros = [];

		this.fases = ["Insertando Ficha", "Realizando Movimiento", "Esperando"];
	}

	/**
	 * Desactiva cualquier acción y despliega la información del ganador de la partida
	 */
	finalizar()
	{
		this.fase = -1;

		alert("Felicidades, el jugador " + this.jugadores[this. jugadorTurno].nombre + " ha ganado la partida");

		//Recorre todas las secciones de los jugadores e indica quien ganó
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
		{
			const jugadorActual = this.jugadores[jugador];

			if(jugador !== this.jugadorTurno)
			{
				jugadorActual.actualizarEstado(".");
			}
			else
			{
				jugadorActual.actualizarEstado("Ganador");
			}
		}
	}

	/**
	 * Verifica si el jugador actual encontró su tesoro asignado
	 */
	tesoroEncontrado(fila,columna)
	{
		const encontrado = this.jugadores[this.jugadorTurno].verificarTesoroEncontrado(fila,columna);

		if(encontrado)
		{
			this.jugadores[this.jugadorTurno].actualizarDatosTesoro();
			if(!this.asignarProximoTesoro()) //Le asigna otro tesoro al jugador
			{
				//Si no pudo asignar otro tesoro, quiere decir que la partida ha terminado
				this.finalizada = true;
			}
		}

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
		for(let jugador = 0; jugador < this.jugadores.length; ++jugador)
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
		}
	}


	moverJugadorActual(fila,columna)
	{
		this.jugadores[this.jugadorTurno].moverse(fila,columna);
	}

	asignarProximoJugador()
	{
		if(this.jugadorTurno !== -1)
			this.jugadores[this.jugadorTurno].actualizarEstado(this.fases[2]);
		this.jugadorTurno = (this.jugadorTurno + 1) % this.jugadores.length;
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

