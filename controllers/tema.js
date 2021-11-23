import { abrirConexion, cerrarConexion } from "../models/conexion.js";
import Tema from "../models/Tema.js";

export async function existeTema(idMateria, idTema) {
  await abrirConexion();

  return Tema.exists({ _id: idTema, materia: idMateria })
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

export async function obtenerTemas(idMateria) {
  await abrirConexion();

  return Tema.find({ materia: idMateria })
    .then((temas) => {
      return temas;
    })
    .catch((err) => {
      console.error(err);

      return [];
    })
    .finally(async () => {
      await cerrarConexion();
    });
}