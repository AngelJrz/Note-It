import express from "express";

import { verificarCodigo, eliminarVerificacion } from "../controllers/verificacion.js";
import { activarEstudiante } from "../controllers/estudiante.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { usuario, codigoVerificacion } = req.body;

  var respuesta = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  verificarCodigo(usuario, codigoVerificacion)
    .then((resultado) => {
      if (resultado && resultado.correcto) {
        activarEstudiante(usuario)
          .then((activado) => {
            if (activado) {
              respuesta.mensaje = resultado.mensaje;

              eliminarVerificacion(usuario, codigoVerificacion)
                .then((eliminado) => console.log("Verificación eliminada: ", eliminado))
                .catch((error) => console.error(error));
              res.status(200).send(respuesta);
            } else {
              respuesta.exitoso = false;
              respuesta.mensaje =
                "Ocurrió un error al intentar activar la cuenta. Intente más tarde.";

              res.status(500).send(respuesta);
            }
          })
          .catch((error) => console.erro(error));
      } else {
        respuesta.exitoso = resultado.correcto;
        respuesta.mensaje = resultado.mensaje;

        res.status(400).send(respuesta);
      }
    })
    .catch((error) => {
      console.error(error);

      respuesta.exitoso = false;
      respuesta.mensaje =
        "Ocurrió un error al intentar validar el código. Intenté más tarde.";
      respuesta.data = error;

      res.status(500).send(respuesta);
    });
});

export default router;