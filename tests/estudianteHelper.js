import { loginEstudiante } from "../controllers/estudiante.js";
import Estudiante from "../models/Estudiante.js";
import Verificacion from "../models/Verificacion.js";
import mongoose from "mongoose";
import { abrirConexion, cerrarConexion } from "../models/conexion.js";

export const ID_ESTUDIANTE_1_DEFUALT = "6178db2ca64a62f62989cf93";
export const CONTRASENIA_ESTUDIANTE_1_DEFAULT = "abizair";
export const USUARIO_ESTUDIANTE_1_DEFAULT = "abizair";
export const ENDPOINT_ESTUDIANTE = "/api/estudiantes/";
export const ENDPOINT_VERIFICACION = "/api/verificacion";
export const MENSAJE_ERROR_TOKEN = "El token recibido ha expirado o no existe.";
export const TOKEN_ERRONEO =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNzAxMjQwMCwiaWF0IjoxNjM3MDEyNDAwfQ.-BpctBDFsH_on6QqjcqiuQQ7OVbVnsLGW3SE4pHSeEI";

export const ID_ERRONEO = "6178db2ca64a62f62989cf55"; 
export const ID_CARRERA_DEFAULT = "61787209f57911dc05a94ea1";
export const MENSAJE_REGISTRO_DEFAULT = "El usuario fue registrado exitosamente.";
export const MENSAJE_ERROR_INFORMACION_REGISTRO =
  "Se encontaron errores al validar el estudiante.";

export const MENSAJE_ERROR_CORREO =
  "El correo recibido no se encuentra en el formato esperado.";

export const MENSAJE_ERROR_NOMBRE = "El nombre debe tener al menos dos caracteres.";
export const MENSAJE_ERROR_APELLIDOS =
  "El / Los appellido(s) debe(n) tener al menos dos caracteres.";

export const CODIGO_VERIFICACION_DEFAULT = 79135;
export const MENSAJE_CODIGO_VERIFICACION_CORRECTO = "Código de verificación correcto.";
export const MENSAJE_CODIGO_VERIFICACION_INCORRECTO =
  "El código de verificación es incorrecto.";

export const MENSAJE_CODIGO_VERIFICACION_EXPIRADO =
  "No se encontró un usuario para la verificación o el código de verificación ha expirado.";

export const estudiantesDefault = [
  {
    _id: new mongoose.Types.ObjectId(ID_ESTUDIANTE_1_DEFUALT),
    nombres: "Abizair",
    apellidos: "Suarez Martinez",
    usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
    correo: "abizairsm@gmail.com",
    contrasenia: "$2a$10$a.0vJ8kWX38JHz7O5dJtSe.rbuJMLBsqlaOXv8U4quNsH8fU3STqy", // = abizair
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: new mongoose.Types.ObjectId(ID_CARRERA_DEFAULT),
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
  await abrirConexion();

    try {
        await Estudiante.deleteMany({});

        await Estudiante.insertMany(estudiantesDefault);
    } catch (error) {
        console.error(error);
    }
    finally {
      cerrarConexion();
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

export async function desactivarEstudianteDefault() {
  await abrirConexion();
  try {
    await Estudiante.updateOne(
      { usuario: USUARIO_ESTUDIANTE_1_DEFAULT },
      {
        activo: false,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function crearVerificacionDefault() {
  const verificacionInicial = {
    usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
    codigo: CODIGO_VERIFICACION_DEFAULT,
  };

  await abrirConexion();

  const nuevaVerificacion = new Verificacion(verificacionInicial);

  try {
    await eliminarVerificaciones();
    await nuevaVerificacion.save();
  } catch (error) {
    console.error(error);
  }
}

export async function eliminarVerificaciones() {
  await abrirConexion();

  try {
    await Verificacion.deleteMany({});
  } catch (error) {
    console.error(error);
  }
}