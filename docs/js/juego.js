'use-strict'

import { crearTableroJuego } from "../js/services/juego.service.js";
import { Barco } from "../js/models/barco.model.js";

$(document).ready(function(){
    
    // Recuperamos el nivel seleccionado en 'bienvenida' de web-storage
    var nivel = sessionStorage.getItem("nivel");

    // En funcion de la dificultad hay que pintar el tablero de juego
    var partidaActual = crearTableroJuego(nivel);
    console.log(partidaActual);

    // --- DEFINICION VISUAL DEL TABLERO DE JUEGO ---
    // Configuramos el espacio de juego como un Grid para introducir los botones
    let dimension = partidaActual.tableroJuego.length;
    $("#idTableroJuego").css({
        "display" : "grid",
        "grid-template-columns": `repeat(${dimension}, 1fr)`,
        "grid-template-rows": `repeat(${dimension},1fr)`,
        "gap": "4px",
        "width": "420px",
        "height": "420px",
        "background-color": "#1b263b",
        "padding": "10px",
        "border-radius": "8px",
        "box-shadow": "0 8px 20px rgba(0, 0, 0, 0.5)",
        "margin": "20px auto"

    });

    // Estilo visual de los botones (casilla de juego)
    const estilosCasilla = {
        "background-color": "#415a77",
        "border": "1px solid #778da9",
        "border-radius": "4px",
        "cursor": "pointer",
        "transition": "background-color 0.2s ease, transform 0.1s ease",
        "width": "100%",
        "height": "100%"
    };

    // --- PINTAR EL TABLERO DE JUEGO EN LA PAGINA WEB ---

    // Limpiamos el contenedor por seguridad antes de pintar
    $("#idTableroJuego").empty();

    // Creamos cada elemento (button) con su estilo y sus propiedades
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
        
            // Creamos el botón en una variable
            let botonCasilla = $("<button type='button'></button>");
        
            // Le asignamos los atributos data-fila y data-columna para saber que botón se pulsa
            botonCasilla.attr("data-fila", i);
            botonCasilla.attr("data-columna", j);
        
            // Aplicamos el estilo al botón 
            botonCasilla.css(estilosCasilla);
        
            // Aplicamos estilo HOVER al botón
            botonCasilla.hover(
                function() {
                    // SOLAMENTE cambia de color si el botón NO está deshabilitado
                    if (!$(this).prop("disabled")) {
                        $(this).css({
                            "background-color": "#5c7f99", // Al entrar
                            "transform": "scale(1.05)"
                        });
                    }
                },
                function() {
                    // SOLAMENTE vuelve al color base si el botón NO está deshabilitado
                    if (!$(this).prop("disabled")) {
                        $(this).css({
                            "background-color": "#415a77", // Al salir
                            "transform": "scale(1)"
                        });
                    }
                }
            );

            // añadimos el boton al tablero de juego
            $("#idTableroJuego").append(botonCasilla);
        }
    }

    // --- EVENTO DE CLIC DE CADA BOTON DEL TABLERO DE JUEGO ---

    $("#idTableroJuego").on("click", "button", function() {
    
        let botonPulsado = $(this);

        // Restar un proyectil a la partida actual y actualizar el valor en pantalla
        partidaActual.proyectilesRestantes--;
        $("#idProyectiles").text(`Proyectiles: ${partidaActual.proyectilesRestantes}`);

        // Averiguar qué botón se ha pulsado a través de los atributos data-fila y data-columna
        let fila = parseInt(botonPulsado.attr("data-fila"));
        let columna = parseInt(botonPulsado.attr("data-columna"));

        // Buscamos esa misma posición en la matriz del objeto partidaActual para actualizarla
        // 'casilla' apunta al objeto de la clase Barco 
        let casilla = partidaActual.tableroJuego[fila][columna];

        if (casilla instanceof Barco) { // true = en la casilla hay un barco
            // ¡TOCADO! y cambiamos el color del botón a rojo
            botonPulsado.css({
                "background-color": "#d90429", 
                "border-color": "#ef233c"
            });

            // Indicamos por pantalla el resultado del lanzamiento
            $("#idResultado").css({ "background-color": "rgba(217, 4, 41, 0.15)", "border-color": "#d90429" });
            $("#idMensajeResultado").css("color", "#ef233c").text("¡TOCADO!");
            
            // Añadimos un impacto recibido al contador individual del objeto Barco
            casilla.impactosRecibidos++;

            // Comprobamos si el barco ha recibido el total de impactos posibles
            if (casilla.impactosRecibidos === casilla.longitud) {
                // Barco hundido
                casilla.hundido = true;

                // Buscamos el barco en el tablero y lo marcamos con X's
                for (let i = 0; i < partidaActual.tableroJuego.length; i++){
                    for (let j = 0; j < partidaActual.tableroJuego.length; j++){
                        
                        let celdaTableroJuego = partidaActual.tableroJuego[i][j];       // Barco (o puede ser agua) de la matriz
                        // Si coincide que hay barco en la celda y ademas es el mismo nombre, actualizamos el estilo del botón
                        if (celdaTableroJuego instanceof Barco && celdaTableroJuego.nombre === casilla.nombre) {
                            $(`button[data-fila='${i}'][data-columna='${j}']`)
                                .text("X")
                                .css({
                                "font-family": "'Courier New', Courier, monospace",
                                "font-size": "22px",
                                "font-weight": "bold",
                                "color": "#ffffff"
                            });
                        }

                    }
                }
                // Actualizamos el mensaje de 'tocado' a hundido más el nombre del barco
                $("#idResultado").css({ "background-color": "rgba(217, 4, 41, 0.15)", "border-color": "#d90429" });
                $("#idMensajeResultado").css("color", "#ef233c").text(`¡HUNDIDO! ${casilla.nombre}`);



            } // todavía no está hundido

            // Comprobamos si el jugador ha ganado la partida o no
            if (partidaActual.flotaHundida()) {
                // Paramos la cuenta atrás porque el jugador ha ganado la partida
                clearInterval(cuentaAtras);
                $("#idTableroJuego").off("click", "button");
                partidaActual.resultado = "victoria";

                // Le indicamos el mensaje de victoria
                $("#idResultado").css({ "background-color": "rgba(40, 167, 69, 0.15)", "border-color": "green" });
                $("#idMensajeResultado").css("color", "green").text("¡Misión cumplida!");

                return;
            } // Todavía no está la toda la flota hundida

        } else {
            // ¡AGUA! La casilla no contiene un objeto de la clase barco
            // cambiamos el color del botón a azul claro
            botonPulsado.css({
                "background-color": "#4ea8de",
                "border-color": "#90e0ef"
            });

            // Indicamos por pantalla el resultado del lanzamiento
            $("#idResultado").css({ "background-color": "rgba(78, 168, 222, 0.15)", "border-color": "#4ea8de" });
            $("#idMensajeResultado").css("color", "#4ea8de").text("¡AGUA...Disparo fallido!");

        }

        // Desactivamos el botón para que no se pueda volver a pulsar
        botonPulsado.prop("disabled", true);
        botonPulsado.css("cursor", "not-allowed");
        botonPulsado.off("mouseenter mouseleave");

        // Comprobamos si todavía le queda munición
        if (partidaActual.proyectilesRestantes <= 0) {
            // Paramos la cuenta atrás porque el jugador a perdido la partida por falta de munición
            clearInterval(cuentaAtras);
        
            // Bloqueamos las casillas del tablero
            $("#idTableroJuego").off("click", "button");
            $("#idTableroJuego button").prop("disabled", true).css("cursor", "not-allowed");
        
            // Indicamos por pantalla el resultado de la partida
            $("#idResultado").css({ "background-color": "rgba(220, 53, 69, 0.2)", "border-color": "#dc3545" });
            $("#idMensajeResultado").css("color", "#ff4d4d").text("Sin munición. Prepara la retirada");

        }
    
    });

    // Indicamos por pantalla el tiempo incial y los proyectiles iniciales
    $("#idTiempo").text(`Impacto en: ${partidaActual.tiempoRestante}s`);
    $("#idProyectiles").text(`Proyectiles: ${partidaActual.proyectilesRestantes}`);

    // variable cronómetro
    let cuentaAtras;

    cuentaAtras = setInterval(function() {
    
        partidaActual.tiempoRestante--;
        $("#idTiempo").text(`Impacto en: ${partidaActual.tiempoRestante}s`);
    
        // Si la cuenta atras es menos de 10 segundos, el color cambia a rojo
        if (partidaActual.tiempoRestante <= 10) {
            $("#idTiempo").css("color", "#dc3545");
        }

        // Fin del tiempo
        if (partidaActual.tiempoRestante <= 0) {
            clearInterval(cuentaAtras);
        
            // Bloqueamos el tablero de juego
            $("#idTableroJuego").off("click", "button");
            $("#idTableroJuego button").prop("disabled", true).css("cursor", "not-allowed");
        
            // Indicamos por pantalla el resultado de la partida
            $("#idResultado").css({ "background-color": "rgba(220, 53, 69, 0.2)", "border-color": "#dc3545" });
            $("#idMensajeResultado").css("color", "#ff4d4d").text("¡IMPACTO! ¡Sálvese quien pueda!");

        }

    }, 1000);

});
