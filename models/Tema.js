import mongoose from "mongoose";

const { model, Schema } = mongoose;

const temaSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    materia: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tema = model("tema", temaSchema);
export default Tema;
