'use-strict'

import { Usuario } from "../models/usuario.model.js";

const jsonUsuarios = `[{
      "id":1,
      "nombre" : "Iker",
      "apellido" : "Arana",
      "usuario":"iarana",
      "contraseña":"1234Abcd"
   },
   {
      "id":2,
      "nombre" : "Ander",
      "apellido" : "Goikoetxea",
      "usuario":"agoikoetxea",
      "contraseña":"5678Efgh"
   },

   {
      "id":3,
      "nombre" : "Jokin",
      "apellido" : "Olano",
      "usuario":"jolano",
      "contraseña":"9012Ijkl"
   }
   
]`;

const jsonParseado = JSON.parse(jsonUsuarios);

export const USUARIOS_BD = jsonParseado.map(element => {
   return new Usuario(element);
});