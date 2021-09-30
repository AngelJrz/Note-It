import express from 'express';
const router = express.Router();

//METODO DE PRUEBA PARA PROBAR CONEXIÓN
router.get("/pobarConexion", async (req, res) => {
    let resultado = {
        respuesta: "Respuesta del servidor completa"
    }
    res.send(resultado)
});

export default router;