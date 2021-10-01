import mongoose from 'mongoose';

const EstudianteSchema = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        nombres: {type: String, required: true},
        apellidos: {type: String, required: true},
        usuario: {type: String, required: true},
        correo: {type: String, required: true},
        contrasenia: {type: String, required: true},
        biografia: {type: String, required: false},
        carrera: {type: String, required: true}
    }, 
    {
        timestamps: true
    }
);

const estudiantesCollection = mongoose.model("estudiantes", EstudianteSchema);
export default estudiantesCollection;