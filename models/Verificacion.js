import mongoose from "mongoose";

const { model, Schema } = mongoose;

const verificacionSchema = new Schema(
  {
    usuario: { type: String, required: true },
    codigo: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: '30m'}
  }
);

const Verificacion = model("Verificacion", verificacionSchema);
export default Verificacion;