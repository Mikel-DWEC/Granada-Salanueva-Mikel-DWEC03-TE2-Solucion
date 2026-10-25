'use-strict'

$(document).ready(function() {

    var jsonResultadosPartida = sessionStorage.getItem("resultado");
    var resultado = JSON.parse(jsonResultadosPartida);
    
    var seccionResultados = $(".contenedor-resultados");

    if (resultado) {

        // --- RESULTADO DE LA PARTIDA ---
        let contenedorResultado = $("<div></div>");
        let parrafoResultado = $("<p></p>").text(resultado.resultado);

        // Estilos para el contenedor "Resultado": Misión cumplida - Retirada - Buque perdido
        contenedorResultado.css({
            "padding": "15px 20px",
            "border-radius": "6px",
            "text-align": "center",
            "margin-bottom": "20px",
            "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.2)",
            "border": "2px solid"
        });

        // Estilos para el texto del resultado
        parrafoResultado.css({
            "font-size": "18px",
            "font-weight": "bold",
            "font-family": "'Courier New', Courier, monospace",
            "letter-spacing": "1px",
            "margin": "0"
        });

        // Cambio de color del contendor Resultado y el parrafo Resultado segun si es victoria o derrota
        if (resultado.resultado === "Misión cumplida") {
            // Victoria: colores en verde
            contenedorResultado.css({
                "background-color": "#10b981",
                "border-color": "#047857"
            });
            parrafoResultado.css({
                "color": "#022c22",
                "font-weight": "900"
            });
        } else {
            // Derrota: colores en rojo
            contenedorResultado.css({
                "background-color": "#c81d25",
                "border-color": "#a8161c"
            });
            
            parrafoResultado.css({
                "color": "#2b0507",
                "font-weight": "900"
            });
        }

        // Metemos el párrafo Resultado dentro del contenedor Resultado, y el contenedor Resultado dentro de la sección Resultado
        contenedorResultado.append(parrafoResultado);
        seccionResultados.append(contenedorResultado);

        // TIEMPO RESTANTE DE LA PARTIDA ---
        let parrafoTiempoRestante = $("<p></p>").text(` - TIEMPO ANTES DEL IMPACTO: ${resultado.tiempoRestante}s`);
        parrafoTiempoRestante.css({
            "font-family": "'Courier New', Courier, monospace",
            "font-size": "15px",
            "font-weight": "bold",
            "color": "lightgray",
            "margin-bottom": "20px"
        });
        seccionResultados.append(parrafoTiempoRestante);

        // --- LISTA BARCOS HUNDIDOS
        // Configuración del titulo y el estilo
        let tituloLista = $("<h4></h4>").text(" - BAJAS ENEMIGAS CONFIRMADAS:");
        tituloLista.css({
            "font-family": "'Courier New', Courier, monospace",
            "font-size": "15px",
            "font-weight": "bold",
            "color": "lightgray",
            "text-transform": "uppercase",
            "letter-spacing": "1px",
            "margin-bottom": "5px"
        });
        seccionResultados.append(tituloLista);

        // Configuración de la lista y estilo
        let contenedorLista = $("<div></div>");
        contenedorLista.css({
            "background-color": "rgba(0, 0, 0, 0.2)",
            "padding": "12px 15px",
            "border-radius": "6px",
            "border": "1px solid rgba(255, 255, 255, 0.05)"
        });

        let listaBarcos = $("<ul></ul>");
        listaBarcos.css({
            "list-style-type": "none",
            "padding-left": "0",
            "margin": "0"
        });

        // Comprobamos si el array tiene barcos hundidos
        if (resultado.barcosHundidos && resultado.barcosHundidos.length > 0) {
            for (let i = 0; i < resultado.barcosHundidos.length; i++) {
                
                let itemBarco = $("<li></li>").text(` - DESTRUIDO: ${resultado.barcosHundidos[i]}`);
                
                itemBarco.css({
                    "font-family": "'Courier New', Courier, monospace",
                    "font-size": "14px",
                    "color": "#ff4d4d", // Rojo brillante de fuego
                    "margin-bottom": "6px",
                    "font-weight": "bold"
                });

                listaBarcos.append(itemBarco);
            }
        } else {
            // No hay ningún barco hundido en la lista
            let itemVacio = $("<li></li>").text(" ** NINGUNA BAJA CONFIRMADA EN EL SECTOR **");
            itemVacio.css({
                "font-family": "'Courier New', Courier, monospace",
                "font-size": "14px",
                "color": "#94a3b8",
                "font-style": "italic"
            });
            listaBarcos.append(itemVacio);
        }

        // Metemos la lista de barcos en el contenedor
        contenedorLista.append(listaBarcos);

        // Metemos el contenedor de la lista en la sección idResultados
        seccionResultados.append(contenedorLista);

    }


    //Dirigir a una nueva partida
    var btnNuevaPartida = $("#btnOtraPartida");
    btnNuevaPartida.click(function(){

        window.location.href = "bienvenida.html";

    });

    //Dirigir a la pantalla incial
    var btnSalirJuego = $("#btnSalirJuego");
    btnSalirJuego.click(function(){

        window.location.href = "../index.html";

    });
});