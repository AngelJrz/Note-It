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

carreraSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Carrera = model("Carrera", carreraSchema)
export default Carrera