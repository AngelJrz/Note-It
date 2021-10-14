import express from 'express';
const router = express.Router();
import { validationResult, checkSchema } from "express-validator";

import Estudiante from "../models/Estudiante.js";
import { existeUsuario, registrarEstudiante } from "../controllers/estudiante.js";
import checkSchemaEstudiante from '../utilities/validadorEstudiante.js'; 
// { esEmailCorrecto } from '../utilities/validadorEstudiante.js';

router.get('/login', async (req, res) => {
    await Estudiante.findOne({ usuario: req.body.usuario })
      .then((estudiante) => {
        if (estudiante == null) {
          res
            .status(203)
            .send({
              resultado: false,
              mensaje: "El usuario no existe",
              data: null,
            });
        } else {
          if (req.body.contrasenia === estudiante.contrasenia) {
            res
              .status(200)
              .send({
                resultado: true,
                mensaje: "Login exitoso",
                data: estudiante,
              });
          } else {
            res
              .status(200)
              .send({
                resultado: false,
                mensaje: "Contraseña incorrecta",
                data: null,
              });
          }
        }
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
});

router.post("/", 
checkSchema(checkSchemaEstudiante),
async (req, res) => {
  const estudianteRecibido = req.body;

  var resultado = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  const { errors } = validationResult(req);

  if (errors.length > 0) {
    resultado.exitoso = false;
    resultado.mensaje = "Se encontaron errores al validar el estudiante.";
    resultado.data = errors;
    return res.status(400).send(resultado).end();
  }

  existeUsuario(estudianteRecibido.usuario)
    .then((existe) => {
      if (existe) {
        resultado.exitoso = false
        resultado.mensaje = `El usuario ${estudianteRecibido.usuario} ya pertenece a una cuenta activa.`
        return res.status(400).send(resultado)
      } else {
        registrarEstudiante(estudianteRecibido)
          .then(registrado => {
            if(registrado){
              resultado.mensaje = "El usuario fue registrado exitosamente."

              return res.status(200).send(resultado);
            }
            else {
              resultado.exitoso = false
              resultado.mensaje = "Ocurrió un error al registrar el usuario."

              return res.status(400).send(resultado);
            }
          })
        
      }
    })
    .catch((error) => {
      console.error(error);

      resultado.exitoso = false
      resultado.mensaje = "Ocurrió un error al registrar el usuario."
      resultado.data = error

      return res.status(500).send(resultado)
    });
});

export default router;