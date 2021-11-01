import Materia from "../models/Materia.js";

export async function existeMateria(idCarrera, idMateria) {
    return Materia.exists({ _id: idMateria, carrera: idCarrera })
      .then((existe) => {
        return existe;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
}

export async function obtenerMaterias(idCarrera) {
  return Materia.find({ carrera: idCarrera })
    .then((materias) => {
      return materias;
    })
    .catch((err) => {
      console.error(err);

      return [];
    })
}