import Estudiante from "../models/Estudiante.js";

export function existeUsuario(usuario) {
    Estudiante.findOne({usuario: usuario})
        .then(estudiante => {
            if(estudiante)
                return true

            return false
        })
        .cath(error => {
            console.error(error)
            return error
        })
}
