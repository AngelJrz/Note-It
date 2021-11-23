import Estudiante from "../models/Estudiante.js";
import enviarCorreoCodigoVerificacion from "../utilities/mailer.js";
import generarCodigoVerificacion from "../utilities/generadorDeCodigo.js";
import { crearVerificacion } from "../controllers/verificacion.js";
import { comparar, encriptar } from "../utilities/hashManager.js";
import { obtenerToken } from '../utilities/jsonWebToken.js';
import { RETURNED_ESTUDIANTE_LOGIN_INFO } from "../utilities/constantes.js";
import { abrirConexion, cerrarConexion } from "../models/conexion.js";

export async function existeUsuario(usuario) {
  await abrirConexion();

  return Estudiante.findOne({ usuario: usuario, activo: true })
    .then((estudiante) => {
      if (estudiante) return true;

      return false;
    })
    .catch((error) => {
      console.error(error);
      return error;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function registrarEstudiante(estudiante) {
  const contraniaEncriptada = encriptar(estudiante.contrasenia)
  estudiante.contrasenia = contraniaEncriptada
  const nuevoEstudiante = new Estudiante(estudiante);

  await abrirConexion();

  return nuevoEstudiante
    .save()
    .then((estudianteGuardado) => {
      if (estudianteGuardado) {
        const { usuario, correo } = estudianteGuardado;
        const codigoVerificacion = generarCodigoVerificacion();

        return crearVerificacion(usuario, codigoVerificacion)
          .then(async (creado) => {
            if (creado) {
              await enviarCorreoCodigoVerificacion(
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
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function activarEstudiante(usuario) {
  const estudianteActivo = {
    activo: true,
  };

  await abrirConexion();

  return Estudiante.updateOne({ usuario: usuario }, estudianteActivo)
    .then((resultado) => {
      return resultado.ok == 1;
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function loginEstudiante(datosUsuario) {
  await abrirConexion();

  return Estudiante.findOne(
    { usuario: datosUsuario.usuario, activo: true },
    RETURNED_ESTUDIANTE_LOGIN_INFO
  )
    .then((estudiante) => {
      if (estudiante == null) {
        return {
          resultado: false,
          mensaje: "El usuario no existe",
          data: null,
        };
      }

      return comparar(estudiante.contrasenia, datosUsuario.contrasenia)
        .then((sonIguales) => {
          if (!sonIguales) {
            return {
              resultado: false,
              mensaje: "Contraseña incorrecta",
              data: null,
            };
          }

          return {
            resultado: true,
            mensaje: "Login exitoso",
            data: {
              estudiante: estudiante,
              token: obtenerToken(estudiante),
            },
          };
        })
        .catch((err) => {
          console.error(err);

          return {
            resultado: false,
            mensaje: "Ocurrió un error al intentar validar la información.",
            data: null,
          };
        })
        .finally(() => {
          cerrarConexion();
        });
    })
    .catch(() => {
      return {
        resultado: false,
        mensaje: "Error en servicio en controlador de estudiante",
        data: null,
      };
    })
    .finally(async () => {
      await cerrarConexion();
    });
}


export async function existeEstudiante(id) {
  await abrirConexion();

  return Estudiante.exists({ _id: id, activo: true })
    .then((existe) => {
      return existe;
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
    .finally(() => {
      cerrarConexion();
    })
}


export async function BuscarEstudiante(usuario) {

  await abrirConexion();

  return Estudiante.findOne(
    { usuario: usuario },
  )
    .then((estudiante) => {
      if (estudiante == null) {
        return {
          resultado: false,
          mensaje: "El usuario no existe",
          data: null,
        };
      }else{
        estudiante._id = null;
        return {
          resultado: true,
          mensaje: "Usuario encontrado",
          data: {
            estudiante: estudiante
          },
        };
      }
    })
    .catch(() => {
      return {
        resultado: false,
        mensaje: "Error en servicio en controlador de estudiante",
        data: null,
      };
    })
    .finally(() => {
      cerrarConexion();
    });
}