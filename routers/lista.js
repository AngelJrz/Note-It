import express from "express";
import { validationResult, checkSchema, param } from "express-validator";
import { agregarNotaALista } from "../controllers/lista.js";
import { VerificarToken } from "../utilities/jsonWebToken.js";

const router = express.Router();


router.post(
  "/:id/notas",
  VerificarToken,
  checkSchema({
    id: {
      in: "params",
      isMongoId: {
        errorMessage:
          "El id de la lista no tiene el formato correcto. Verifique la información.",
      },
    },
    nota: {
      in: "body",
      isMongoId: {
        errorMessage:
          "El id de la nota no tiene el formato correcto. Verifique la información.",
      },
    },
  }),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "La nota fue agregada a la lista.",
      data: {},
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje = "Se encontraron errores al validar la nota a agregar.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    const { id } = req.params;
    const { nota } = req.body;

    agregarNotaALista(id, nota)
        .then((resultadoAgreacion) => {
            if (!resultadoAgreacion.exitoso) {
                resultado.exitoso = false;
                resultado.mensaje = resultadoAgreacion.mensaje;

                return res.status(400).send(resultado);
            }

            return res.status(201).send(resultado);
        })
        .catch((err) => {
            console.error(err);

            resultado.exitoso = false;
            resultado.mensaje = "Ocurrió un error en el servidor al intentar agregar la nota. Intente más tarde.";

            return res.status(500).send(resultado);
        })
  }
);

export default router;