import Tema from "../models/Tema.js";

export async function existeTema(idMateria, idTema) {
    return Tema.exists({ id: idTema, materia: idMateria })
      .then((existe) => {
        return existe;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
}

export async function obtenerTemas(idMateria) {
  return Tema.find({ materia: idMateria})
  .then((temas) => {
    return temas;
  })
  .catch((err) => {
    console.error(err);

    return [];
  })
}