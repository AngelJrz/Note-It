import { abrirConexion, cerrarConexion } from "../models/conexion.js";
import Materia from "../models/Materia.js";

export async function existeMateria(idCarrera, idMateria) {
  await abrirConexion();

  return Materia.exists({ _id: idMateria, carrera: idCarrera })
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

export async function obtenerMaterias(idCarrera) {
  await abrirConexion();

  return Materia.find({ carrera: idCarrera })
    .then((materias) => {
      return materias;
    })
    .catch((err) => {
      console.error(err);

      return [];
    })
    .finally(async () => {
      await cerrarConexion();
    });
}