import { existeCarrera } from "../controllers/carrera.js";
import { existeEstudiante, existeUsuario } from "../controllers/estudiante.js";
import { existeMateria } from "../controllers/materia.js";
import { existeNota } from "../controllers/nota.js";
import { existeTema } from "../controllers/tema.js";
import { MENSAJE_ERROR_ACTUALIZAR_CARRERA_MATERIA, MENSAJE_ERROR_ACTUALIZAR_MATERIA_CARRERA, MENSAJE_ERROR_NOTA_ID, MENSAJE_ERROR_NOTA_INEXISTENTE } from "./constantes.js";
import { checkSchemaCadena } from "./validadorCadena.js";
import { checkSchemaEstudianteId, checkSchemaUsuarioEstudiante } from "./validadorEstudiante.js";

export const checkSchemaNota = {
  titulo: {
    ...checkSchemaCadena.cadena,
    isLength: {
      errorMessage:
        "El título de la nota debe tener al menos 5 caracteres y máximo 50 caracteres.",
      options: { min: 5, max: 50 },
    },
  },
  cuerpo: {
    isLength: {
      errorMessage:
        "El cuerpo de la nota debe tener al menos 20 caracteres y máximo 3000.",
      options: { min: 20, max: 3000 },
    },
  },
  carrera: {
    isMongoId: {
      errorMessage: "El id de la carrera no cuenta con un formato correcto.",
      bail: true,
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
  materia: {
    isMongoId: {
      errorMessage: "El id de la materia no cuenta con un formato correcto.",
      bail: true,
    },
    custom: {
      options: async (value, { req }) => {
        return existeMateria(req.body.carrera, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "La materia especificada no se encuentra en la carrera seleccionada. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
  tema: {
    isMongoId: {
      errorMessage: "El id del tema no cuenta con un formato correcto.",
      bail: true,
    },
    custom: {
      options: async (value, { req }) => {
        return existeTema(req.body.materia, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El tema especificado no se encuentra en la materia seleccionada. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
  autor: {
    isMongoId: {
      errorMessage: "El id del autor no cuenta con un formato correcto.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        return existeEstudiante(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El autor especificado no se encuentra activo o no existe. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export const checkSchemaId = {
  id: {
    in: "params",
    isMongoId: {
      errorMessage:
        MENSAJE_ERROR_NOTA_ID,
      bail: true,
    },
    custom: {
      options: async (value) => {
        return existeNota(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              MENSAJE_ERROR_NOTA_INEXISTENTE
            );
          }

          return existe;
        });
      },
    },
  },
};

export const checkSchemaActualizarNota = {
  id: {
    ...checkSchemaId.id
  },

  titulo: {
    ...checkSchemaNota.titulo,
    optional: true,
  },

  cuerpo: {
    ...checkSchemaNota.cuerpo,
    optional: true,
  },

  carrera: {
    ...checkSchemaNota.carrera,
    custom: {
      options: async (_, { req }) => {
        if (!req.body.materia) {
          return Promise.reject(
            MENSAJE_ERROR_ACTUALIZAR_CARRERA_MATERIA
          );
        }
      }
    },
    optional: true,
  },

  materia: {
    ...checkSchemaNota.materia,
    custom: {
      options: async (_, { req }) => {
        if (!req.body.carrera) {
          return Promise.reject(
            MENSAJE_ERROR_ACTUALIZAR_MATERIA_CARRERA
          );
        }

        if (!req.body.tema) {
          return Promise.reject(
            "El tema es requerido cuando se desea actualizar la materia."
          );
        }
      },
    },
    optional: true,
  },

  tema: {
    ...checkSchemaNota.tema,
    custom: {
      options: async (_, { req }) => {
        if (!req.body.carrera) {
          return Promise.reject(
            "La carrera es requerida cuando se desea actualizar el tema."
          );
        }

        if (!req.body.materia) {
          return Promise.reject(
            "La materia es requerida cuando se desea actualizar el tema."
          );
        }
      },
    },
    optional: true,
  },
};

export const checkSchemaComentario = {
  id: {
    ...checkSchemaId.id,
  },

  usuario: {
    ...checkSchemaUsuarioEstudiante.usuario,
  },

  contenido: {
    ...checkSchemaCadena.cadena,
    isLength: {
      errorMessage:
        "El contenido del comentario debe tener al menos 20 caracteres y máximo 300.",
      options: { min: 5, max: 300 },
      bail: true
    },
    customSanitizer: {
      options: (value) => {
        const contenidoSanitizado = value.replace(/ +(?= )/g, "");

        return contenidoSanitizado;
      }
    }
  },
};
