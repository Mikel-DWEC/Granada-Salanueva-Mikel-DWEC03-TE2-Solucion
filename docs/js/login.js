'use-strict'

import { procesos } from "./services/usuario.service.js";
localStorage.clear();

$(document).ready(function(){
    console.log("JQuery cargado correctamente");

    procesos.almacenarUsuarios();

    var txtUsuario = $("#idUsuario");
    var txtPassword = $("#idPassword");
    var txtMensaje = $("#idMensaje");

    var btnZarpar = $("#idZarpar");
    btnZarpar.click(function(){

        // Expresion regular que debe cumplir la contraseña (solo valores alfanumericos)
        let expresionRegular = /^[a-zA-Z0-9]+$/;
        if (!expresionRegular.test(txtPassword.val())) {

            formatoPassword(txtPassword, txtMensaje)
            return;
        }
        if (procesos.buscarUsuario(txtUsuario.val(), txtPassword.val())) {

            accesoCorrecto(txtUsuario, txtPassword, txtMensaje);

        } else {

            accesoDenegado(txtUsuario, txtPassword, txtMensaje);

        }

    });

    txtUsuario.focus(function () {
        reset(txtUsuario, txtPassword, txtMensaje);
    });
    txtPassword.focus(function(){
        reset(txtUsuario, txtPassword, txtMensaje);
    })

});

function accesoCorrecto(usuario, password, mensaje) {
    
    usuario.css({
        "border-color": "green",
        "background": "#D1E7DD"
    })
    password.css({
        "border-color": "green",
        "background": "#D1E7DD"
    })

    mensaje.css("color", "#D1E7DD").text("¡Credenciales correctas! Preparando la flota...");

    // Temporizador de 2 segundos para ver el acceso correcto antes de redirigir
    setTimeout(function() {
        // Redirigir a al página de bienvenida
        window.location.href = "./pages/bienvenida.html";

    }, 2000); 

}

function accesoDenegado(usuario, password, mensaje) {
    
    usuario.css({
        "border-color": "red",
        "background": "#F8D7DA"
    })
    password.css({
        "border-color": "red",
        "background": "#F8D7DA"
    })

    mensaje.css("color", "red").text("¡Atención! El usuario no existe o la contraseña es incorrecta.");

}

function formatoPassword(password, mensaje) {
    
    password.css({
        "border-color": "red",
        "background": "#F8D7DA"
    })

    mensaje.css("color", "red").text("¡Atención! La contraseña solo permite caracteres alfanuméricos.");

}

function reset(inputUsuario, inputPassword, mensaje) {
    // Devolvemos el elemento input de usuario a un estado neutro inicial
    inputUsuario.css({
        "border-color": "transparent",
        "background-color": "whitesmoke"
    });
    
    // Devolvemos el elemento input de contraseña a un estado neutro inicial
    inputPassword.css({
        "border-color": "transparent",
        "background-color": "whitesmoke"
    });

    // Borramos el mensaje de error.
    mensaje.text("");
}
