import { USUARIOS_BD } from "../data/usuario.data.js";
import { Usuario } from "../models/usuario.model.js";

export const procesos = {
    almacenarUsuarios,
    buscarUsuario
}

function almacenarUsuarios(){
    
    USUARIOS_BD.forEach(element => {
        
        localStorage.setItem(element.id, JSON.stringify(element));

    });
}

function buscarUsuario(usuarioBuscado, passwordBuscado) {

    // let encontrado = false;
    let i = 0;
    while (i < USUARIOS_BD.length) {
        
        let usuario = USUARIOS_BD[i].usuario;
        let password = USUARIOS_BD[i].contraseña;
        if (usuario === usuarioBuscado.trim() && password === passwordBuscado.trim()) {
            return new Usuario(USUARIOS_BD[i]);
        }
        i++;
    }

    return false;

}

