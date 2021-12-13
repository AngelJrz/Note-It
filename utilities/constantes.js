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

//MENSAJES ESTUDIANTE

export const MENSAJE_REGISTRO_DEFAULT =
  "El usuario fue registrado exitosamente.";
export const MENSAJE_ERROR_INFORMACION_REGISTRO =
  "Se encontaron errores al validar el estudiante.";
export const MENSAJE_ERROR_CORREO =
  "El correo recibido no se encuentra en el formato esperado.";
export const MENSAJE_ERROR_FORMATO_USUARIO = "El usuario no debe contener espacios."
export const MENSAJE_ERROR_NOMBRE_ESTUDIANTE =
  "El nombre debe ser de al menos 2 caracteres y máximo 80.";
export const MENSAJE_ERROR_APELLIDOS_ESTUDIANTE =
  "El / Los apellido(s) debe(n) tener al menos 2 caracteres y máximo 100.";
export const MENSAJE_CODIGO_VERIFICACION_ERROR_INFO = "Se encontraron errores al verificar la información.";
export const MENSAJE_CODIGO_VERIFICACION_CORRECTO =
  "Código de verificación correcto.";
export const MENSAJE_CODIGO_VERIFICACION_INCORRECTO =
  "El código de verificación es incorrecto.";
export const MENSAJE_CODIGO_VERIFICACION_FORMATO_INCORRECTO = "El código de verificación debe ser solo números."
export const MENSAJE_CODIGO_VERIFICACION_LARGO_INCORRECTO = "El código de verificación debe ser de 5 números.";
export const MENSAJE_CODIGO_VERIFICACION_EXPIRADO =
  "No se encontró un usuario para la verificación o el código de verificación ha expirado.";

export const MENSAJE_LOGIN_EXITOSO = "Login exitoso."
export const MENSAJE_LOGIN_USUARIO_INEXISTENTE = "El usuario no existe."
export const MENSAJE_LOGIN_CONTRASEÑA_INCORRECTA = "La contraseña es incorrecta."

//MENSAJES NOTA
export const MENSAJE_ERROR_VALIDAR_NOTA = "Se encontaron errores al validar la nota.";
export const MENSAJE_EXITOSO_ACTUALIZAR_NOTA = "La nota fue actualizada exitosamente.";
export const MENSAJE_ERROR_ACTUALIZAR_CARRERA_MATERIA =
  "La materia es requerida cuando se desea actualizar la carrera.";
export const MENSAJE_ERROR_ACTUALIZAR_MATERIA_CARRERA =
  "La carrera es requerida cuando se desea actualizar la materia.";

export const MENSAJE_NOTA_ELIMINADA = "La nota fue eliminada exitosamente.";
export const MENSAJE_ERROR_NOTA_INEXISTENTE =
  "La nota especificada no existe. Por favor verifique la información.";
export const MENSAJE_ERROR_NOTA_ID =
  "El id de la nota no tiene el formato correcto. Verifique la información.";

// MENSAJE CATALOGOS
export const MENSAJE_ERROR_CARRERA_INEXISTENTE =
  "La carrera especificada no existe. Por favor verifique la información.";
export const MENSAJE_ERROR_FORMATO_CARRERA =
  "El id de la carrera no cuenta con un formato correcto.";


export const MENSAJE_ERROR_SERVIDOR =
  "Ocurrió un error en el servidor. Por favor, intente más tade.";

export const MENSAJE_ERROR_CADENA = "El dato esperado debe ser de tipo cadena.";

export const MENSAJE_EXITO_VISUALIZACION = "Visualización agregada exitosamente.";
export const MENSAJE_ERROR_VALIDACION_VISUALIZACION =
  "Se encontraron errores al validar los datos.";

export const MENSAJE_ERROR_VISUALIZACION = "Ocurrió un error al intentar agregar la visualización.";