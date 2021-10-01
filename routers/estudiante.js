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

router.get('/estudiantes', async (req, res) => {
    await estudiantesCollection.find({})
    .then(estudiantes => {
        res.send(estudiantes);
    })
    .catch( error => {
        res.status(500).send(error.message);
    })
});

export default router;