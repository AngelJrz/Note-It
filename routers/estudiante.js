import express from 'express';
const router = express.Router();
import Estudiante from "../models/Estudiante.js";
import { existeUsuario } from "../controllers/estudiante.js";

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

router.post("/", async (req, res) => {
  const {
    nombres,
    apellidos,
    usuario,
    correo,
    contrasenia,
    biografia,
    carrera,
  } = req.body;

  //vaidar información
  //Guardar en la BD
  //Mandar un correo

  var resultado = {
    exitoso: true,
    mensaje: "",
    data: null,
  };

  if (existeUsuario(usuario)) {
    resultado.exitoso = false;
    resultado.mensaje = `El usuario ${usuario} ya pertenece a una cuenta activa.`;
    res.send(resultado);
  }

  const nuevoEstudiante = new Estudiante({
    nombres: nombres,
    apellidos: apellidos,
    usuario: usuario,
    correo: correo,
    contrasenia: contrasenia,
    biografia: biografia,
    carrera: carrera,
  });

  nuevoEstudiante.save().then().catch();
});

export default router;