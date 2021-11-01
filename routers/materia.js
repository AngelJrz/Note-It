import express from "express";
const router = express.Router();

import { param, validationResult } from "express-validator";
import { obtenerTemas } from "../controllers/tema.js";

router.get(
  "/:id/temas",
  param("id")
    .isMongoId()
    .withMessage("El id de la carrera tiene un formato incorrecto."),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "Temas encontrados.",
      data: [],
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje =
        "Se encontaron errores al intentar obtener los temas.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    const { id } = req.params;

    obtenerTemas(id)
      .then((temas) => {
        if (temas && temas.length == 0) {
          resultado.mensaje = "No se encontaron materias para la carrera.";
        }

        resultado.data = temas;

        return res.status(200).send(resultado).end();
      })
      .catch((err) => {
        resultado.exitoso = false;
        resultado.mensaje =
          "Ocurrió un error al intentar obtener los temas.";
        resultado.data = err;

        return res.status(500).send(resultado).end();
      });
  }
);

export default router;