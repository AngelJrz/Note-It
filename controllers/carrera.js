import Carrera from "../models/Carrera.js";

export function obtenerCarreras(idCarrera) {
    var filtro = {}
    
    if(idCarrera){
        filtro = {_id: idCarrera}
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
    return Carrera.exists({ _id: idCarrera })
    .then(existe => {
        return existe;
    })
    .catch(err => {
        console.error(err);
        return false;
    })
}