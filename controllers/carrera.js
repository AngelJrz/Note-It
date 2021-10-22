import Carrera from "../models/Carrera.js";

export function obtenerCarreras(idCarrera) {
    var filtro = {}
    
    if(idCarrera){
        filtro = {id: idCarrera}
    }

    return Carrera.find(filtro)
        .then(carreras => {
            return carreras;
        })
        .catch(error => {
            console.error(error);
            return error;
        })
}

export async function existeCarrera(idCarrera) {
    return Carrera.exists({ id: idCarrera })
    .then(existe => {
        return existe;
    })
    .catch(err => {
        console.error(err);
        return false;
    })
}