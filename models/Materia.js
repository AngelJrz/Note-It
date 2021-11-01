import mongoose from "mongoose";

const { model, Schema } = mongoose;

const materiaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    carrera: { type: Schema.Types.ObjectId, ref: "Carrera" },
  },
  {
    timestamps: true,
  }
);

materiaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Materia = model("Materia", materiaSchema);
export default Materia;
