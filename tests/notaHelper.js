import Nota from "../models/Nota.js";
import { obtenerNotas } from '../controllers/nota.js';
import { ID_ESTUDIANTE_1_DEFUALT } from './estudianteHelper.js';
import mongoose from "mongoose";
import { abrirConexion } from "../models/conexion.js";

export const ID_NOTA_1_DEFAULT = "61842ecd2800613878909bf2";
export const ID_CARRERA_DEFAULT = "61787209f57911dc05a94ea1";
export const ID_MATERIA_DEFAULT = "6178d9388c9c391890f678aa";
export const ID_TEMA_DEFUALT = "6178dae2b465244de051804c";

export const ID_CARRERA_EXTRA = "61787590512d6b78b60ebc24";
export const ID_MATERIA_EXTRA = "6178d98ac42c26109e227277";
export const ID_TEMA_EXTRA = "618c4d2bda986d69cf2e2168";

export const notasDefault = [
  {
    _id: new mongoose.Types.ObjectId(ID_NOTA_1_DEFAULT),
    titulo: "Nota para pruebas 1",
    cuerpo: "<p>Cuerpo para la nota de pruebas 1</p>",
    carrera: new mongoose.Types.ObjectId(ID_CARRERA_DEFAULT),
    materia: new mongoose.Types.ObjectId(ID_MATERIA_DEFAULT),
    tema: new mongoose.Types.ObjectId(ID_TEMA_DEFUALT),
    autor: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    esUtil: 15,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 2",
    cuerpo: "<p>Cuerpo para la nota de pruebas 2</p>",
    carrera: new mongoose.Types.ObjectId(ID_CARRERA_DEFAULT),
    materia: new mongoose.Types.ObjectId(ID_MATERIA_DEFAULT),
    tema: new mongoose.Types.ObjectId(ID_TEMA_DEFUALT),
    autor: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    esUtil: 14,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 3",
    cuerpo: "<p>Cuerpo para la nota de pruebas 3</p>",
    carrera: new mongoose.Types.ObjectId(ID_CARRERA_DEFAULT),
    materia: new mongoose.Types.ObjectId(ID_MATERIA_DEFAULT),
    tema: new mongoose.Types.ObjectId(ID_TEMA_DEFUALT),
    autor: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    visualizaciones: 10,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 3",
    cuerpo: "<p>Cuerpo para la nota de pruebas 3</p>",
    carrera: new mongoose.Types.ObjectId(ID_CARRERA_DEFAULT),
    materia: new mongoose.Types.ObjectId(ID_MATERIA_DEFAULT),
    tema: new mongoose.Types.ObjectId(ID_TEMA_DEFUALT),
    autor: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    visualizaciones: 4,
    imagen: "default.jpg",
  },
];

export const PATH_IMAGEN = "D:/imagenes dummies/worry-dog.jpg";
export const ENDPOINT_NOTAS = "/api/notas";

export const palabraBusqueda = "pruebas 1";
export const OP_NOTAS_UTILES = "1";
export const OP_NOTAS_MAS_VISUALIZADAS = "2";
export const MENSAJE_NOTAS_ENCONTRADAS = "Nota(s) encontrada(s)";
export const MENSAJE_ERROR_OBTENER_NOTAS =
  "Se encontaron errores al intentar obtener las notas.";

export const MENSAJE_REGISTRO = "La nota fue creada exitosamente.";
export const MENSAJE_ERROR_REGISTRO = "Se encontaron errores al validar la nota.";
export const MENSAJE_ERROR_TITULO =
  "El título de la nota debe tener al menos 5 caracteres y máximo 50 caracteres.";

export const MENSAJE_ERROR_CUERPO =
  "El cuerpo de la nota debe tener al menos 20 caracteres y máximo 3000.";

export const MENSAJE_ERROR_AUTOR =
  "El autor especificado no se encuentra activo o no existe. Por favor verifique la información.";

export const MENSAJE_COMENTARIO_AGREGADO = "El comentario fue agregado exitosamente.";
export const MENSAJE_COMENTARIO_ERRORES = "Se encontraron errores al validar el comentario.";
export const MENSAJE_COMENTARIO_ERROR_CONTENIDO =
  "El contenido del comentario debe tener al menos 20 caracteres y máximo 300.";

export async function crearNotasDefault() {
    await abrirConexion();

    const resultado = await Nota.insertMany(notasDefault);

    return resultado;
}

export async function eliminarTodasLasNotas() {
  await abrirConexion();

    const resultado = await Nota.deleteMany({});

    return resultado;
}

export async function buscarNotas(busqueda) {
  const resultado = await obtenerNotas(busqueda);

  return resultado;
}