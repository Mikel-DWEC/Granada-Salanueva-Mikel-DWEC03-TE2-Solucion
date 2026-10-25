'use-strict'

import { Barco } from "../models/barco.model.js";

export class Partida {
    
    constructor(nivel) {
        
        this.proyectilesRestantes = nivel.proyectiles;
        this.tiempoRestante = 30; 
        this.resultado = "";
        this.barcos = nivel.barcos;
        
        // Cre0 la matriz del tablero de juego
        this.tableroJuego = [];
        // Coloco los barcos de forma aleatoria
        this.colocarBarcos(nivel);

    }

    colocarBarcos(nivel) {

        // Inicializo la matriz a 0
        for(let fila = 0; fila < nivel.tablero; fila++) {
            let filaTablero = [];
            for(let columna = 0; columna < nivel.tablero; columna++){
                filaTablero.push(0);
            }
            this.tableroJuego.push(filaTablero);
        }

        //Recorro la matriz de los barcos para colocarlos según el orden que tengo en juego.data.js (de mayor a menor)
        for (let flota = 0; flota < nivel.barcos.length; flota++){

            let barcoActual = nivel.barcos[flota];
            let colocado = false;
            while (colocado === false) {

                //Elegir un punto aleatorio y la orientazión
                let filaTablero = Math.floor(Math.random() * nivel.tablero);
                let columnaTablero = Math.floor(Math.random() * nivel.tablero);
                let orientacion = Math.floor(Math.random() * 2);    // dos opciones: 0 = vertical; 1 = horizontal.

                // Según el punto de inicio, compruebo si el barco puede colocarse en el tablero
                let haySitio = true;
                if (orientacion === 0) {    // Barco colocado en orientacion VERTICAL. Buscar si hay sitio en vertical
                    if (filaTablero + barcoActual.longitud <= nivel.tablero) {
                        // El barco entra. Compruebo que no haya un barco en las posiciones que vaya a ocupar y en las de alrededor
                        for (let i = 0; i < barcoActual.longitud; i++){
                            if (this.casillaOcupada(filaTablero + i, columnaTablero, nivel)){
                                // Hay parte de un barco
                                haySitio = false;
                            }
                        }
                        
                        // Si hay sitio, coloco en el tablero el objeto barcoActual en cada casilla
                        if (haySitio) {
                            for (let i = 0; i < barcoActual.longitud; i++) {
                                this.tableroJuego[filaTablero + i] [columnaTablero] = barcoActual;
                            }
                            
                            // Cambio el valor de la variable colocado a true para que pase al barco siguiente
                            colocado = true;
                        }
                        
                    } // El barco no entra en el tablero en posición vertical

                } else {    // Barco colocado en orientacion HORIZONTAL
                    if (columnaTablero + barcoActual.longitud <= nivel.tablero) {
                         // El barco entra. Compruebo que no haya un barco en las posiciones que vaya a ocupar y en las de alrededor
                         for (let i = 0; i < barcoActual.longitud; i++){
                            if (this.casillaOcupada(filaTablero, columnaTablero + i, nivel)){
                                // Hay parte de un barco
                                haySitio = false;
                            }
                         }

                         // Si hay sitio, coloco en el tablero el objeto barcoActual en cada casilla
                         if (haySitio) {
                            for (let i = 0; i < barcoActual.longitud; i++){
                                this.tableroJuego[filaTablero][columnaTablero + i] = barcoActual;
                            }

                            // Cambio el valor de la variable colocado a true para que pase al barco siguiente
                            colocado = true;
                         }
                    } // el barco no entra en el tablero en posición horizontal
                }
            }
        }
    }

    // Función para comprobar que la casilla donde va el barco y las casillas alrededor del punto estan libres
    // Por cada punto donde vaya el barco, hay que comprobar 9 casillas (matriz de 3x3)
    casillaOcupada(fila, columna, nivel) {
        
        // Recorro las filas de al lado del punto aleatorio (el punto anterior, punto de colocacion y punto siguiente)
        for (let i = fila - 1; i <= fila +1; i++) {
            //  Recorro las columnas de la lado del punto aleatorio
            for (let j = columna -1; j <= columna + 1; j++){

                // Compruebo que estoy "mirando" dentro del tablero (si el punto a comprobrar es negativo o mayor que la longitud del tablero)
                if (i >= 0 && i < nivel.tablero && j >=0 && j < nivel.tablero){

                    // Si alguna casilla contien un objeto de la clase barco es que ya hay otro barco en ella
                    if (this.tableroJuego[i] [j] instanceof Barco){
                        return true;    // casillaOcupuada = si
                    }
                }
            }
        }

        // Si se han comprobado todas las casillas de alrededor y ninguna es un objeto de la clase barco es que hay hueco
        return false;   // casillaOcupada = no
    }

    // método que comprueba que el jugador haya ganado la partida o no
    flotaHundida(){

        // Compruebo el valor del atributo 'hundido' de todos los barcos
        let barcosHundidos = 0;
        let barcosTotales = this.barcos.length;
        for (let i = 0; i < barcosTotales; i++){
            if (this.barcos[i].hundido === true) {
                barcosHundidos++;
            }
        }

        if (barcosHundidos === barcosTotales) {
            return true;    // El total de barcos de la flota están hundidos
        }
        return false;       // Todavía no se han hundido todos los barcos
    }
}