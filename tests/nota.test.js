import supertest from "supertest";
import mongoose from "mongoose";

import { app, server } from "../index.js";

const api = supertest(app);

const PATH_IMAGEN = "D:/imagenes dummies/worry-dog.jpg";

test("registrar nota exitosamente", async () => {
    const respuesta = await api
      .post("/api/notas")
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
      .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
      .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
      .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

    const { body } = respuesta;
    
    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe("La nota fue creada exitosamente.");
})

test("registrar nota exitosamente sin imagen", async () => {
  const respuesta = await api
    .post("/api/notas")
    .field("titulo", "Mi primera nota sin imagen")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe("La nota fue creada exitosamente.");
});

test("registrar nota sin titulo", async () => {
  const respuesta = await api
    .post("/api/notas")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El título de la nota debe tener al menos 5 caracteres y máximo 50 caracteres."
  );
});

test("registrar nota sin cuerpo", async () => {
  const respuesta = await api
    .post("/api/notas")
    .field("titulo", "Mi primera nota sin cuerpo")
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El cuerpo de la nota debe tener al menos 10 caracteres y máximo 1000"
  );
});

test("registrar nota con una carrera que no existe", async () => {
  const respuesta = await api
    .post("/api/notas")
    .attach("imagen", PATH_IMAGEN)
    .field("titulo", "Mi primera nota")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "idNoExistente")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "La carrera especificada no existe. Por favor verifique la información."
  );
});

test("registrar nota con una materia que no existe", async () => {
  const respuesta = await api
    .post("/api/notas")
    .attach("imagen", PATH_IMAGEN)
    .field("titulo", "Mi primera nota")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "materiaNoExiste")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "La materia especificada no se encuentra en la carrera seleccionada. Por favor verifique la información."
  );
});

test("registrar nota con un tema que no existe", async () => {
  const respuesta = await api
    .post("/api/notas")
    .attach("imagen", PATH_IMAGEN)
    .field("titulo", "Mi primera nota")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "temaNoExiste")
    .field("autor", "3ab8d1f7-10f5-4060-b757-096d7d868491");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El tema especificado no se encuentra en la materia seleccionada. Por favor verifique la información."
  );
});

test("registrar nota con un autor que no existe", async () => {
  const respuesta = await api
    .post("/api/notas")
    .attach("imagen", PATH_IMAGEN)
    .field("titulo", "Mi primera nota")
    .field(
      "cuerpo",
      "En mi primera nota quiero comentar sobre lo que me ocurrió."
    )
    .field("carrera", "2ae97db8-5daa-43ac-8460-c5ebbde3dead")
    .field("materia", "47135244-8d68-4702-b827-b375f2b89ced")
    .field("tema", "6e12d56b-eb40-4fb5-9465-350342cc4855")
    .field("autor", "noExiste");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El autor especificado no se encuentra activo o no existe. Por favor verifique la información."
  );
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});