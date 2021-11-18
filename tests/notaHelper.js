import Nota from "../models/Nota.js";
import { obtenerNotas } from '../controllers/nota.js';
import mongoose from "mongoose";

export const ID_NOTA_1_DEFAULT = "61842ecd2800613878909bf2";

export const notasDefault = [
  {
    _id: new mongoose.Types.ObjectId(ID_NOTA_1_DEFAULT),
    titulo: "Nota para pruebas 1",
    cuerpo: "<p>Cuerpo para la nota de pruebas 1</p>",
    carrera: "6178e14bf6e1c4551f2fee5c",
    materia: "6178e468f6e1c4551f2fee74",
    tema: "6178e500f6e1c4551f2fee80",
    autor: "6178e0f1f6e1c4551f2fee59",
    esUtil: 15,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 2",
    cuerpo: "<p>Cuerpo para la nota de pruebas 2</p>",
    carrera: "6178e14bf6e1c4551f2fee5c",
    materia: "6178e468f6e1c4551f2fee74",
    tema: "6178e500f6e1c4551f2fee80",
    autor: "6178e0f1f6e1c4551f2fee59",
    esUtil: 14,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 3",
    cuerpo: "<p>Cuerpo para la nota de pruebas 3</p>",
    carrera: "6178e14bf6e1c4551f2fee5c",
    materia: "6178e468f6e1c4551f2fee74",
    tema: "6178e500f6e1c4551f2fee80",
    autor: "6178e0f1f6e1c4551f2fee59",
    visualizaciones: 10,
    imagen: "default.jpg",
  },
  {
    titulo: "Nota para pruebas 3",
    cuerpo: "<p>Cuerpo para la nota de pruebas 3</p>",
    carrera: "6178e14bf6e1c4551f2fee5c",
    materia: "6178e468f6e1c4551f2fee74",
    tema: "6178e500f6e1c4551f2fee80",
    autor: "6178e0f1f6e1c4551f2fee59",
    visualizaciones: 4,
    imagen: "default.jpg",
  },
];

export const PATH_IMAGEN = "D:/imagenes dummies/worry-dog.jpg";

export const idCarreraDefault = "6178e14bf6e1c4551f2fee5c";
export const idMateriaDefault = "6178e468f6e1c4551f2fee74";
export const idTemaDefault = "6178e500f6e1c4551f2fee80";
export const palabraBusqueda = "pruebas 1";
export const OP_NOTAS_UTILES = "1";
export const OP_NOTAS_MAS_VISUALIZADAS = "2";
export const MENSAJE_NOTAS_ENCONTRADAS = "Nota(s) encontrada(s)";
export const MENSAJE_ERROR_OBTENER_NOTAS =
  "Se encontaron errores al intentar obtener las notas.";

export async function crearNotasDefault() {
    const resultado = await Nota.insertMany(notasDefault);

    return resultado;
}

export async function eliminarTodasLasNotas() {
    const resultado = await Nota.deleteMany({});

    return resultado;
}

export async function buscarNotas(busqueda) {
  const resultado = await obtenerNotas(busqueda);

  return resultado;
}