import mongoose from "mongoose";

const { model, Schema, SchemaTypes } = mongoose;

const comentarioSchema = new Schema({
  id: { type: String },
  usuario: { type: String },
  contenido: { type: String },
  fecha: { type: Date, default: Date.now }
});

const notaSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    cuerpo: { type: String, required: true },
    imagen: { type: String, required: true },
    esUtil: { type: Number, default: 0 },
    visualizaciones: { type: Number, default: 0 },
    informacionAcademica: { type: SchemaTypes.Mixed, required: true},
    autor: { type: String, required: true},
    comentarios: { type: [comentarioSchema], default: [] }
  },
  {
    timestamps: true,
  }
);

const Nota = model("notas", notaSchema);
export default Nota;