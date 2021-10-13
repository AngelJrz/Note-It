import express from "express";
const router = express.Router();

import { obtenerCarreras }  from '../controllers/carrera.js';

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

        res.status(200).send(respuesta);
      } else {
        respuesta.exitoso = false;
        respuesta.mensaje = "No fue(ron) encontrada(s) la(s) carrera(s)";
        res.status(404).send(respuesta);
      }
    })
    .catch((error) => {
      console.error(error);
      respuesta.exitoso = false;
      respuesta.mensaje = error.message;
      respuesta.data = error;

      res.status(500).send(respuesta);
    });
});

export default router;