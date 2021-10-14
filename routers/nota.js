import express from "express";
const router = express.Router();

import { crearNuevaNota } from '../controllers/nota.js';
import { guardarImagen } from "../utilities/fileManager.js";

router.post("/", async (req, res) => {
    const { imagen } = req.files;
    
    guardarImagen(imagen).then(seGuardo => {

        console.log(seGuardo);
        res.send({ mensaje: "Recibido" });
    })
    .catch(err => {
        console.error(err)
        res.send({ mensaje: "Recibido pero falló" });
    })
    // const nuevaNota = req.body;

    // console.log(nuevaNota);

    // var resultado = {
    //     exitoso: true,
    //     mensaje: "",
    //     data: null
    // }

    // crearNuevaNota(nuevaNota)
    // .then(creada => {
    //     if(creada) {
    //         resultado.mensaje = "La nota fue creada exitosamente."
    //         res.status(200).send(resultado);
    //     }
    //     else {
    //         resultado.exitoso = false;
    //         resultado.mensaje = "La nota no pudo ser creada. Intenté de nuevo.";
    //         res.status(400).send(resultado);
    //     }
    // })
    // .catch(error => {
    //     console.error(error)

    //     resultado.exitoso = false;
    //     resultado.mensaje = "Ocurrió un error al intentar crear la nota. Intente más tarde."
    //     resultado.data = error;

    //     res.status(500).send(resultado);
    // })
})

export default router;