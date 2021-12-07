import Carrera from "../models/Carrera.js";
import { abrirConexion, cerrarConexion } from "../models/conexion.js";

export async function obtenerCarreras(idCarrera) {
    var filtro = {}
    
    if(idCarrera){
        filtro = {_id: idCarrera}
    }

    await abrirConexion();

    return Carrera.find(filtro)
      .then((carreras) => {
        return carreras;
      })
      .catch((error) => {
        console.error(error);
        return error;
      })
}

export async function existeCarrera(idCarrera) {
    abrirConexion();

    return Carrera.exists({ _id: idCarrera })
      .then((existe) => {
        return existe;
      })
      .catch((err) => {
        console.error(err);
        return false;
      })
      .finally(async () => {
        await cerrarConexion();
      });
}