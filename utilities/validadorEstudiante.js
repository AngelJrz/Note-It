import { existeCarrera } from "../controllers/carrera.js";
import { existeEstudiante, existeUsuario } from "../controllers/estudiante.js";
import {
  MENSAJE_ERROR_APELLIDOS_ESTUDIANTE,
  MENSAJE_ERROR_CARRERA_INEXISTENTE,
  MENSAJE_ERROR_CORREO,
  MENSAJE_ERROR_FORMATO_CARRERA,
  MENSAJE_ERROR_NOMBRE_ESTUDIANTE,
  MENSAJE_CODIGO_VERIFICACION_FORMATO_INCORRECTO,
  MENSAJE_CODIGO_VERIFICACION_LARGO_INCORRECTO,
  MENSAJE_ERROR_FORMATO_USUARIO,
} from "./constantes.js";
import { checkSchemaCadena } from "./validadorCadena.js";

function esEmailCorrecto(email) {
  const patter = /zs([0-9]{8})+@estudiantes\.uv\.mx/;

  const esValido = patter.test(email);

  if (!esValido) {
    throw new Error(
     MENSAJE_ERROR_CORREO
    );
  } else {
    return true;
  }
}

function esFormatoUsuarioCorrecto(usuario) {
  const pattern = /^\S+$/;

  const esCorrecto = pattern.test(usuario);

  if (!esCorrecto) {
    throw new Error(MENSAJE_ERROR_FORMATO_USUARIO)
  }

  return esCorrecto;
}

export const checkSchemaEstudiante = {
  nombres: {
    ...checkSchemaCadena.cadena,
    isLength: {
      errorMessage: MENSAJE_ERROR_NOMBRE_ESTUDIANTE,
      options: { min: 2, max: 80 },
    },
  },
  apellidos: {
    ...checkSchemaCadena.cadena,
    isLength: {
      errorMessage:
        MENSAJE_ERROR_APELLIDOS_ESTUDIANTE,
      options: { min: 2, max: 100 },
    },
  },
  correo: {
    custom: {
      options: (value) => {
        return esEmailCorrecto(value);
      },
    },
  },
  usuario: {
    custom: {
      options: (value) => {
        return esFormatoUsuarioCorrecto(value);
      }
    }
  },
  contrasenia: {
    isLength: {
      errorMessage: "La contraseña debe tener al menos ocho caracteres.",
      options: { min: 8 },
    },
  },
  carrera: {
    isMongoId: {
      errorMessage: MENSAJE_ERROR_FORMATO_CARRERA,
      bail: true,
    },
    custom: {
      options: async (value) => {
        return existeCarrera(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              MENSAJE_ERROR_CARRERA_INEXISTENTE
            );
          }

          return existe;
        });
      },
    },
  },
};

export const checkSchemaEstudianteId = {
  id: {
    in: "params",
    isMongoId: {
      errorMessage:
        "El id del estudiante no tiene el formato correcto. Verifique la información.",
      bail: true,
    },
    options: async (value) => {
      return existeEstudiante(value).then((existe) => {
        if (!existe) {
          return Promise.reject(
            "El estudiante especificado no se encuentra activo o no existe. Por favor verifique la información."
          );
        }

        return existe;
      });
    },
  },
};

export const checkSchemaUsuarioEstudiante = {
  usuario: {
    custom: {
      options: async (value) => {
        return existeUsuario(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El usuario especificado no existe. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export const checkSchemaVerificacion = {
  codigoVerificacion: {
    isNumeric: {
      errorMessage: MENSAJE_CODIGO_VERIFICACION_FORMATO_INCORRECTO,
      bail: true,
    },
    isLength: {
      options: { min: 5, max: 5 },
      errorMessage: MENSAJE_CODIGO_VERIFICACION_LARGO_INCORRECTO,
    },
    customSanitizer: {
      options: (value) => {
        return parseInt(value);
      },
    },
  },
};