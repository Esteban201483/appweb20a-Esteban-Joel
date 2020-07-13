
const Sesion = require("./Sesion.js");
const filesystem = require("fs");
const express = require("express");
const bodyParser = require("body-parser");


const app = express(); // Hace uso del framework Express
const http = require("http").createServer(app);
const io = require("socket.io")(http);


//Permite que los recursos puedan ser accedidos de forma pública 
const resources = require("path").join(__dirname + "/test/"); 
app.use("", express.static(resources));

//Permite que los datos de los formularios sean capturados mediante solicitudes POST
const urlEncodedParser = bodyParser.urlencoded({extended : false});
app.use(urlEncodedParser);

const directorioPaginas = "/test/"; //TODO: Reestructurar proyecto
const puerto = 80;

let idJugadores = [];
let jugadoresEsperados = 2;

const sesion = new Sesion("testing"); //Por ahora, existe una única sesión


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
}


//Configura el websocketio
io.on("connection",function(socket) {
	console.log("Un usuario se ha conectado al websocket");

	socket.on("Listo", function(msg) 
	{
		socket.join(sesion.getId());
		sesion.agregarJugador(socket.id);

		console.log(sesion.getCantidadJugadores());
	
		if(sesion.getCantidadJugadores() === jugadoresEsperados) //En este caso, espera que hayan  jugadores
			//broadcastPartida("Inicio",tablero,idJugadores);
			iniciarPartida(sesion);

	});


	socket.on("Laberinto",function(msg){
		console.log(msg);
	});
});

io.on("disconnect",function(socket){

	//Todo. Solucionar porque no se detecta la desconección. Tal vez haya que agregar un timer de n segundos en algun lugar
	console.log("El socket " + socket.id + " se ha desconectado");
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

	//Realiza validaciones a nivel de servidor
	if(body.dificultad != null)
		dificultad = "dificil";
	if(body.nombreJugador != null)
		nombreJugador = body.nombreJugador;

	//Genera un id de sesión aleatorio	
	for(let digito = 0; digito < 10; ++digito)
		idSesion += Math.floor(Math.random() * 9);

	console.log(idSesion);
	//Inicia la conexión con el websocket 
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
	let idSesion = "";
	let dificultad = "facil";
	let nombreJugador = "";

	//Realiza validaciones a nivel de servidor
	if(body.dificultad != null)
		dificultad = "dificil";
	if(body.nombreJugador != null)
		nombreJugador = body.nombreJugador;
	if(body.idSesion != null)
		idSesion = body.sesion;
});

//Despliega la página del Tablero
app.get("/tablero", function(request,response){
	filesystem.readFile("test/tablero.xhtml", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

//Despliega la página de la Sala de espera
app.get("/salaEspera", function(request,response){
	filesystem.readFile("test/salaDeEspera.xhtml", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

/////////////////////////////////////////

//Despliega el sitio en el puerto 80
http.listen(puerto, new function(){
	console.log("El sitio web ha sido desplegado en el puerto: " + puerto);   
});



