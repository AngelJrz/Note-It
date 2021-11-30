import { existeCarrera } from "../controllers/carrera.js";
import { existeEstudiante, existeUsuario } from "../controllers/estudiante.js";

function esEmailCorrecto(email) {
  const patter = /zs([0-9]{8})+@estudiantes\.uv\.mx/;

  const esValido = patter.test(email);

  if (!esValido) {
    throw new Error(
      "El correo recibido no se encuentra en el formato esperado."
    );
  } else {
    return true;
  }
}

export const checkSchemaEstudiante = {
  nombres: {
    isLength: {
      errorMessage: "El nombre debe tener al menos dos caracteres.",
      options: { min: 2 },
    },
  },
  apellidos: {
    isLength: {
      errorMessage:
        "El / Los appellido(s) debe(n) tener al menos dos caracteres.",
      options: { min: 2 },
    },
  },
  correo: {
    custom: {
      options: (value) => {
        return esEmailCorrecto(value);
      },
    },
  },
  contrasenia: {
    isLength: {
      errorMessage: "La contraseña debe tener al menos ocho caracteres.",
      options: { min: 8 },
    },
  },
  carrera: {
    isMongoId: {
      errorMessage: "El id de la carrera no cuenta con un formato correcto.",
      bail: true
    },
    custom: {
      options: async (value) => {
        return existeCarrera(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "La carrera especificada no existe. Por favor verifique la información."
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