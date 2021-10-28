import express from "express";
const router = express.Router();

import { param, validationResult } from "express-validator";

import { obtenerCarreras }  from '../controllers/carrera.js';
import { obtenerMaterias } from "../controllers/materia.js";

router.get("/", async (req, res) => {
  const { idCarrera } = req.query || "";

  var respuesta = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  obtenerCarreras(idCarrera)
    .then((carreras) => {
      if (carreras && carreras.length > 0) {
        respuesta.mensaje = "Carrera(s) encontrada(s)";
        respuesta.data = carreras;

        return res.status(200).send(respuesta);
      } else {
        respuesta.exitoso = false;
        respuesta.mensaje = "No fue(ron) encontrada(s) la(s) carrera(s)";
        return res.status(404).send(respuesta);
      }
    })
    .catch((error) => {
      console.error(error);
      respuesta.exitoso = false;
      respuesta.mensaje = error.message;
      respuesta.data = error;

      return res.status(500).send(respuesta);
    });
});

router.get("/:id/materias", 
param('id')
  .isMongoId()
  .withMessage("El id de la carrera tiene un formato incorrecto."), 
async (req, res) => {
  
  var resultado = {
    exitoso: true,
    mensaje: "Materias encontradas.",
    data: [],
  };

  const { errors } = validationResult(req);
  
  if (errors.length > 0) {
    resultado.exitoso = false;
    resultado.mensaje = "Se encontaron errores al intentar obtener las materias.";
    resultado.data = errors;
    return res.status(400).send(resultado).end();
  }

  const { id } = req.params;

  obtenerMaterias(id)
  .then((materias) => {
    if(materias && materias.length == 0) {
      resultado.mensaje = "No se encontaron materias para la carrera.";
    }

    resultado.data = materias;

    return res.status(200).send(resultado).end();
  })
  .catch((err) => {
    resultado.exitoso = false;
    resultado.mensaje = "Ocurrió un error al intentar obtener las materias.";
    resultado.data = err;

    return res.status(500).send(resultado).end();
  })
})

export default router;