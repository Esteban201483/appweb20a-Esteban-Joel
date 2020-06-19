var http = require('http');
var filesystem = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // Hace uso del framework Express
http = http.createServer(app);

//Permite que los recursos puedan ser accedidos de forma pública 
var resources = require('path').join(__dirname + "/test/"); 
app.use(express.static(resources));

//Permite que los datos de los formularios sean capturados mediante solicitudes POST
var urlEncodedParser = bodyParser.urlencoded({extended : false});
app.use(urlEncodedParser);

var directorioPaginas = "/test/"; //TODO: Reestructurar proyecto
var puerto = 80;


////////////////////////////////////////////////////////////////////////////////////////
//Al recibir solicitudes GET, sirve la página correspondiente



//Despliega la página de Index
app.get('/', function(request,response){
    filesystem.readFile("test/index.xhtml", function(error, data){
        console.log(data);
        response.write(data);
        response.end();
    })
});

//Despliega la página de crear partida
app.get('/crearPartida', function(request,response){
    filesystem.readFile("test/crearPartida.xhtml", function(error, data){
        console.log(data);
        response.write(data);
        response.end();
    })
});

//Recibe los datos ingresados en el formulario de crear partida
app.post('/crearPartida',function(request,response)
{
    body = request.body;
    console.log(body);
    idSesion = "";
    dificultad = "facil";
    nombreJugador = "";

    //Realiza validaciones a nivel de servidor
    if(body.dificultad != null)
        dificultad = "dificil";
    if(body.nombreJugador != null)
        nombreJugador = body.nombreJugador;
    if(body.idSesion != null)
        idSesion = body.sesion;
});

//Despliega la página de unirse a una partida
app.get('/unirsePartida', function(request,response){
    filesystem.readFile("test/unirseAPartida.xhtml", function(error, data){
        console.log(data);
        response.write(data);
        response.end();
    })
});

//Recibe los datos ingresados en el formulario de unirse a una partida
app.post('/unirsePartida',function(request,response)
{
    body = request.body;
    console.log(body);
    idSesion = "";
    dificultad = "facil";
    nombreJugador = "";

    //Realiza validaciones a nivel de servidor
    if(body.dificultad != null)
        dificultad = "dificil";
    if(body.nombreJugador != null)
        nombreJugador = body.nombreJugador;
    if(body.idSesion != null)
        idSesion = body.sesion;
});

//Despliega la página del Tablero
app.get('/tablero', function(request,response){
    filesystem.readFile("test/tablero.xhtml", function(error, data){
        console.log(data);
        response.write(data);
        response.end();
    })
});

//Despliega la página de la Sala de espera
app.get('/salaEspera', function(request,response){
    filesystem.readFile("test/salaDeEspera.xhtml", function(error, data){
        console.log(data);
        response.write(data);
        response.end();
    })
});

/////////////////////////////////////////

//Despliega el sitio en el puerto 80
http.listen(puerto, new function(){
    console.log("El sitio web ha sido desplegado en el puerto: " + puerto);   
});



