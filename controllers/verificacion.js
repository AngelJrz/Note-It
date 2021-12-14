import { abrirConexion, cerrarConexion } from "../models/conexion.js";
import Verificacion from "../models/Verificacion.js";
import { MENSAJE_CODIGO_VERIFICACION_INCORRECTO } from "../tests/estudianteHelper.js";
import { MENSAJE_CODIGO_VERIFICACION_CORRECTO, MENSAJE_CODIGO_VERIFICACION_EXPIRADO } from "../utilities/constantes.js";

export async function crearVerificacion(usuario, codigoVerificacion) {
  await abrirConexion();

  const nuevaVerificacion = new Verificacion({
    usuario: usuario,
    codigo: codigoVerificacion,
  });

  return nuevaVerificacion
    .save()
    .then((verificacion) => {
      if (verificacion) return true;

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

export async function verificarCodigo(usuario, codigoVerificacion) {
  await abrirConexion();

  return Verificacion.findOne({ usuario: usuario })
    .then((verificacion) => {
      var resultado = {
        correcto: true,
        mensaje: MENSAJE_CODIGO_VERIFICACION_CORRECTO,
      };

      if (!verificacion) {
        resultado.correcto = false;
        resultado.mensaje =
          MENSAJE_CODIGO_VERIFICACION_EXPIRADO;
      } else if (verificacion.codigo !== codigoVerificacion) {
        resultado.correcto = false;
        resultado.mensaje = MENSAJE_CODIGO_VERIFICACION_INCORRECTO;
      }

      return resultado;
    })
    .catch((error) => {
      console.error(error);
      return {
        correcto: false,
        mensaje: error.message,
      };
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function eliminarVerificacion(usuario, codigoVerificacion) {
  await abrirConexion();

  return Verificacion.deleteOne({
    usuario: usuario,
    codigo: codigoVerificacion,
  })
    .then((response) => {
      return response.ok == 1;
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}