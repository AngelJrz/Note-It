import express from "express";
import { validationResult, checkSchema } from "express-validator";

import { verificarCodigo, eliminarVerificacion } from "../controllers/verificacion.js";
import { activarEstudiante } from "../controllers/estudiante.js";
import { MENSAJE_CODIGO_VERIFICACION_ERROR_INFO } from "../utilities/constantes.js";
import { checkSchemaVerificacion } from "../utilities/validadorEstudiante.js";

const router = express.Router();

router.post("/", checkSchema(checkSchemaVerificacion), async (req, res) => {
  const { usuario, codigoVerificacion } = req.body;

  var respuesta = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  const { errors } = validationResult(req);

  if (errors.length > 0) {
    respuesta.exitoso = false;
    respuesta.mensaje = MENSAJE_CODIGO_VERIFICACION_ERROR_INFO;
    respuesta.data = errors;
    return res.status(400).send(respuesta).end();
  }

  verificarCodigo(usuario, codigoVerificacion)
    .then((resultado) => {
      if (resultado && resultado.correcto) {
        activarEstudiante(usuario)
          .then(async (activado) => {
            if (activado) {
              respuesta.mensaje = resultado.mensaje;

              await eliminarVerificacion(usuario, codigoVerificacion)
                .then((eliminado) => console.log("Verificación eliminada: ", eliminado))
                .catch((error) => console.error(error));
              return res.status(200).send(respuesta);
            } else {
              respuesta.exitoso = false;
              respuesta.mensaje =
                "Ocurrió un error al intentar activar la cuenta. Intente más tarde.";

              return res.status(500).send(respuesta);
            }
          })
          .catch((error) => console.erro(error));
      } else {
        respuesta.exitoso = resultado.correcto;
        respuesta.mensaje = resultado.mensaje;

        return res.status(400).send(respuesta);
      }
    })
    .catch((error) => {
      console.error(error);

      respuesta.exitoso = false;
      respuesta.mensaje =
        "Ocurrió un error al intentar validar el código. Intenté más tarde.";
      respuesta.data = error;

      return res.status(500).send(respuesta);
    });
});

router.post("/reenviar", async (req, res) => {
  const { usuario } = req.body;

  res.status(200).send({ exitoso: true})
})

export default router;