export const RETURNED_ESTUDIANTE_LOGIN_INFO = {
  nombres: 1,
  apellidos : 1,
  usuario: 1,
  contrasenia: 1
}

export const AUTOR_POPULATE_CONFIG = {
  nombres: 1,
  apellidos: 1,
  usuario: 1,
  biografia: 1
};

export const CATALOGO_POPULATE_CONFIG = {
  nombre: 1,
};

export const NOTA_LISTA_POPULATE_CONFIG = {
  titulo: 1,
  cuerpo: 1,
  autor: 1,
  imagen: 1,
  esUtil: 1,
  visualizaciones: 1
}

export const ACTUALIZAR_CONFIG = { rawResult: true, useFindAndModify: false };

export const OP_NOTAS_UTILES = "1";
export const OP_NOTAS_MAS_VISUALIZADAS = "2";
export const OK_STATUS = 1;

export const MENSAJE_ERROR_CADENA = "El dato esperado debe ser de tipo cadena.";
export const MENSAJE_ERROR_NOMBRE_ESTUDIANTE =
  "El nombre debe ser de al menos 2 caracteres y máximo 80.";

export const MENSAJE_ERROR_APELLIDOS_ESTUDIANTE =
  "El / Los appellido(s) debe(n) tener al menos 2 caracteres y máximo 100.";
