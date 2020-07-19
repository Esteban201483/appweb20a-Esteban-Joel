//Conecta el socket
const socket = io().connect( "http://localhost", {
	"sync disconnect on unload": true });


function agregarNombre(nombre)
{
	const contenedor = document.getElementById("listaNombres");
	contenedor.innerHTML += "<li class=\"list-group-item\">"+nombre+"</li>";
}


socket.on("connect",function(data)
{
	//Recibe del socket el id room. Le pide al servidor que lo conecte al socket asociado a esa room
	socket.emit("Conecteme",data);
});


socket.on("salaEsperaInicial", function(data)
{

	console.log("Me conectaron al room");
	const contenedor = document.getElementById("listaNombres");
	contenedor.innerHTML = "";

	//Itera la lista de nombres y agrega un nombre a la lista
	for(let nombre = 0; nombre < data.length; ++nombre)
		agregarNombre(data[nombre]);
});

socket.on("datosPartida",function(data)
{
	document.getElementById("idSesion").innerHTML = "ID sesión: " + data[0];

	document.getElementById("dimensionTablero").innerHTML = "Dimensión Tablero: " + data[1] + " X " + data[2];
});