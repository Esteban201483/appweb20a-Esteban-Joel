export default class Mensajero
{
	constructor(sesionId)
	{
		this.sesionId = sesionId;
		this.id = "";
		this.socket = io("http://localhost").connect();

		
		this.socket.on("connect", function(data){
			console.log("MI id Socket: " + this.id); //Agarra el id del socket
	
		});

		this.socket.on("Inicio", function(data){
			console.log((data));
			console.log(JSON.parse(data));
		});
	}



	iniciarConexion()
	{
		let sesionIniciada = false;
		
		this.socket.emit("Listo","");
	

		return sesionIniciada;
	}

	reconectar(tiempoEspera)
	{
		let reconexion = false;

		return reconexion;
	}


	enviarMensaje(mensaje)
	{
		let enviado = false;

		return enviado;
	}

	esperarMensaje()
	{
		let mensaje = "";

		return mensaje;
	}


}