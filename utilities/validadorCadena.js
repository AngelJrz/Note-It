import { MENSAJE_ERROR_CADENA } from "./constantes.js";

function obtenerCadenaSinEspacios(cadena) {
    return cadena.replace(/ +(?= )/g, "");
}

export const checkSchemaCadena = {
  cadena: {
    isString: {
      errorMessage: MENSAJE_ERROR_CADENA,
      bail: true,
    },
    customSanitizer: {
      options: (value) => {
        if (value) {
          return obtenerCadenaSinEspacios(value);
        }
      },
    },
    trim: true,
  },
};