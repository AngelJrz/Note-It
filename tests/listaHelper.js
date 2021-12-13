import mongoose from "mongoose";
import { abrirConexion, cerrarConexion } from "../models/conexion.js";
import Lista from "../models/Lista.js";
import { ID_ESTUDIANTE_1_DEFUALT } from "./estudianteHelper.js";

export const ID_LISTA_1_DEFAULT = "6192e08309a76056780537dc";
export const ENDPOINT_LISTAS = "/api/listas/";

export const listasIniciales = [
  {
    _id: new mongoose.Types.ObjectId(ID_LISTA_1_DEFAULT),
    nombre: "Lista para prueba 1",
    descripcion: "Una lista para realizar pruebas.",
    creador: ID_ESTUDIANTE_1_DEFUALT,
  },
  {
    nombre: "Lista para prueba 2",
    descripcion: "Una lista para realizar pruebas.",
    creador: ID_ESTUDIANTE_1_DEFUALT,
  },
];

export const MENSAJE_REGISTRO_DEFAULT = "Lista creada exitosamente.";
export const MENSAJE_ERROR_NOMBRE =
  "El nombre de la lista debe tener al menos 3 caracteres y máximo 60 caracteres.";

export const MENSAJE_ERROR_VALIDACION =
  "Se encontaron errores al intentar crear la lista.";

export const NOMBRE_LARGO =
  "Un nombre con más de sesenta caracteres para realizar las pruebas.";

export const MENSAJE_ERROR_CREADOR =
  "El creador especificado no se encuentra activo o no existe. Por favor verifique la información.";

export const MENSAJE_LISTAS_ENCONTRADAS = "Listas encontradas.";
export const MENSAJE_LISTA_ENCONTRADA = "Lista encontrada."
export const MENSAJE_ERROR_OBTENER =
  "Se encontaron errores al intentar obtener las listas.";

export const MENSAJE_ERROR_OBTENER_LISTA =
  "Se encontaron errores al intentar obtener la lista.";

export const MENSAJE_NOTA_AGREGADA = "La nota fue agregada a la lista.";
export const MENSAJE_LISTA_INEXISTENTE = "La lista especificada no existe.";
export const MENSAJE_ERROR_AGREGAR_NOTA =
  "Se encontraron errores al validar la nota a agregar.";

export const MENSAJE_ERROR_ID_NOTA =
  "El id de la nota no tiene el formato correcto. Verifique la información.";

export const MENSAJE_ERROR_ID_LISTA =
  "El id de la lista no tiene el formato correcto. Verifique la información.";

export const MENSAJE_ERROR_NOTA_EXISTENTE = "La nota ya se encuentra agregada a la lista.";

export async function crearListasDefault() {
  await abrirConexion();

  try {
    await Lista.deleteMany({});
    await Lista.insertMany(listasIniciales);
  } catch (error) {
    console.error(error);
  }
  finally {
    cerrarConexion();
  }
}
