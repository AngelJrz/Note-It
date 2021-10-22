import express from "express";
const router = express.Router();

import { validationResult, checkSchema } from "express-validator";

import { crearNuevaNota } from '../controllers/nota.js';

import checkSchemaNota from "../utilities/validadorNota.js";

router.post("/", 
checkSchema(checkSchemaNota),
async (req, res) => {

  const { errors } = validationResult(req);

  var resultado = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  if (errors.length > 0) {
    resultado.exitoso = false;
    resultado.mensaje = "Se encontaron errores al validar la nota.";
    resultado.data = errors;
    return res.status(400).send(resultado).end();
  }

  var nuevaNota = req.body;

  if(req.files && req.files.imagen) {
    nuevaNota.imagen = req.files.imagen;
  }

    var resultado = {
        exitoso: true,
        mensaje: "",
        data: null
    }

    crearNuevaNota(nuevaNota)
    .then(resultadoCreacion => {
        if (resultadoCreacion.seCreo) {
          resultado.mensaje = resultadoCreacion.mensaje;
          return res.status(200).send(resultado);
        } else {
          resultado.exitoso = false;
          resultado.mensaje = resultadoCreacion.mensaje;
          res.status(400).send(resultado);
        }
    })
    .catch(error => {
        console.error(error)

        resultado.exitoso = false;
        resultado.mensaje = "Ocurrió un error al intentar crear la nota. Intente más tarde."
        resultado.data = error;

        return res.status(500).send(resultado);
    })
})

export default router;