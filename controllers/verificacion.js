import Verificacion from "../models/Verificacion.js";

export async function crearVerificacion(usuario, codigoVerificacion) {
    const nuevaVerificacion = new Verificacion({
      usuario: usuario,
      codigo: codigoVerificacion,
    });

    return nuevaVerificacion.save()
        .then(verificacion => {
            if(verificacion)
                return true

            return false
        })
        .catch(error => {
          console.error(error);
          return false;
        })
}

export async function verificarCodigo(usuario, codigoVerificacion) {
    return Verificacion.findOne({usuario: usuario})
        .then(verificacion => {
            var resultado = {
              correcto: true,
              mensaje: "Código de verificación correcto.",
            };
            
            if (!verificacion) {
                resultado.correcto = false
                resultado.mensaje = "No se encontró un usuario para la verificación o el código de verificación ha expirado."
            }
            else if (verificacion.codigo !== codigoVerificacion) {
                resultado.correcto = false
                resultado.mensaje = "El código de verificación es incorrecto."
            }

            return resultado
        })
        .catch(error => {
          console.error(error);
          return {
            correcto: false,
            mensaje: error.message
          }
        })
}

export async function eliminarVerificacion(usuario, codigoVerificacion) {
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
    });
}