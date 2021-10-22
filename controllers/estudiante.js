import { Guid } from "js-guid";
import jwt from 'jsonwebtoken';

import Estudiante from "../models/Estudiante.js";
import enviarCorreoCodigoVerificacion from "../utilities/mailer.js";
import generarCodigoVerificacion from "../utilities/generadorDeCodigo.js";
import { crearVerificacion } from "../controllers/verificacion.js";
import { encriptar } from "../utilities/hashManager.js";

export function existeUsuario(usuario) {
  return Estudiante.findOne({ usuario: usuario, activo: true })
    .then((estudiante) => {
      if (estudiante) return true;

      return false;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function registrarEstudiante(estudiante) {
  const id = Guid.newGuid();
  estudiante.id = id;
  const contraniaEncriptada = encriptar(estudiante.contrasenia)
  estudiante.contrasenia = contraniaEncriptada
  const nuevoEstudiante = new Estudiante(estudiante);

  return nuevoEstudiante
    .save()
    .then((estudianteGuardado) => {
      if (estudianteGuardado) {
        const { usuario, correo } = estudianteGuardado;
        const codigoVerificacion = generarCodigoVerificacion();

        return crearVerificacion(usuario, codigoVerificacion)
          .then((creado) => {
            if (creado) {
              enviarCorreoCodigoVerificacion(
                correo,
                usuario,
                codigoVerificacion
              );
            }

            return creado;
          })
          .catch((error) => {
            console.error(error);
            return false;
          });
      }

      return false;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export async function activarEstudiante(usuario) {
    const estudianteActivo = {
        activo: true
    }
    return Estudiante.updateOne({usuario: usuario}, estudianteActivo)
        .then(resultado => {
            return resultado.ok == 1;
        })
        .catch(error => {
          console.error(error);
          return false;
        })
}

export function loginEstudiante(datosUsuario) {
  return Estudiante.findOne({ usuario: datosUsuario.usuario })
  .then((estudiante) => {
    if (estudiante == null) {
      return {
              resultado: false,
              mensaje: "El usuario no existe",
              data: null
            }
    } else {
      if (datosUsuario.contrasenia === estudiante.contrasenia) {
        return {
              resultado: true,
              mensaje: "Login exitoso",
              data: jwt.sign({usuario: estudiante}, 'secretKey')
            }
      } else {
        return {
            resultado: false,
            mensaje: "Contraseña incorrecta",
            data: null
          }
      }
    }
  })
  .catch(() => {
    return {
      resultado: false,
      mensaje: "Error en servicio en controlador de estudiante",
      data: null
    }
  });
}


export async function existeEstudiante(id) {
  return Estudiante.exists({ id: id, activo: true })
    .then((existe) => {
      return existe;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}