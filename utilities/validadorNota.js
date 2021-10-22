import { existeCarrera } from "../controllers/carrera.js";
import { existeEstudiante, existeUsuario } from "../controllers/estudiante.js";
import { existeMateria } from "../controllers/materia.js";
import { existeTema } from "../controllers/tema.js";

const checkSchemaNota = {
  titulo: {
    isString: true,
    isLength: {
      errorMessage:
        "El título de la nota debe tener al menos 5 caracteres y máximo 50 caracteres.",
      options: { min: 5, max: 50 },
    },
  },
  cuerpo: {
    isLength: {
      errorMessage:
        "El cuerpo de la nota debe tener al menos 10 caracteres y máximo 1000",
      options: { min: 10, max: 1000 },
    },
  },
  carrera: {
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

export default checkSchemaNota;
