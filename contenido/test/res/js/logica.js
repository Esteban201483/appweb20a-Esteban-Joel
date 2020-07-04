


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

/**
 * Define la clase partida, la cual será la encargada de almacenar algunos datos relacionados con la partida
 */
class Partida
{
    constructor(listaJugadores)
    {
        this.listaJugadores = listaJugadores;
    }
    /*constructor()
    {
        this.listaJugadores = [];
    }   */
}

/**
 * Define la clase tablero, la cual será la encargada de almacenar la representación lógica del tablero
 * y algunos de sus atributos
 */
class Tablero
{
    constructor(filas, columnas, tiempoTurno, ayudas)
    {
        this.filas = filas;
        this.columnas = columnas;
        this.tiempoTurno = tiempoTurno;
        this.ayudas = ayudas;
    }

    /*constructor()
    {
        this.filas = 0;
        this.columnas = 0;
        this.tiempoTurno = 0;
        this.ayudas = true;
    }*/
}

/**
 * Clase que representa una ficha de tablero. 
 * Cuenta con el método para rotar hacia la derecha
 */
class Ficha
{
    constructor()
    {
        this.numeroActual = 0;

        //Declara los vectores para determinar como se deben rotar las fichas
        this.rotacionBloqueo = [0];
        this.rotacionCruz = [15];
        this.rotacionT = [7,14,11,13];
        this.rotacionRecta = [3,12];
        this.rotacionL = [9,5,6,10];


    }

    encontrarRotacion(array, direccion)
    {
        return array[(array.indexOf( this.numeroActual) + direccion) %  array.length];
    }

    rotar(direccion)
    {
        let tipo = this.getTipoFicha( this.numeroActual);

        switch(tipo)
        {
            case "BLOQUEO": case "": case "CRUZ":
                break;
            case "RECTA":
                this.numeroActual =  this.encontrarRotacion(this.rotacionRecta,direccion);
                break;
            case "L":
                this.numeroActual =  this.encontrarRotacion(this.rotacionL,direccion);
                break;
            case "T":
                this.numeroActual =  this.encontrarRotacion(this.rotacionT,direccion);
                break;
        }

    }

    rotarIzquierda()
    {
        this.rotar(+1)
    }

    rotarDerecha()
    {
        this.rotar(-1)
    }
    

    getTipoFicha(numeroFicha)
    {
        let tipo = "";

        switch(numeroFicha)
        {
            case 0:
                tipo = "BLOQUEO";
                break;
            case 15:
                tipo = "CRUZ";
                break;
            case 7: case 13: case 11: case 14:
                tipo = "T";
                break;
            case 3: case 12:
                tipo = "RECTA";
                break;
            case 9: case 5: case 6: case 10:
                tipo = "L"
                break;
            default:
                tipo = "";               
        }

        return tipo;
    }
}


function setTesoroAvatar(imgId,imageSrc)
{
    $("#" + imgId).attr("hidden",false);
    $("#" + imgId).attr("src",imageSrc);
    
}

/**
 * Este método recibe las variables necesarias para el desarrollo del juego
 * 
 */
function inicializarVariables(partida,tablero)
{
    tablero.filas = 7;
    tablero.columnas = 7;
    tablero.tiempoTurno = 120;
    tablero.ayudas = true;


    let jugadores = Array();
    jugadores.push(new Jugador("Esteban",1,"",0,0));
    jugadores.push(new Jugador("Joel",2,"",4,4));

    partida.jugadores = jugadores;
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
function crearTablero(tablero)
{

    let contenedorTablero = $("#contenedorTablero"); //Obtiene el div que almacenará al tablero
    let innerHTML = "";

    let size = 550 / Math.min(tablero.filas + 2,tablero.columnas + 2); //El 2 es para incluir las flechas en todas las direcciones del tablero
    let idFlecha = 0; //Contador para identificar las flechas
    let nombreFlecha = "Flecha";
    let nombreFicha = "Ficha";

    let fichas = ["0.png","3.png","5.png","6.png","7.png","9.png","10.png","11.png","12.png","13.png","14.png"];

    let contadorFicha = 0;

    innerHTML += (obtenerElementoImg("",size, "res/img/fichas/vacia.png"));
    //crea las flechas superiores
    for(let columna = 0; columna < (tablero.columnas); ++columna)
    {
        if((columna % 2) == 0) //Coloca imagenes vacias en las posiciones pares
            innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
        else //Coloca las imagenes de las flechas verticales
        {
            innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha superior.png"));
            ++idFlecha;
        }
    }

    innerHTML += (obtenerSaltoLinea());

    for(let fila = 0; fila < tablero.filas; ++fila)
    {

        //Controla la creación de flechas al lado izquierdo del tablero
        if(((fila+1) % 2 != 0) && (fila+1) != tablero.filas+2) //Coloca imagenes vacias en las posiciones pares
            innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
        else //Coloca las imagenes de las flechas izquierdas
        {
            innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha izquierda.png"));
            ++idFlecha;
        }


        /////////////////////////////////Coloca las fichas de la fila actual
        for(let columna = 0; columna < tablero.columnas; ++columna)
        {

            /*if(contadorFicha % 2 == 0)

                innerHTML += (obtenerBloqueTablero(fila + "" + columna , size, 
                "res/img/fichas/fichaNormal.png"));  
            else
                innerHTML += (obtenerBloqueTablero(fila + "" + columna , size, 
                "res/img/fichas/vacia.png"));*/  
            innerHTML += (obtenerBloqueTablero(fila + "" + columna , size, 
                "res/img/fichas/" + fichas[Math.floor(Math.random() * fichas.length )])); 
            ++contadorFicha;
        }


        //Controla la creación de flechas al lado derecho del tablero
        if(((fila+1) % 2 != 0) && (fila+1) != tablero.filas+2 ) //Coloca imagenes vacias en las posiciones pares
            innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
        else //Coloca las imagenes de las flechas verticales
        {
            innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha derecha.png"));
            ++idFlecha;
        }

        innerHTML += (obtenerSaltoLinea());
    }

    //crea las flechas Inferiores
    innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png"));
    for(let columna = 0; columna < (tablero.columnas); ++columna)
    {
        if(columna % 2 == 0) //Coloca imagenes vacias en las posiciones pares
            innerHTML += (obtenerElementoImg("",size,"res/img/fichas/vacia.png") );
        else //Coloca las imagenes de las flechas verticales
        {
            innerHTML += (obtenerElementoImg(nombreFlecha+idFlecha,size,"res/img/flechas/flecha inferior.png") );
            ++idFlecha;
        }
    }

    contenedorTablero.html(innerHTML);


    //Pone avatares y tesoros en posiciones random
    //SOLO PARA PRUEBA.
    setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/tesoros/apple_red.png");
    setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/tesoros/chest.png");
    setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/tesoros/key.png");
    setTesoroAvatar("tesoro"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/tesoros/sword_iron.png");
    

    setTesoroAvatar("avatar"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
    setTesoroAvatar("avatar"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
    setTesoroAvatar("avatar"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");
    setTesoroAvatar("avatar"+(Math.floor(Math.random()*(tablero.filas-1)))+ +(Math.floor(Math.random()*(tablero.columnas-1))) +
    "","res/img/avatares/sinFondo/avatar"+(1 + Math.floor(Math.random()*7))+".png");

    
}   

function rotarFichaSobrante(ficha, contenedor)
{
    ficha.rotarIzquierda();
    contenedor.src = "res/img/fichas/" + ficha.numeroActual + ".png";

}

/**
 * Función ejecutada una vez que el documento está listo.
 * Se encarga de inicializar las variables del juego  y de crear el tablero.
 */
$(document).ready(function()
{
    let partida = new Partida();
    let tablero = new Tablero();
    let fichaSobrante = new Ficha();

    //Setea el valor inicial de la ficha
    //Cambiar para probar que la rotación sea realizada correctamente
    fichaSobrante.numeroActual = 9;


    const contenedorFichaSobrante = document.getElementById("fichaSobrante");
    contenedorFichaSobrante.addEventListener('click',function(){rotarFichaSobrante(fichaSobrante,contenedorFichaSobrante)});
    contenedorFichaSobrante.src = "res/img/fichas/" + fichaSobrante.numeroActual + ".png";

    inicializarVariables(partida,tablero);
    crearTablero(tablero);
});






