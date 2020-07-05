/**
 * Define la clase partida, la cual será la encargada de almacenar algunos datos relacionados con la partida
 */
class Partida
{
    constructor(listaJugadores)
    {
        this.listaJugadores = listaJugadores;
        this.duracionTurno = 0;
        this.jugadorTurno = -1; //Indice de la lista jugadores que indica cual es el jugador actual
        this.finalizada = false;
    }
}
