import { loginEstudiante } from "../controllers/estudiante.js";
import Estudiante from "../models/Estudiante.js";
import mongoose from "mongoose";

export const ID_ESTUDIANTE_1_DEFUALT = "6178db2ca64a62f62989cf93";
export const CONTRASENIA_ESTUDIANTE_1_DEFAULT = "abizair";
export const USUARIO_ESTUDIANTE_1_DEFAULT = "abizair";
export const ENDPOINT_ESTUDIANTE = "/api/estudiantes/";
export const MENSAJE_ERROR_TOKEN = "El token recibido ha expirado o no existe.";
export const TOKEN_ERRONEO =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNzAxMjQwMCwiaWF0IjoxNjM3MDEyNDAwfQ.-BpctBDFsH_on6QqjcqiuQQ7OVbVnsLGW3SE4pHSeEI";

export const ID_ERRONEO = "6178db2ca64a62f62989cf55"; 
export const estudiantesDefault = [
  {
    _id: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    nombres: "Abizair",
    apellidos: "Suarez Martinez",
    usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
    correo: "abizairsm@gmail.com",
    contrasenia: "$2a$10$a.0vJ8kWX38JHz7O5dJtSe.rbuJMLBsqlaOXv8U4quNsH8fU3STqy", // = abizair
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: new mongoose.Types.ObjectId("61787209f57911dc05a94ea1"),
    activo: true,
  },
//   {
//     _id: { $oid: "618c5035e51edf705ef5350d" },
//     nombres: "Ruben",
//     apellidos: "Rivera Bajaras",
//     usuario: "ruben123",
//     correo: "ruben123@gmail.com",
//     contrasenia: "$2a$10$Nbof66F9.wntnQMq6.VNPORbAoUH/Czf6mJibIMk2/A2db4QAfuBO",
//     biografia: "Hola, soy estudiante de Lic. en Estadística.",
//     carrera: { $oid: "61787590512d6b78b60ebc24" },
//     activo: true,
//   },
];

export async function registrarEstudiantesDefault() {

    try {
        await Estudiante.deleteMany({});

        await Estudiante.insertMany(estudiantesDefault);
    } catch (error) {
        console.error(error);
    }
    
}

export async function iniciarSesion(usuario, contrasenia) {

    try {
        const respuesta = await loginEstudiante({ usuario, contrasenia });

        return respuesta;
    } catch (error) {
        console.error(error);
    }
}