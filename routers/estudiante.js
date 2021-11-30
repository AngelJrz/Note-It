import express from 'express';
const router = express.Router();
import { validationResult, checkSchema, param } from "express-validator";

import { existeUsuario, registrarEstudiante, loginEstudiante, existeEstudiante, BuscarEstudiante } from "../controllers/estudiante.js";
import { checkSchemaEstudiante } from '../utilities/validadorEstudiante.js';
import { crearLista, obtenerListaPorEstudiante, obtenerListasPorEstudiante } from '../controllers/lista.js';
import checkSchemaLista from '../utilities/validadorLista.js';
import { VerificarToken } from '../utilities/jsonWebToken.js';

router.post('/login', async (req, res) => {
    loginEstudiante(req.body)
    .then(datosLogin => {
      res.send(datosLogin);
    }).catch(error => {
      res.send(
        {
          resultado: false,
          mensaje: "Error en router de estudiante: " + error.msg,
          data: null
        }
      );
    });
});

router.get('/:estudiante', async (req, res) => {
  const { estudiante } = req.params;
  BuscarEstudiante(estudiante)
  .then(infoEstudiante => {
    res.send(infoEstudiante);
  }).catch(error => {
    res.send(
      {
        resultado: false,
        mensaje: "Error en router de estudiante: " + error.msg,
        data: null
      }
    );
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

router.get(
  "/:creador/listas",
  VerificarToken,
  param("creador")
    .isMongoId()
    .withMessage("El id del estudiante tiene un formato incorrecto.")
    .bail()
    .custom(async (value) => {
      return existeEstudiante(value).then((existe) => {
        if (!existe) {
          return Promise.reject(
            "El creador especificado no se encuentra activo o no existe. Por favor verifique la información."
          );
        }

        return existe;
      });
    }),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "Listas encontradas.",
      data: [],
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje =
        "Se encontaron errores al intentar obtener las listas.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    const { creador } = req.params;

    return obtenerListasPorEstudiante(creador)
      .then((listas) => {
        if (listas && listas.length == 0) {
          resultado.exitoso = false;
          resultado.mensaje =
            "No se contraron listas creadas para el estudiante.";
        }

        resultado.data = listas;

        return res.status(200).send(resultado);
      })
      .catch((err) => {
        console.error(err);

        resultado.exitoso = false;
        resultado.mensaje =
          "Ocurrió un error en el servidor al intentar obtener las listas. Intente más tarde.";

        return res.status(500).send(resultado);
      });
  }
);

router.get(
  "/:creador/listas/:idLista",
  VerificarToken,
  param("creador")
    .isMongoId()
    .withMessage("El id del estudiante tiene un formato incorrecto.")
    .bail()
    .custom(async (value) => {
      return existeEstudiante(value).then((existe) => {
        if (!existe) {
          return Promise.reject(
            "El creador especificado no se encuentra activo o no existe. Por favor verifique la información."
          );
        }

        return existe;
      });
    }),
  param("idLista")
    .isMongoId()
    .withMessage("El id de la lista tiene un formato incorrecto."),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "Lista encontrada.",
      data: {},
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje = "Se encontaron errores al intentar obtener la lista.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    const { creador, idLista } = req.params;

    return obtenerListaPorEstudiante(creador, idLista)
      .then((lista) => {
        if (!lista) {
          resultado.exitoso = false;
          resultado.mensaje =
            "No se encontró la lista creada para el estudiante.";
        }

        resultado.data = lista;

        return res.status(200).send(resultado);
      })
      .catch((err) => {
        console.error(err);

        resultado.exitoso = false;
        resultado.mensaje =
          "Ocurrió un error en el servidor al intentar obtener la lista. Intente más tarde.";

        return res.status(500).send(resultado);
      });
  }
);

router.post(
  "/:creador/listas",
  VerificarToken,
  checkSchema(checkSchemaLista),
  async (req, res) => {
    var resultado = {
      exitoso: true,
      mensaje: "Lista creada exitosamente.",
      data: {},
    };

    const { errors } = validationResult(req);

    if (errors.length > 0) {
      resultado.exitoso = false;
      resultado.mensaje = "Se encontaron errores al intentar crear la lista.";
      resultado.data = errors;
      return res.status(400).send(resultado).end();
    }

    var listaRecibida = req.body;
    const { creador } = req.params;

    listaRecibida.creador = creador;

    return crearLista(listaRecibida)
      .then((seCreo) => {
        if (!seCreo) {
          resultado.exitoso = false;
          resultado.mensaje = "La lista no pudo ser creada. Intente más tarde.";

          return res.status(409).send(resultado);
        }

        return res.status(201).send(resultado);
      })
      .catch((err) => {
        console.error(err);

        resultado.exitoso = false;
        resultado.mensaje = "Ocurrió un error en el servidor al intentar crear la lista. Intente más tarde."

        return res.status(500).send(resultado);
      })
  }
);

export default router;