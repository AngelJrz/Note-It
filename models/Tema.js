import mongoose from "mongoose";

const { model, Schema } = mongoose;

const temaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    materia: { type: Schema.Types.ObjectId, ref: "Materia" },
  },
  {
    timestamps: true,
  }
);

temaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Tema = model("Tema", temaSchema);
export default Tema;
