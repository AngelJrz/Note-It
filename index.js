import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4200;

const allowedOrigins = [
    'http://localhost:3000'
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

app.all("*", cors(corsOptionsDelegate), (req, res) => res.status(404).send(
    {success: false, 
    msg: "This route does not exist"}));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));