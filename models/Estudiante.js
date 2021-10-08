import mongoose from 'mongoose';

const estudianteSchema = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        nombres: {type: String, required: true},
        apellidos: {type: String, required: true},
        usuario: {type: String, required: true, unique: true},
        correo: {type: String, required: true},
        contrasenia: {type: String, required: true},
        biografia: {type: String, required: false},
        carrera: {type: String, required: true}
    }, 
    {
        timestamps: true
    }
);

const Estudiante = mongoose.model("estudiante", estudianteSchema);
export default Estudiante;