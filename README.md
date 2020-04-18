## Descripción del proyecto:

Este proyecto consiste en la implementación del juego del laberinto. Dicha implementación debe cumplir con las siguientes características:

## Ideas propias del juego o propuestas por el profesor:

- Tablero de tamaño n x n, con n un número impar del 5 al 9, en donde cada ficha corresponde a un camino que puede contener o no un tesoro.

- Pueden jugar de 2 a 8 personas, si el usuario elige de 2 a 4 jugadores se coloca aleatoriamente el avatar de un jugador en una esquina, si el número de jugador es mayor a 4 entonces se coloca el avatar de los jugadores 5, 6, 7 u 8 en la posición media entre dos esquinas, siendo el número máximo de jugadores 8 (4 esquina y 4 posiciones entre esquinas).

- Para iniciar una partida un jugador debe iniciar la sesión, elegir el tamaño del tablero, la cantidad de jugadores y elegir su avatar, los otros usuarios deben unirse a esa sesión y elegir entre los siete avatares restantes, una vez se una la cantidad necesaria se da inicio a la partida.

- Se pueden realizar inserciones de fichas al principio y al final las filas y columnas que tienen la imagen del triángulo amarillo (que en la matriz de fichas representan una fila o columna par o impar si contamos desde 0), siempre y cuando la inserción no sea en dirección contraria a la última inserción realizada, dichas inserciones serán por turnos de dos minutos, si un usuario no insertara la ficha en ese tiempo sería expulsado.

- Al tablero se le agregan fichas fijas que no se pueden mover pero que no estorben con las fichas que se pueden insertar por las casillas con triángulo amarillo.

- Antes de insertar una ficha el jugador puede elegir si desea girarla 90° a la derecha o izquierda las veces que desee para que la ficha quede de una manera que le sea ventajosa.

- Cuando se realizan las inserciones, se debe realizar el desplazamiento de fichas correspondiente. En caso de que un jugador se encuentre en una ficha expulsada del tablero, entonces el jugador queda en la ficha opuesta, es decir, la ficha insertada.

- Es obligatorio que cada jugador realice una inserción antes de mover su ficha.

- Con respecto al movimiento, el jugador puede llegar a cualquier ubicación siempre y cuando el camino se lo permita. Puede atravesar caminos en los que se encuentren otros jugadores, e incluso varios jugadores pueden estar en la misma ficha. Solamente se puede realizar un movimiento por turno seleccionando la casilla a la que desear ir y haciendo click en un boton que diga “listo”. Es posible omitir el movimiento, y existe la posibilidad de que el jugador no pueda realizar un movimiento debido al camino que lo rodea.

- Cada jugador recibe 6 cartas correspondientes a tesoros que se encuentran en el tablero de juego. El objetivo del juego es que el jugador llegue a ese tesoro. Las cartas se comportan en forma de pila, lo que significa que el jugador solamente sabrá cual es el primer tesoro que debe encontrar. Conforme se vayan encontrando tesoros se desbloquearan los tesoros siguientes.

- El jugador puede ver únicamente la carta corresponde al tesoro que debe encontrar y se verá de una manera resaltada (por el momento consideramos que se vería un poco más grande que las otras tarjetas), las que que ya encontró aparecen al lado izquierdo de la que está buscando y las restantes aparecen boca abajo del lado derecho de la que está buscando. No puede ver la carta que están buscando los rivales , pero sí puede ver cuales tesoros han encontrado los otros jugadores, las restantes aparecen boca abajo.

- El juego termina cuando un jugador haya descubierto los 6 tesoros que le corresponden. En ese caso, dicho jugador será el ganador de la partida.

## Ideas originales para el juego:

- Si un jugador se desconectara de la partida esta continúa pero se elimina este jugador (sus cartas del tesoro restantes no serán reveladas al resto de jugadores), excepto si quedan menos de dos jugadores, si este fuera el caso se declara como ganador al jugador todavía activo.

- Como restricción, el tesoro del juego no debe ser exactamente igual al tesoro en las fichas, sino que debe realizarse un mapeo entre las cartas y los “tesoros” representados.
- El mapeo realizado estará enfocado en la enseñanza del vocabulario japonés. Para ello, cada carta contendra caracteres en kanji, los cuales deberan ser asociados a imagenes en el tablero o palabras en español. 

- Los tipos de caminos a los que pertenecen cada ficha deben estar equilibrados con respecto al tamaño del tablero. Es decir, no todas las fichas deben ser caminos horizontales por ejemplo, sino que debe establecerse una proporción entre la cantidad de tipos de fichas que van a estar presentes en el tablero.

- Una restricción adicional consiste en prohibir que más de un jugador se encuentre en la misma posición. De este modo, al final del juego se incrementa la competitivad dado que los jugadores podrán bloquear temporalmente los tesoros restantes, los cuales serán faciles de deducir debido a la cantidad de tesoros encontrados

- Cuando se realiza una inserción y se expulsa a un jugador del tablero, el jugador expulsado perderá su carta, la cual será devuelta al final de la pila, obligando al jugador a sacar la próxima carta. En caso de que el jugador tenga una sola carta, está situación no aplicará.

- Se agregan nuevas fichas que pueden causar efectos especiales: Uno de ellos consiste en una ficha que no conecta a ningún otro camino, de modo que bloquee el movimiento. Si un jugador es desplazado a esta ficha debido a una inserción, entonces podra moverse en cualquiera de las 4 direcciones, la llamariamos "ficha trampolin".

- Otra ficha especial consiste en una ficha que se comporta como un camino normal, pero que si el jugador se detiene en ella o es desplazado hacia ella entonces lo obligue a revelar su carta actual de tesoro


## Contexto:

Laberinto es un juego de mesa para para dos, tres o cuatro jugadores. El juego consiste en que los jugadores vayan obteniendo, uno por uno, los tesoros que seleccionaron al azar de un grupo más grande de tesoros. Al iniciar la partida cada jugador elige su avatar y escoge al azar sus seis tesoros (de los cuales solo podrá observar el tesoro que se encuentre de primero en su pila de tesoros), se colocan las fichas de manera aleatoria en el tablero, de modo que siempre  sobrará una ficha. Durante su turno, cada jugador deberá insertar la ficha por un lado del tablero para así mover el laberinto a su favor y lograr acercarse (el jugador debe insertar la ficha pero no está obligado a mover su avatar) o llegar a su tesoro.  No es posible insertar una ficha al lado opuesto del tablero donde se insertó la ficha anterior. Durante cada inserción, una ficha será sacada del tablero, por lo que dicha ficha le será entregada  al siguiente jugador, para que este proceda con su turno. El jugador que logre conseguir todos sus tesoros es el ganador.

Existen dos objetivos principales con este proyecto: El principal objetivo al implementar el juego de laberinto en una página web consiste en aplicar los temas académicos vistos en el curso de Desarrollo de Aplicaciones para Internet. El segundo objetivo consiste en implementar ideas propias para crear un producto original y promover el aprendizaje del idioma japonés.

A diferencia al juego original de Laberinto, el equipo de desarrollo piensa implementar varias ideas originales. Entre estas ideas originales está que al desconectarse un usuario de la partida, este es eliminado de la misma junto con su avatar. En caso de que quede solamente un jugador, dicho jugador sería declarado ganador. Si un jugador al insertar su ficha al tablero expulsa el avatar de otro jugador, el jugador expulsado debe poner la ficha del tesoro que esté buscando al final de la pila de tesoros y seleccionar el tesoro siguiente. Una ficha especial consiste en una ficha que se comporta como un camino normal, pero que si el jugador se detiene en ella o es desplazado hacia ella entonces lo obligue a revelar su carta actual de tesoro.

Otras modificaciones al juego que fueron ideas propias del profesor del curso son que el tablero sea de tamaño n x n, con n un número impar del 5 al 9, en donde cada ficha corresponde a un camino que puede contener o no un tesoro. También en esta versión del juego pueden jugar de 2 a 8 personas, si el usuario elige de 2 a 4 jugadores se coloca aleatoriamente el avatar de un jugador en una esquina, si el número de jugador es mayor a 4 entonces se coloca el avatar de los jugadores 5, 6, 7 u 8 en la posición media entre dos esquinas, siendo el número máximo de jugadores 8 (4 esquina y 4 posiciones entre esquinas).

Los símbolos del tesoro a encontrar y el tesoro en el mapa serán diferentes. Para ello, se realizará un mapeo entre imagenes del tesoro y la escritura en japonés de dicho tesoro.   Cada carta de tesoro a encontrar tendrá una escritura en caracteres Kanji, mientras que los tesoros en el mapa se representarán con ilustraciones predeterminadas. Esto quiere decir que todas las partidas tendrán los mismos kanjis e ilustraciones en el mapa.

La versión física del juego del laberinto requiere de ordenar constantemente varias fichas en el tablero físico y de un cuidado muy especial por mantener ocultos de los demás jugadores los tesoros a encontrar. Sin embargo, la implementación de este juego en un sitio web puede facilitar estos aspectos, debido a que la generación de mapas y  la distribución de tesoros se realizará de manera automática. Además, se podrá ocultar los tesoros de los otros jugadores de una forma más fácil, e incluso se podrá validar que los jugadores no hagan trampa y vean sus próximos tesoros a encontrar.

Para la implementación del sitio web, se contará con un equipo de dos integrantes, los cuales se encargaran de forma equilibrada de realizar todas las etapas del proyecto: diseño, implementación, testing, entre otras. Además, se contará con supervisión del profesor, el cual se encargará de realizar revisiones periódicas de cada una de las actividades a realizar en cada etapa del proyecto. El proyecto web correrá en un servidor con sistema operativo Linux, provisto por la Universidad de Costa Rica o por el profesor del curso.

Dentro de los posibles obstáculos se encuentra el hecho de que el aprendizaje del curso de aplicaciones de Internet se realizará de forma paralela con el desarrollo del proyecto, lo que puede causar problemas en la estimación de tiempo y dificultad del proyecto, además de la aparición de posibles bugs y errores que tomen más tiempo de solucionar debido a la falta de experiencia. Otro obstáculo presentado es la crisis de la pandemia COVID-19, la cual ha obligado a la población en general a permanecer en sus casas,  impidiendo así reuniones presenciales para tratar asuntos del proyecto. Sin embargo, este obstáculo también puede considerarse como una oportunidad para aprender a trabajar de forma remota.



Bibliografía consultada para el contexto:

- Labyrinth - A family game from Ravensburger
https://www.ravensburger.org/uk/discover/labyrinth/index.html

- how to play the board game labyrinth. Video de Youtube, 12 sep. 2018.
https://www.youtube.com/watch?v=gMQ5GaBKXus

