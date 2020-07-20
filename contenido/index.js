
const Sesion = require("./Sesion.js");
const filesystem = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const cookiep = require("cookies");
const cookie = require("socket.io-cookie-parser");


const app = express(); // Hace uso del framework Express
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.use(cookie());


//Permite que los recursos puedan ser accedidos de forma pública 
const resources = require("path").join(__dirname + "/test/"); 
app.use("", express.static(resources));
app.use(cookieParser());



//Permite que los datos de los formularios sean capturados mediante solicitudes POST
const urlEncodedParser = bodyParser.urlencoded({extended : false});
app.use(urlEncodedParser);

const directorioPaginas = "/test/"; //TODO: Reestructurar proyecto
const puerto = 80;

let idJugadores = [];
let jugadoresEsperados = 2;

const sesion = new Sesion("testing"); //Por ahora, existe una única sesión

const listaSesiones = []; //Almacena todas las sesiones, las cuales deben incluir el room id


function getSesionById(id)
{
	let sesionEncontrada = null;
	console.log("buscando sesion: " + id);

	for(let indiceSesion = 0; indiceSesion < listaSesiones.length && sesionEncontrada === null; ++indiceSesion)
		if(Number(listaSesiones[indiceSesion].id) === Number(id))
			sesionEncontrada = listaSesiones[indiceSesion];

	console.log("Sesion encontrada: " + sesionEncontrada);


	return sesionEncontrada;
}

/**
 * Envia un mensaje a todos los clientes cuyo id se encuentre en la lista de ids
 * @param {String} codigo 
 * @param {String} mensaje 
 * @param {Array<String>} listaId 
 */
function broadcastPartida(evento,mensaje, listaId)
{
	//Indica a los demas jugadores que la partida ya empezó
	console.log("La partida ha empezado.");
	console.log("Jugadores Activos: " + idJugadores);


	for(let cliente = 0; cliente < listaId.length; ++cliente)
	{
		io.to(listaId[cliente]).emit(evento,mensaje);
		console.log("El cliente " + listaId[cliente]+ " ha sido avisado.");
	}
}

/**
 * Avisa a todos los jugadores de la sesión que acaba de empezar
 * @param {Sesion} nuevaSesion 
 */
function iniciarPartida(nuevaSesion)
{

	//Construye la información para que cada cliente construya el tablero
	nuevaSesion.construirInformacionInicial();

	//Indica a los demas jugadores que la partida ya empezó
	console.log("La partida ha empezado.");
	console.log("Jugadores Activos: " + nuevaSesion.jugadores.length);

	io.to(nuevaSesion.getId()).emit("Inicio",nuevaSesion.getInformacionInicial());

	//A cada jugador le indica su número de jugador
	for(let i = 0; i < nuevaSesion.getCantidadJugadores(); ++i)
	{
		//A cada jugador le envía su id de jugador, el cual determinara su orden de turno
		io.to(nuevaSesion.jugadores[i][5]).emit("Asignar","" + nuevaSesion.jugadores[i][0]);
		console.log("Socket id: " + nuevaSesion.jugadores[i][0] + " es el jugador: " + nuevaSesion.jugadores[i][5] );
	}
}


//Configura el websocket
io.on("connection",function(socket) {
	console.log("El socket "+socket.id+" se ha conectado a la partida");

	//Conecta al jugador a la sala de espera
	socket.on("Conecteme",function(msg) 
	{


		//Encuentra la sesión utilizando el roomID
		const sesionActual = getSesionById(socket.request.cookies["roomID"]);

		//Impide que alguien que meta la url de la sala de espera haga que el servidor se caiga >:V
		if(sesionActual !== null)
		{
			//Conecta al socket con el respectivo room
			socket.join(socket.request.cookies["roomID"]);

			//El jugador se registra a la hora de crear la partida :v

			//Obtiene el nombre de todos los jugadores conectados, incluido el de uno
			const nombres = sesionActual.getNombreJugadores();

			//Todos los conectados en la sala de espera actualizan su lista de nombres desde 0
			io.to(sesionActual.id).emit("salaEsperaInicial",nombres); 

			//Le envia al cliente los datos de la partida
			socket.emit("datosPartida",[sesionActual.id,sesionActual.filas,sesionActual.columnas]);
		}

	});

	socket.on("Listo", function(msg) 
	{
		socket.join(sesion.getId());
		sesion.agregarJugador(socket.id);
	
		if(sesion.getCantidadJugadores() === jugadoresEsperados) //En este caso, espera que hayan  jugadores
			//broadcastPartida("Inicio",tablero,idJugadores);
			iniciarPartida(sesion);

	});


	socket.on("Laberinto",function(msg){
		console.log(msg);
	});

	socket.on("disconnect",function(socket){

		//TODO: El servidor emite un evento para avisarle a todos los jugadores que el jugador se ha desconectado.
		//Para ello, en la sesión, cada jugador llega en el último elemento de su arreglo el id del socket

		console.log("F por " + socket);
	});


	//Controla los eventos del juego
	socket.on("insercion",function(msg){
		console.log("Se ha realizado una inserción en la flecha: " + msg);

		io.to(sesion.getId()).emit("insercionBroadcast",msg); //Envía por broadcast la inserción de la flecha
	});

	socket.on("movimiento",function(msg){
		io.to(sesion.getId()).emit("movimientoBroadcast",msg); //Envía por broadcast la inserción de la flecha
	});

	socket.on("solicitarTesoro",function(msg){
		//La sesión encuentra el id del próximo tesoro y se lo envia al jugador
		//console.log(socket.id + " me pidio un tesoro :v. Le envíe: " + sesion.obtenerProximoTesoro(socket.id));
		//console.log("socket: " + socket.id + " ha pedido un tesoro");

		const nuevoTesoroId = sesion.obtenerProximoTesoro(socket.id);

		console.log("nuevoTesoroID: " + nuevoTesoroId + ", tesorosLength: " + sesion.tesorosPosibles.length);

		if(nuevoTesoroId === -2)
		{
			//Significa que un jugador gano
			io.to(sesion.getId()).emit("fin");
		}
		else
		{
			
			socket.emit("asignarTesoro","" + nuevoTesoroId);
 
		}
	});


	socket.on("finTurno",function(msg){
		console.log("Ha terminado un turno;");
		io.to(sesion.getId()).emit("finTurnoBroadcast","");
	});

	socket.on("comerTesoro",function(msg){
		io.to(sesion.getId()).emit("comerTesoroBroadcast",msg);
	});

	socket.on("rotarFicha",function(msg)
	{
		console.log("Hubo una rotación");
		io.to(sesion.getId()).emit("rotarFichaBroadcast",msg);
	});

 

}); 




////////////////////////////////////////////////////////////////////////////////////////
//Al recibir solicitudes GET, sirve la página correspondiente
//Despliega la página de Index
app.get("/", function(request,response){
	filesystem.readFile("test/index.xhtml", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

//Despliega la página de crear partida
app.get("/crearPartida", function(request,response){
	filesystem.readFile("test/crearPartida.xhtml", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

//Recibe los datos ingresados en el formulario de crear partida
app.post("/crearPartida",function(request,response)
{
	const body = request.body;
	console.log(body);
	let idSesion = "";
	let dificultad = "facil";
	let nombreJugador = "";

	sesionGeneral = request.session;

	//Realiza validaciones a nivel de servidor
	if(body.dificultad != null)
		dificultad = "dificil";
	if(body.nombreJugador != null)
		nombreJugador = body.nombreJugador;

	//Genera un id de sesión aleatorio	
	for(let digito = 0; digito < 10; ++digito)
		idSesion += Math.floor(Math.random() * 9);

	console.log(idSesion);

	//Almacena el room id
	response.cookie("roomID" , idSesion, {expire : new Date() + 999999});
	response.cookie("NombreJugador" , nombreJugador, {expire : new Date() + 999999});

	//Crea una nueva sesión
	const sesionCreada = new Sesion(idSesion);
	sesionCreada.cantidadMaximaJugadores = Number(body.cantidadJugadores);
	sesionCreada.filas = Number(body.filas);
	sesionCreada.columnas = Number(body.columnas);
	sesionCreada.registrarJugador(nombreJugador);


	listaSesiones.push(sesionCreada);

	console.log("ListaSesiones: " + listaSesiones);


	//Redirecciona a la sala de espera
	response.redirect("/salaEspera");
});

//Despliega la página de unirse a una partida
app.get("/unirsePartida", function(request,response){
	filesystem.readFile("test/unirseAPartida.xhtml", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

//Recibe los datos ingresados en el formulario de unirse a una partida
app.post("/unirsePartida",function(request,response)
{
	const body = request.body;
	console.log(body);
	let dificultad = "facil";
	let nombreJugador = "";

	//Realiza validaciones a nivel de servidor
	if(body.dificultad != null)
		dificultad = "dificil";
	if(body.nombreJugador != null)
		nombreJugador = body.nombreJugador;


	//Busca la sesión 
	const sesionActual = getSesionById(body.sesion);

	if(sesionActual !== null)
	{
		//Se registra a él mismo
		sesionActual.registrarJugador(body.nombreJugador);

		//Almacena datos importantes en las cookies
		//Almacena el room id
		response.cookie("roomID" , sesionActual.id, {expire : new Date() + 999999});
		response.cookie("NombreJugador" , nombreJugador, {expire : new Date() + 999999});


		//Redirecciona a la sala de espera
		response.redirect("/salaEspera");
	}
	//BUG: Si el id sesión no existe, la página se queda cargando 

});

//Despliega la página del Tablero
app.get("/tablero", function(request,response){
	filesystem.readFile("test/tablero.xhtml", function(error, data){
		//console.log(data);
		response.write(data);
		response.end();
	});
});

//Despliega la página de la Sala de espera
app.get("/salaEspera", function(request,response){
	filesystem.readFile("test/salaDeEspera.xhtml", function(error, data){
		console.log(request.cookies); //Debugea las cookies
		
		response.write(data);
		response.end();
	});
});

/////////////////////////////////////////

//Despliega el sitio en el puerto 80
http.listen(puerto, new function(){
	console.log("El sitio web ha sido desplegado en el puerto: " + puerto);   
});



