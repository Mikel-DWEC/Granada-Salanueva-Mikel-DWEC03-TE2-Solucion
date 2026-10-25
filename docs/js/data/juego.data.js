'use-strict'

import { Nivel } from "../models/nivel.model.js";

// Niveles disponibles en el juego con sus características
const jsonNiveles = `[
    {
        "nombre": "grumete",
        "tablero": 5,
        "proyectiles": 20,
        "barcos": [
            {"nombre":"Destructor", "longitud":3},
            {"nombre":"Fragata 1", "longitud":2},
            {"nombre":"Fragata 2", "longitud":2}
        ]
    },
    {
        "nombre": "capitan",
        "tablero": 6,
        "proyectiles": 25,
        "barcos": [
            {"nombre":"Acorazado", "longitud":4},
            {"nombre":"Destructor", "longitud":3},
            {"nombre":"Fragata 1", "longitud":2},
            {"nombre":"Fragata 2", "longitud":2}
        ]
    },
    {
        "nombre": "almirante",
        "tablero": 7,
        "proyectiles": 30,
        "barcos": [
            {"nombre":"Portaaviones", "longitud":5},
            {"nombre":"Acorazado", "longitud":4},
            {"nombre":"Destructor", "longitud":3},
            {"nombre":"Fragata 1", "longitud":2},
            {"nombre":"Fragata 2", "longitud":2}
        ]
    }
]`;

var nivelesParseado = JSON.parse(jsonNiveles);

export const NIVELES_BD = nivelesParseado.map(elemento => {
    return new Nivel(elemento);
})
