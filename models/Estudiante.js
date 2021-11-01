import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const estudianteSchema = new Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    usuario: { type: String, required: true },
    correo: { type: String, required: true },
    contrasenia: { type: String, required: true },
    biografia: { type: String, required: false },
    carrera: { type: Schema.Types.ObjectId, ref: "Carrera" },
    activo: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

estudianteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject.contrasenia
  }
})

const Estudiante = model("Estudiante", estudianteSchema);
export default Estudiante;