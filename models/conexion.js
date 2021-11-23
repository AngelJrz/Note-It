import mongoose from "mongoose";
const DATABASE_URL = process.env.MONGODB_URL;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const CONNECTED_STATE = 1;

export async function abrirConexion() {
  if (mongoose.connection.readyState !== CONNECTED_STATE) {
    try {
      await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: USER,
        pass: PASSWORD,
      });

      console.log("Conexión establecida a la BD.");
    } catch (error) {
      console.log(err);
    }
  }
}

export async function cerrarConexion() {
  if (mongoose.connection.readyState === CONNECTED_STATE) {
    await mongoose.connection.close();
    console.log("Conexión cerrada.");
  }
}