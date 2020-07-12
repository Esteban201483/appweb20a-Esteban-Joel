export default class Mensajero
{
	constructor(sesionId)
	{
		this.sesionId = sesionId;
		this.webSocket = null;
	}

	iniciarConexion()
	{
		let sesionIniciada = false;
		this.webSocket = new WebSocket("ws://localhost");
		

		console.log("Sesion iniciada");

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