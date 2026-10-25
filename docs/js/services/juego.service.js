'use-strict'

import { NIVELES_BD} from "../data/juego.data.js";
import { Partida } from "../models/partida.model.js";

// Crea el tablero de juego según las características del nivel elegido
export function crearTableroJuego(nivel){
    
    for (let i = 0; i < NIVELES_BD.length; i++){
        
        let nivelBuscado = NIVELES_BD[i].nombre;
        
        if (nivel === nivelBuscado) {
            
            let nivelEncontrado = NIVELES_BD[i];
            return new Partida(nivelEncontrado);
        }
    }
    
}
