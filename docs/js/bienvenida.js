'use-strict'

$(document).ready(function(){

    var btnFuego = $("#btnFuego");
    var radiosDificultad = $("input[name='dificultad']");
    var txtMensaje = $("#idMensaje");
    btnFuego.click(function() {
        
        // compruebo que haya un nivel seleccionado. En caso contrario muestro error y salgo de la función
        let nivel = $("input[name='dificultad']:checked").val();
        if (!nivel) {
            // Mensaje de error;
            txtMensaje.css("color", "red").text("¡Atención! Debes selecionar un nivel.");
            return;
        }
        // guardo el nivel en sessionStorage
        sessionStorage.setItem("nivel", nivel);
        // y redigimos a la siguiente página
        window.location.href = "../pages/juego.html";
    });

    radiosDificultad.change(function() {
        txtMensaje.text("");
    })
    

});