import mongoose from "mongoose";

const { model, Schema } = mongoose;

const comentarioSchema = new Schema({
  usuario: { type: String },
  contenido: { type: String },
  fecha: { type: Date, default: Date.now }
});

const notaSchema = new Schema(
  {
    titulo: { type: String, required: true },
    cuerpo: { type: String, required: true },
    imagen: { type: String, required: true },
    esUtil: { type: Number, default: 0 },
    visualizaciones: { type: Number, default: 0 },
    carrera: { type: Schema.Types.ObjectId, ref: "Carrera" },
    materia: { type: Schema.Types.ObjectId, ref: "Materia" },
    tema: { type: Schema.Types.ObjectId, ref: "Tema" },
    autor: { type: Schema.Types.ObjectId, ref: "Estudiante" },
    comentarios: { type: [comentarioSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

comentarioSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
  }
})

notaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    returnedObject.fechaCreacion = returnedObject.createdAt;
    returnedObject.informacionAcademica = {
      carrera: returnedObject.carrera,
      materia: returnedObject.materia,
      tema: returnedObject.tema
    };

    const API_URL = process.env.API_URL;
    const NOTAS_IMAGENES_ENPOINT = process.env.NOTAS_IMAGENES_ENPOINT;

    returnedObject.imagen = `${API_URL}${NOTAS_IMAGENES_ENPOINT}${returnedObject.imagen}`

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
    delete returnedObject.carrera,
    delete returnedObject.materia,
    delete returnedObject.tema
  },
});

const Nota = model("Nota", notaSchema);
export default Nota;