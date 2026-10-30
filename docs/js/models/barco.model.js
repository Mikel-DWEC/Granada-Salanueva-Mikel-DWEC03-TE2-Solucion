'use-strict'

export class Barco {

    constructor(idBarco, nombre, longitud) {

        this.idBarco = idBarco;
        this.nombre = nombre;
        this.longitud = longitud;
        this.hundido = false;
        this.impactosRecibidos = 0;
        
    }
}