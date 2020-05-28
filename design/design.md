## Diseño de la aplicación

## Mapa del sitio
![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/sitemap/Mapa%20de%20sitio.jpg)

En este mapa del sitio se muestra la ruta de navegación del sitio web del juego.  Dentro de la circunferencia se encuentran las páginas accesibles desde la página principal. Tanto crear sesión como unirse a sesión pueden llevar a la página principal si se decide cancelar la respectiva acción. En caso la acción se complete, ambas pantallas dirigen a la pantalla de Sala de espera. Desde esta pantalla, se puede acceder a la pantalla de partida, la cual utiliza como contenido el tablero. El tablero posee fichas, de las cuales podrían ser también tesoros. Es a partir de la página de crear sesión  o unirse a sesión en donde se dedice si el jugador será un jugador normal o si será un host.

En el overlay de instrucciones se despliega material multimedia que indica como se juega y se explican las reglas del juego.

En la pantalla de crear sesión un usuario puede crear una nueva sesión de juego, desde la cual puede especificar las opciones de la partida, tales como el tamaño del tablero y la duración del turno. Además, indica su nombre y avatar. Una vez el proceso se haya completado, dicho usuario ahora será un host y será redirigido a la sala de espera.

 En la pantalla de unirse a sesión un usuario puede unirse a una sesión al ingresar el ID de la sesión correspondiente. Además, puede indicar si quiere ver traducciones al español de los kanjis y debe suministrar su nombre de jugador y avatar. Una vez el proceso se haya completado, dicho usuario ahora será un jugador y será redirigido a la sala de espera.
 
 En la pantalla de sala de espera se despliega el ID de la sesión y un listado de jugadores unidos a la sesión. En esta pantalla, el moderador puede empezar la partida (si hay la cantidad mínima de jugadores requerida).
 
 En la pantalla de Partida es en donde ocurre todo el proceso del juego. Es aquí donde los jugadores participan en la partida, indiferentemente de si son jugadores normales o host. En esta pantalla los jugadores podrán ver información acerca del estado del juego, además de ver el tablero y datos de los demás participantes.

 
## Wireframes

1. Pantalla principal

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/Pagina%20principal.png)
La Pantalla Principal de la aplicación muestra los últimos jugadores que han salido victoriosos en el juego (1) y nos da dos opciones: crear una partida(2) y buscar una partida(3).


2. Crear Juego

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/crear%20juego.png)
La pantalla de Crear Juego permite a un usuario crear una partida ingresando su nombre (1), estableciendo la duración del turno (2), la cantidad de jugadores en la partida (3) y el tamaño del tablero (4)(5). Para pasar a la siguiente pantalla el usuario puede hacer click en "Aceptar"(6) o volver a la pantalla principal(7).


3. Unirse a Juego

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/unirse%20a%20partida.png)
La pantalla de Unirse a Juego permite a un usuario unirse a una partida ingresando su nombre (1), el ID de la sesión (2), seleccionar su avatar (3), elegir si desea o no ver las traducciones del japonés al español en las fichas (4). Una vez ingresados los datos el usuario puede elegir pasar al lobby (5) o volver a la pantalla principal(6).

4. Instrucciones

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/instrucciones.png)
La pantalla de Instrucciones permite al usuario visualizar las partes de la pantalla de partida del juego y un listado de instrucciones para iniciar ua partida. El usuario puede hacer click en "Aceptar" para volver a la pantalla en la que se encontraba(1).

5. Partida Jugador

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/Partida%20jugador.png)
Esta es la pantalla que ve un jugador en la partida, permite visualizar por cuales bordes del tablero(3) se permite el ingreso de fichas(1), los tesoros en el tablero(2). En el panel derecho de esta pantalla podemos visualizar el tesoro que está buscando el jugador actualmente(4), la ficha que debe insertar en el tablero(5) la cual puede ser girada, la pila de tesoros ya encontrados por el jugador(6), la pila de tesoros pendientes por encontrar (7). También en esta pantalla se puede verificar quién tiene el turno activo (si es el turno del jugador este puede hacer clock en "finalizar" para dar por finalizado su turno) y el tiempo restante del turno(8) junto con le estado de los dempas jugadores (9).

6. Sala de espera
![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/sala%20de%20espera.png)

Esta es la pantalla que ven los jugadores antes de iniciar la partida. (1) Muestra el id de la Sesión de Juego con el objetivo de que sea compartido y así más jugadores puedan unirse a la sesión. En (2) se muestran los jugadores que se encuentran unidos en la sesión, mientras que en la parte (3) le permite exclusivamente al Host expulsar jugadores unidos. El botón iniciar partida (4) le permite al host empezar la partida. Dicha opción solo estará disponible cuando se encuentren unidos la mínima cantidad de jugadores requerida. El botón cancelar (5) le permite al host cancelar la partida, de modo que los jugadores que se encuentran en dicha sesión serán notificados del cierre de la sesión.

7. Seleccionar Avatar

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/src/seleccionar%20avatar.png)

Este overlay le permite el usuario seleccionar una imagen de avatar. En la X de la esquina superior derecha (1) puede cerrar el modal manteniendo el avatar seleccionado anteriormente. La parte (2) despliega un listado de avatares a escoger. El jugador debe presionar sobre uno de ellos, el cual se resaltará con un borde de color azul para indicar que será el nuevo avatar. De igual forma, el jugador puede cambiar su elección volviendo a presionar sobre otro avatar. Al presionar el botón aceptar (3), el avatar seleccionado será su nuevo avatar. 

## Wirestate

![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/wirestates/wirestates%20diagram.svg)

**Preparar crear sesión: Prepara los campos necesarios para que el usuario configure la nueva partida**

**Crear sesión: Permite crear la sesión, configurando el websocket y almacenando datos de la nueva sesión*

**Unirse a sesión: Permite unirse a una nueva sesión mediante un código. Conecta al jugador al websocket de la sesión**

**Preparar Juego: Crea el tablero, distribuye tesoros, determinar el orden de los jugadores y determina la ficha a insertar.**

**Actualizar posición: actualiza la posición hacia la cual el usuario va a moverse**

**Realizar movimiento: Realiza el movimiento definitivo, o bien, lo omite si es lo que el jugador indicó.**

**Finalizar Partida: Determina al ganador, libera memoria y despliega mensajes de victoria/derrota a cada jugador.**

**Regresar al Lobby: Devuelve al jugador al lobby, manteniendo activa la comunicación con el websocket**


**El link del figma es:** https://www.figma.com/file/GQBOYzZ8Jxd74m6oOEzYQi/Wireframe-del-proyecto-Juego-del-Laberinto?node-id=46%3A78 

## Messages
![](https://github.com/Esteban201483/appweb20a-Esteban-Joel/blob/master/design/messages/src/fichas.png)
