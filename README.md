## Descripción del proyecto:

Este proyecto consiste en la implementación del juego del laberinto. Dicha implementación debe cumplir con las siguientes características:

- Tablero de tamaño n x n, con n un número impar del 5 al 9, en donde cada ficha corresponde a un camino que puede contener o no un tesoro.

- Pueden jugar de 2 a 8 personas, si el usuario elige de 2 a 4 jugadores se coloca aleatoriamente el avatar de un jugador en una esquina, si el número de jugador es mayor a 4 entonces se coloca el avatar de los jugadores 5, 6, 7 u 8 en la posición media entre dos esquinas, siendo el número máximo de jugadores 8 (4 esquina y 4 posiciones entre esquinas).

- Para iniciar una partida un jugador debe iniciar la sesión, elegir el tamaño del tablero, la cantidad de jugadores y elegir su avatar, los otros usuarios deben unirse a esa sesión y elegir entre los siete avatares restantes, una vez se una la cantidad necesaria se da inicio a la partida.

- Se pueden realizar inserciones de fichas al principio y al final las filas y columnas que tienen la imagen del triángulo amarillo (que en la matriz de fichas representan una fila o columna par o impar si contamos desde 0), siempre y cuando la inserción no sea en dirección contraria a la última inserción realizada, dichas inserciones serán por turnos de dos minutos, si un usuario no insertara la ficha en ese tiempo sería expulsado.

- Los tipos de caminos a los que pertenecen cada ficha deben estar equilibrados con respecto al tamaño del tablero. Es decir, no todas las fichas deben ser caminos horizontales por ejemplo, sino que debe establecerse una proporción entre la cantidad de tipos de fichas que van a estar presentes en el tablero.

- Antes de insertar una ficha el jugador puede elegir si desea girarla 90° a la derecha o izquierda las veces que desee para que la ficha quede de una manera que le sea ventajosa.

- Cuando se realizan las inserciones, se debe realizar el desplazamiento de fichas correspondiente. En caso de que un jugador se encuentre en una ficha expulsada del tablero, entonces el jugador queda en la ficha opuesta, es decir, la ficha insertada.

- Es obligatorio que cada jugador realice una inserción antes de mover su ficha.

- Con respecto al movimiento, el jugador puede llegar a cualquier ubicación siempre y cuando el camino se lo permita. Puede atravesar caminos en los que se encuentren otros jugadores, e incluso varios jugadores pueden estar en la misma ficha. Solamente se puede realizar un movimiento por turno seleccionando la casilla a la que desear ir y haciendo click en un boton que diga “listo”. Es posible omitir el movimiento, y existe la posibilidad de que el jugador no pueda realizar un movimiento debido al camino que lo rodea.

- Cada jugador recibe 6 cartas correspondientes a tesoros que se encuentran en el tablero de juego. El objetivo del juego es que el jugador llegue a ese tesoro. Las cartas se comportan en forma de pila, lo que significa que el jugador solamente sabrá cual es el primer tesoro que debe encontrar. Conforme se vayan encontrando tesoros se desbloquearan los tesoros siguientes.

- Como restricción, el tesoro del juego no debe ser exactamente igual al tesoro en las fichas, sino que debe realizarse un mapeo entre las cartas y los “tesoros” representados.

- El jugador puede ver únicamente la carta corresponde al tesoro que debe encontrar y se verá de una manera resaltada (por el momento consideramos que se vería un poco más grande que las otras tarjetas), las que que ya encontró aparecen al lado izquierdo de la que está buscando y las restantes aparecen boca abajo del lado derecho de la que está buscando. No puede ver la carta que están buscando los rivales , pero sí puede ver cuales tesoros han encontrado los otros jugadores, las restantes aparecen boca abajo.

- Si un jugador se desconectara de la partida esta continúa pero se elimina este jugador, excepto si quedan menos de dos jugadores, si este fuera el caso se declara como ganador al jugador todavía activo.

- El juego termina cuando un jugador haya descubierto los 6 tesoros que le corresponden. En ese caso, dicho jugador será el ganador de la partida.