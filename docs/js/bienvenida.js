'use-strict'

import { Nivel } from "../js/models/nivel.model.js";
import { NIVELES_BD } from "../js/data/juego.data.js";

$(document).ready(function(){

    var btnFuego = $("#btnFuego");
    var radiosDificultad = $("input[name='dificultad']");
    var txtMensaje = $("#idMensaje");

    btnFuego.click(function() {

        // compruebo que haya un nivel seleccionado. En caso contrario muestro error y salgo de la función
        let txtNivel = $("input[name='dificultad']:checked").val();
        if (!txtNivel) {
            // Mensaje de error;
            txtMensaje.css("color", "red").text("¡Atención! Debes selecionar un nivel.");
            return;
        }
        
        // guardo el objeto nivel en sessionStorage
        sessionStorage.setItem("nivel", txtNivel);
        // y redigimos a la siguiente página
        window.location.href = "../pages/juego.html";

        });

    radiosDificultad.change(function() {
        txtMensaje.text("");
    });
    
});