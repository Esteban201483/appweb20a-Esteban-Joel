


            /**
             * Define la clase jugador, la cual será la encargada de almacenar todos los datos relacionados
             * a los jugadores de la partida
             */ 
             class Jugador
             {

                constructor(nombre,numeroJugador,avatar,filaActual,columnaActual)
                {
                    this.nombre = nombre; 
                    this.numeroJugador = numeroJugador;
                    this.avatar = avatar;
                    this.filaActual = filaActual;
                    this.columnaActual = columnaActual;
                }

                debug()
                {
                    //alert(this.nombre);
                }

             }



            
            //Variables de la partida
            var filas, columnas; //Dimensiones del tablero
            var tiempoTurno; //Duración del turno en segundos
            var ayudas; //Indica si se muestra la traducción al español del elemento

            //Variables del tablero
            var jugadores = [];



            function setTesoroAvatar(imgId,imageSrc)
            {
               $("#" + imgId).attr("hidden",false);
               $("#" + imgId).attr("src",imageSrc);
             
            }

            /**
             * Este método recibe las variables necesarias para el desarrollo del juego
             * 
             */
            function inicializarVariables()
            {
                filas = 7;
                columnas = 7;
                tiempoTurno = 120;
                ayudas = true;

                jugadores.push(new Jugador("Esteban",1,"",0,0));
                jugadores.push(new Jugador("Joel",2,"",4,4));

            }


            /**
             * Devuelve el código de un salto de línea semánticamente correcto
             */
            function obtenerSaltoLinea()
            {
                return "<br/>"
            }

            /**
             * Devuelve el código para crear un elemento IMG.
             * @param {String} id El identificador del nuevo elemento img
             * @param {int} dimension El ancho y alto al que se debe redimensionar la imagen
             * @param {String} rutaImagen La dirección de la imagen
             * @param {String} classElement La clase del elemento img
             */
            function obtenerElementoImg(id, dimension, rutaImagen, classElement)
            {
                return "<img id=\""+id+"\" class=\""+classElement+"\"" +
                " src=\""+rutaImagen+"\" height=\""+dimension+"\" width=\""+dimension+"\" />";
            }

            function obtenerElementoImgOculto(id, dimension, classElement)
            {
                return "<img id=\""+id+"\" hidden=\"hidden\" class=\""+classElement+"\""+
                " height=\""+dimension+"\" width=\""+dimension+"\" />";
            }

            function obtenerAperturaDivContenedor()
            {
                return "<div class=\"contenedorImagen\">"
            }

            /**
             * Devuelve el código para crear todos los elementos que representan una ficha.
             * Los elementos en total son:
             *      div contenedor
             *      img para la ficha del tablero
             *      img para la ficha del avatar de jugador (Oculto por defecto)
             *      img para la ficha del tesoro (Oculto por defecto)
             * @param {String} id El identificador del nuevo elemento img
             * @param {int} dimension El ancho y alto al que se debe redimensionar la imagen
             * @param {String} rutaImagen La dirección de la imagen
             */
            function obtenerBloqueTablero(id, dimension, rutaImagen)
            {
                return obtenerAperturaDivContenedor() + " " + 
                obtenerElementoImg("Ficha" + id,dimension,rutaImagen,"fichaTablero") + " " + 
                obtenerElementoImgOculto("avatar" + id,dimension,"avatarTablero") + " " + 
                obtenerElementoImgOculto("tesoro" + id, dimension,"tesoroTablero") +  " </div>";
            }

            /**
             * Se encarga de crear un tablero de forma dinámica.
             * todo: Especificar como se obtienen los datos para la creación del tablero
             */
            function crearTablero()
            {

                var contenedorTablero = $("#contenedorTablero"); //Obtiene el div que almacenará al tablero


                var size = 550 / Math.min(filas + 2,columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
                var idFlecha = 0; //Contador para identificar las flechas
                var nombreFlecha = "Flecha";
                var nombreFicha = "Ficha";

                var fichas = ["cruz.png","recta.png","bloqueo.png","l.png","t.png"];

                var contadorFicha = 0;

                contenedorTablero.append(obtenerElementoImg("",size, "res/img/fichas/vacia.png"));
                //crea las flechas superiores
                for(var columna = 0; columna < (columnas); ++columna)
                {
                    if((columna % 2) == 0) //Coloca imagenes vacias en las posiciones pares
                        contenedorTablero.append(obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
                    else //Coloca las imagenes de las flechas verticales
                    {
                        contenedorTablero.append(obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha superior.png"));
                        ++idFlecha;
                    }
                }

                contenedorTablero.append(obtenerSaltoLinea());

                for(var fila = 0; fila < filas; ++fila)
                {

                    //Controla la creación de flechas al lado izquierdo del tablero
                    if(((fila+1) % 2 != 0) && (fila+1) != filas+2) //Coloca imagenes vacias en las posiciones pares
                        contenedorTablero.append(obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
                    else //Coloca las imagenes de las flechas izquierdas
                    {
                        contenedorTablero.append(obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha izquierda.png"));
                        ++idFlecha;
                    }


                    /////////////////////////////////Coloca las fichas de la fila actual
                    for(var columna = 0; columna < columnas; ++columna)
                    {

                        /*if(contadorFicha % 2 == 0)

                            contenedorTablero.append(obtenerBloqueTablero(fila + "" + columna , size, 
                            "res/img/fichas/fichaNormal.png"));  
                        else
                            contenedorTablero.append(obtenerBloqueTablero(fila + "" + columna , size, 
                            "res/img/fichas/vacia.png"));*/  
                        contenedorTablero.append(obtenerBloqueTablero(fila + "" + columna , size, 
                            "res/img/fichas/" + fichas[Math.floor(Math.random() * 5)])); 
                        ++contadorFicha;
                    }


                    //Controla la creación de flechas al lado derecho del tablero
                    if(((fila+1) % 2 != 0) && (fila+1) != filas+2 ) //Coloca imagenes vacias en las posiciones pares
                        contenedorTablero.append(obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
                    else //Coloca las imagenes de las flechas verticales
                    {
                        contenedorTablero.append(obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha derecha.png"));
                        ++idFlecha;
                    }

                    contenedorTablero.append(obtenerSaltoLinea());
                }

                //crea las flechas Inferiores
                contenedorTablero.append(obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
                for(var columna = 0; columna < (columnas); ++columna)
                {
                    if(columna % 2 == 0) //Coloca imagenes vacias en las posiciones pares
                        contenedorTablero.append(obtenerElementoImg("",size,"res/img/fichas/vacia.png") );
                    else //Coloca las imagenes de las flechas verticales
                    {
                        contenedorTablero.append(obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha inferior.png") );
                        ++idFlecha;
                    }
                }


                //Pone avatares y tesoros en posiciones random
                //SOLO PARA PRUEBA. 
                setTesoroAvatar("avatar"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
                setTesoroAvatar("avatar"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
                setTesoroAvatar("avatar"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
                setTesoroAvatar("avatar"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");

                setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/tesoros/apple_red.png");
                setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/tesoros/apple_red.png");
                setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/tesoros/apple_red.png");
                setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(filas-1)))+ +(Math.floor(Math.random()*(columnas-1))) +
                "","res/img/tesoros/apple_red.png");
                
            }   
            
            /**
             * Función ejecutada una vez que el documento está listo.
             * Se encarga de inicializar las variables del juego  y de crear el tablero.
             */
            $(document).ready(function()
            {
                inicializarVariables();
                var  j = jugadores[0];
                crearTablero();
            });
