import express from 'express';
const router = express.Router();
import estudiantesCollection from '../Acceso a datos/ModeloEstudiante.js';

//METODO DE PRUEBA PARA PROBAR CONEXIÓN
router.get("/pobarConexion", async (req, res) => {
    let resultado = {
        respuesta: "Respuesta del servidor completa"
    }
    res.send(resultado)
});

router.get('/login', async (req, res) => {
    await estudiantesCollection.findOne({usuario: req.body.usuario})
    .then(estudiante => {
        if (estudiante == null) {
            res.status(500).send({resultado: false, mensaje: "El usuario no existe", data: null});
        }else{
            if (req.body.contrasenia === estudiante.contrasenia) {
                res.status(200).send({resultado: true, mensaje: "Login exitoso", data: estudiante});
            } else {
                res.status(200).send({resultado: false, mensaje: "Contraseña incorrecta", data: null});
            }
        }
    })
    .catch( error => {
        res.status(500).send(error.message);
    })
});

export default router;