import mongoose from "mongoose";

const { model, Schema } = mongoose;

const materiaSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    carrera: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Materia = model("materia", materiaSchema);
export default Materia;
