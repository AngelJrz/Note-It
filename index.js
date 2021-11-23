import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import fileUpload from 'express-fileupload';

import estudianteRouter from './routers/estudiante.js';
import verificacionRouter from './routers/verificacion.js';
import carreraRouter from './routers/carrera.js';
import notaRouter from './routers/nota.js';
import materiaRouter from './routers/materia.js';
import listaRouter from './routers/lista.js';

const app = express();
const PORT = process.env.PORT || 4200;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4201'
]

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    }
    else {
        corsOptions = { origin: false }
    }

    callback(null, corsOptions)
}

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.json());
app.use('/api/notas/imagenes', express.static("images/notas"))

app.use("/api/estudiantes", cors(corsOptionsDelegate), estudianteRouter);
app.use("/api/verificacion", cors(corsOptionsDelegate), verificacionRouter);
app.use("/api/carreras", cors(corsOptionsDelegate), carreraRouter);
app.use("/api/notas", cors(corsOptionsDelegate), notaRouter);
app.use("/api/materias", cors(corsOptionsDelegate), materiaRouter);
app.use("/api/listas", cors(corsOptionsDelegate), listaRouter);

app.all("*", cors(corsOptionsDelegate), (req, res) => res.status(404).send(
    {exitoso: false, 
    mensaje: "Esta ruta no existe. Verifique la URL.",
    data: null
}));

const server = app.listen(PORT, () => console.log(`Server running in port ${PORT}`));

export { app, server };