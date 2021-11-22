import express from "express";
const router = express.Router();

import { validationResult, checkSchema, query } from "express-validator";

import { actualizarNota, crearNuevaNota, eliminarNota, obtenerNotas } from '../controllers/nota.js';
import { VerificarToken } from "../utilities/jsonWebToken.js";

import { checkSchemaActualizarNota, checkSchemaEliminarNota, checkSchemaNota } from "../utilities/validadorNota.js";

router.post("/",
VerificarToken,
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
          return res.status(400).send(resultado);
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


router.get(
  "/",
  [
    query("id")
      .optional()
      .isMongoId()
      .withMessage("El id de la nota tiene un formato incorrecto."),
    query("carrera")
      .optional()
      .isMongoId()
      .withMessage("El id de la carrera tiene un formato incorrecto."),
    query("materia")
      .optional()
      .isMongoId()
      .withMessage("El id de la materia tiene un formato incorrecto."),
    query("tema")
      .optional()
      .isMongoId()
      .withMessage("El id del tema tiene un formato incorrecto."),
    query("op")
      .optional()
      .isNumeric()
      .withMessage("La op no es un valor númerico."),
  ],
  async (req, res) => {
    const busqueda = req.query;

    var respuesta = {
      exitoso: true,
      mensaje: "Nota(s) encontrada(s)",
      data: null,
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      respuesta.exitoso = false;
      respuesta.mensaje =
        "Se encontaron errores al intentar obtener las notas.";
      respuesta.data = errors;
      return res.status(400).send(respuesta).end();
    }

    obtenerNotas(busqueda)
      .then((notas) => {
        if (notas && notas.length > 0) {
          respuesta.data = notas;

          return res.status(200).send(respuesta);
        } else {
          respuesta.exitoso = false;
          respuesta.mensaje = "No fue(ron) encontrada(s) la(s) nota(s)";
          return res.status(200).send(respuesta);
        }
      })
      .catch((error) => {
        console.error(error);
        respuesta.exitoso = false;
        respuesta.mensaje = error.message;
        respuesta.data = error;

        return res.status(500).send(respuesta);
      });
  }
);

router.put(
  "/:id",
  VerificarToken,
  checkSchema(checkSchemaActualizarNota),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "La nota fue actualizada exitosamente.",
      data: {},
    };

    const { errors } = validationResult(req);
    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje = "Se encontaron errores al validar la nota.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    var { id } = req.params;
    var notaAActualizar = req.body;

    notaAActualizar.id = id;

    actualizarNota(notaAActualizar)
      .then((actualizado) => {
        if (!actualizado) {
          resultado.exitoso = false;
          resultado.mensaje =
            "La nota no pudo ser actualizada. Intente más tarde.";
        }

        return res.status(200).send(resultado);
      })
      .catch((err) => {
        console.error(err);
        resultado.exitoso = false;
        resultado.mensaje =
          "Ocurrió un error en el servidor. Intenté más tarde.";

        return res.status(500).send(resultado);
      });
  }
);

router.delete("/:id", 
  VerificarToken, 
  checkSchema(checkSchemaEliminarNota), 
  async (req, res) => {
  var resultado = {
    exitoso: true,
    mensaje: "La nota fue eliminada exitosamente.",
    data: {},
  };

  const { errors } = validationResult(req);
  if (errors.length > 0) {
    resultado.exitoso = false;
    resultado.mensaje = "Se encontaron errores al validar la nota.";
    resultado.data = errors;
    return res.status(400).send(resultado).end();
  }

  const { id } = req.params;

  eliminarNota(id)
  .then((seElimino) => {
    if (!seElimino) {
      resultado.exitoso = false;
      resultado.mensaje = "La nota no pudo ser eliminada. Intente más tarde.";
    }

    return res.status(200).send(resultado);
  })
  .catch(() => {
    resultado.exitoso = false;
    resultado.mensaje = "Ocurrió un error en el servidor. Intente más tarde.";

    return res.status(500).send(resultado);
  })
})

export default router;