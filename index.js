import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import estudianteRouter from './routers/estudiante.js';
import verificacionRouter from './routers/verificacion.js';

const app = express();
const PORT = 4200;
const DATABASE_URL = process.env.MONGODB_URL;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: USER,
    pass: PASSWORD
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(err);
    process.exit();
});

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
app.use(express.json());

app.use("/estudiantes", cors(corsOptionsDelegate), estudianteRouter);
app.use("/api/verificacion", cors(corsOptionsDelegate), verificacionRouter);

app.all("*", cors(corsOptionsDelegate), (req, res) => res.status(404).send(
    {success: false, 
    msg: "This route does not exist"}));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));