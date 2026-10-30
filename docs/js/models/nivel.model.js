'use-strict'

import { Barco } from "../models/barco.model.js";

export class Nivel {

    constructor (elemento) {

        this.idNivel = elemento.id;
        this.nombre = elemento.nombre;
        this.tablero = elemento.tablero;
        this.proyectiles = elemento.proyectiles;
        
        // Creamos el array barcos que va a contener los objetos de la clase Barco
        this.barcos = [];
        for (let i = 0; i < elemento.barcos.length; i++) {
            
            // introduzco en la variable elementoBarco el objeto. P.e. {"nombre":"Destructor", "longitud":3},
            let elementoBarco = elemento.barcos[i];

            // Instancio la variable objetoBarco con un objeto de la clase Barco
            let objetoBarco = new Barco(elementoBarco.id, elementoBarco.nombre, elementoBarco.longitud);
            
            // Guardo el valor del objetoBarco en el atributo barcos de la clase Nivel
            this.barcos.push(objetoBarco);
        }
        
    }

}
