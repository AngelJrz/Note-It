import supertest from 'supertest';
import mongoose from 'mongoose';
import Estudiante from '../models/Estudiante.js';

import { app, server } from '../index.js';

const api = supertest(app);

const estudianteInicial = {
  id: "3ab8d1f7-10f5-4060-b757-096d7d868491",
  nombres: "Abizair",
  apellidos: "Suarez Martinez",
  usuario: "abizair",
  correo: "abizairsm@gmail.com",
  contrasenia: "mipassword",
  biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
  carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  activo: true,
};

beforeEach(async () => {
    await Estudiante.deleteMany({});

    const estudiante = new Estudiante(estudianteInicial);
    await estudiante.save();
})

test("registrar nuevo estudiante exitosamente", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "Murillo",
    usuario: "usuario_prueba",
    correo: "zs18012174@estudiantes.uv.mx",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe("El usuario fue registrado exitosamente.");
});

test("registrar nuevo estudiante con correo incorrecto", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "Murillo",
    usuario: "usuario_prueba2",
    correo: "kevin1@gmail.com",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar el estudiante.");
  expect(body.data[0].msg).toBe(
    "El correo recibido no se encuentra en el formato esperado."
  );
});

test("registrar nuevo estudiante con usuario existente", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "Murillo",
    usuario: "abizair",
    correo: "zs16013168@estudiantes.uv.mx",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(
    `El usuario ${nuevoEstudiante.usuario} ya pertenece a una cuenta activa.`
  )
});

test("registrar nuevo estudiante con nombre de 1 caracter", async () => {
  const nuevoEstudiante = {
    nombres: "K",
    apellidos: "Murillo",
    usuario: "usuario_prueba2",
    correo: "zs16013168@estudiantes.uv.mx",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar el estudiante.");
  expect(body.data[0].msg).toBe(
    "El nombre debe tener al menos dos caracteres."
  );
});

test("registrar nuevo estudiante con apellidos de 1 caracter", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "M",
    usuario: "usuario_prueba2",
    correo: "zs16013168@estudiantes.uv.mx",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar el estudiante.");
  expect(body.data[0].msg).toBe(
    "El / Los appellido(s) debe(n) tener al menos dos caracteres."
  );
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
})