'use-strict'

import { Nivel } from "../models/nivel.model.js";

// Niveles disponibles en el juego con sus características
const jsonNiveles = `[
    {
        "id":1,
        "nombre": "grumete",
        "tablero": 5,
        "proyectiles": 20,
        "barcos": [
            {"id":1, "nombre":"Destructor", "longitud":3},
            {"id":2, "nombre":"Fragata 1", "longitud":2},
            {"id":3, "nombre":"Fragata 2", "longitud":2}
        ]
    },
    {
        "id":2,
        "nombre": "capitan",
        "tablero": 6,
        "proyectiles": 25,
        "barcos": [
            {"id":1, "nombre":"Acorazado", "longitud":4},
            {"id":2, "nombre":"Destructor", "longitud":3},
            {"id":3, "nombre":"Fragata 1", "longitud":2},
            {"id":4, "nombre":"Fragata 2", "longitud":2}
        ]
    },
    {
        "id":3,
        "nombre": "almirante",
        "tablero": 7,
        "proyectiles": 30,
        "barcos": [
            {"id":1, "nombre":"Portaaviones", "longitud":5},
            {"id":2, "nombre":"Acorazado", "longitud":4},
            {"id":3, "nombre":"Destructor", "longitud":3},
            {"id":4, "nombre":"Fragata 1", "longitud":2},
            {"id":5, "nombre":"Fragata 2", "longitud":2}
        ]
    }
]`;

var nivelesParseado = JSON.parse(jsonNiveles);

export const NIVELES_BD = nivelesParseado.map(elemento => {
    return new Nivel(elemento);
})
