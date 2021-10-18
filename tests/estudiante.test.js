import supertest from 'supertest';
import mongoose from 'mongoose';
import Estudiante from '../models/Estudiante.js';
import Verificacion from "../models/Verificacion.js";

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

  const mensajes = body.data.map(error => error.msg);

  expect(mensajes).toContain(
    "El correo recibido no se encuentra en el formato esperado."
  );
});

test("registrar nuevo estudiante con usuario existente", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "Murillo",
    usuario: "abizair",
    correo: "zs18012174@estudiantes.uv.mx",
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

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El nombre debe tener al menos dos caracteres."
  );
});

test("registrar nuevo estudiante con apellidos de 1 caracter", async () => {
  const nuevoEstudiante = {
    nombres: "Kevin",
    apellidos: "M",
    usuario: "usuario_prueba2",
    correo: "zs180121748@estudiantes.uv.mx",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
  };
  const respuesta = await api.post("/estudiantes").send(nuevoEstudiante);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar el estudiante.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El / Los appellido(s) debe(n) tener al menos dos caracteres."
  );
});

test("confirmar correo con codigo correcto y usuario existente", async () => {
  await Estudiante.updateOne(
    { usuario: estudianteInicial.usuario },
    {
      activo: false,
    }
  );

  const verificacionInicial = {
    usuario: estudianteInicial.usuario,
    codigo: 79135,
  };

  await Verificacion.deleteMany({});

  const nuevaVerificacion = new Verificacion(verificacionInicial);
  await nuevaVerificacion.save();

  const verificacion = {
    usuario: "abizair",
    codigoVerificacion: 79135,
  };

  const respuesta = await api.post("/api/verificacion").send(verificacion);

  const { body } = respuesta;

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe("Código de verificación correcto.");
});

test("confirmar correo con codigo incorrecto y usuario existente", async () => {
  
  const verificacionInicial = {
    usuario: estudianteInicial.usuario,
    codigo: 79135,
  };

  await Verificacion.deleteMany({});

  const nuevaVerificacion = new Verificacion(verificacionInicial);
  await nuevaVerificacion.save();

  const verificacion = {
    usuario: "abizair",
    codigoVerificacion: 123456,
  };

  const respuesta = await api.post("/api/verificacion").send(verificacion);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("El código de verificación es incorrecto.");
});

test("confirmar correo con codigo expirado", async () => {

  const verificacion = {
    usuario: "abizair",
    codigoVerificacion: 123456,
  };

  const respuesta = await api.post("/api/verificacion").send(verificacion);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(
    "No se encontró un usuario para la verificación o el código de verificación ha expirado."
  );
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
})