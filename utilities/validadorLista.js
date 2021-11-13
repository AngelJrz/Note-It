import { existeEstudiante } from "../controllers/estudiante.js";

const checkSchemaLista = {
  nombre: {
    isString: true,
    isLength: {
      options: { min: 3, max: 60 },
      errorMessage:
        "El nombre de la lista debe tener al menos 3 caracteres y máximo 60 caracteres.",
    },
  },
  descripcion: {
    isString: true,
    isLength: {
      options: { min: 0, max: 60 },
      errorMessage:
        "La descripción de la lista puede tener máximo 60 caracteres.",
    },
  },
  creador: {
    in: "params",
    custom: {
      options: async (value) => {
        return existeEstudiante(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El creador especificado no se encuentra activo o no existe. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaLista;
