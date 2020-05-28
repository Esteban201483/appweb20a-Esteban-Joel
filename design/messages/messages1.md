Partida definitiva (Se empieza desde la sala de espera):

\[Servidor]: iniciar_sesión

\[Joel]: ingreso_a_sala_de_espera(“Joel”,avatar_verde);

\[Servidor]: distribuir_datos_jugador(“Joel”,“Esteban”,avatar_morado);

\[Servidor]: datos_partida(“Joel”, 120, 5,5, 2);

\[Servidor (Broadcast)]: distribuir_tablero((ficha_l, 0),( ficha_t,180), (ficha_bloqueo,0), (ficha_recta,90),(ficha_recta,0) … (ficha_recta,0) /*Esta es la sobrante*/)

\[Servidor (Broadcast)]: distribuir_jugadores((“Esteban”,0,0,2), (“Joel”,4,4,1));

\[Servidor(Broadcast)]: distribuir_tesoros_tablero((“Luna”,2,1),(“Estrella”,2,1),(“Cofre”,2,3),(“Agua”,3,2));

\[Servidor]: dar_tesoro(“Joel”,”Cofre””);

\[Servidor]: dar_tesoro(“Esteban”,”Agua”);

\[Servidor (Broadcast)]: asignar_turno(1);

\[Joel]: insertar_ficha(6,0);

\[Servidor(Broadcast)] : actualizar_tablero(6,0)

\[Joel]: mover_avatar(0,1)

\[Servidor(Broadcast)] : actualizar_avatar(0,1)

\[Servidor (Broadcast)]: asignar_turno(2);

\[Esteban]: inserta_ficha(5,0);

\[Servidor(Broadcast)] : actualizar_tablero(5,0)

\[Esteban]: mover_avatar(3,2)

\[Servidor(Broadcast)] : actualizar_avatar(3,2)

\[Servidor(Broadcast)]: remover_tesoro(“agua”)

\[Servidor]: dar_tesoro(“Esteban”,”Cofre”);

\[Servidor (Broadcast)]: asignar_turno(1);

\[Joel]: insertar_ficha(1,90)

\[Servidor(Broadcast)] : actualizar_tablero(1,90)

\[Joel]: omitir_movimiento()

\[Servidor (Broadcast)]: asignar_turno(2);

\[Esteban]: inserta_ficha(1,0);

\[Servidor(Broadcast)] : actualizar_tablero(1,0);

\[Esteban] : mover_avatar(1,2)

\[Servidor(Broadcast)] : actualizar_avatar(1,2)

\[Servidor(Broadcast)] : remover_tesoro(“cofre”)

\[Servidor(Broadcast)] :  especificar_ganador()


