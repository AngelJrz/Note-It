import mongoose from "mongoose";

const { model, Schema } = mongoose;

const listaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    creador: { type: Schema.Types.ObjectId, ref: "Estudiante" },
    notas: { type: [Schema.Types.ObjectId], ref: "Nota" },
  },
  {
    timestamps: true,
  }
);

listaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    returnedObject.fechaCreacion = returnedObject.createdAt;

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Lista = model("Lista", listaSchema);
export default Lista;