import mongoose from "mongoose";

const { model, Schema} = mongoose

const carreraSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Carrera = model("carrera", carreraSchema)
export default Carrera