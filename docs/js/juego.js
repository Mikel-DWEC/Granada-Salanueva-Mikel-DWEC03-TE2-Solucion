'use-strict'

$(document).ready(function(){
    console.log("Tablero de juego cargado correctamente");
    var dificultad = sessionStorage.getItem("nivel");
    console.log(dificultad);

    // En funcion de la dificultad hay que pintar el tablero
    switch (dificultad) {
        case "grumete":
            // pintar tableroGrumete
            console.log("tablero GRUMETE");
            break;
        case "capitan":
            // pintar tableroCapitan
            console.log("tablero CAPITAN");
            break;
        case "almirante":
            // pintar tableroAlmirante
            console.log("tablero ALMIRANTE");
            break;
        default:
            break;
    }
});