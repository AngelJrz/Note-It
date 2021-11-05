import supertest from "supertest";
import mongoose from "mongoose";
import {
  crearNotasDefault,
  notasDefault,
  PATH_IMAGEN,
  eliminarTodasLasNotas,
  MENSAJE_NOTAS_ENCONTRADAS,
  idCarreraDefault,
  idMateriaDefault,
  idTemaDefault,
  palabraBusqueda,
  OP_NOTAS_UTILES,
  OP_NOTAS_MAS_VISUALIZADAS,
  buscarNotas,
  MENSAJE_ERROR_OBTENER_NOTAS,
} from "./notaHelper.js";

import { app, server } from "../index.js";

const api = supertest(app);

beforeEach(async () => {
  await eliminarTodasLasNotas();
  await crearNotasDefault();
});

test("registrar nota exitosamente", async () => {
    const respuesta = await api
      .post("/api/notas")
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", "6178e14bf6e1c4551f2fee5c")
      .field("materia", "6178e468f6e1c4551f2fee74")
      .field("tema", "6178e500f6e1c4551f2fee80")
      .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "idNoExiste")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "idNoExiste")
    .field("autor", "6178e0f1f6e1c4551f2fee59");

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
    .field("carrera", "6178e14bf6e1c4551f2fee5c")
    .field("materia", "6178e468f6e1c4551f2fee74")
    .field("tema", "6178e500f6e1c4551f2fee80")
    .field("autor", "idNoExiste");

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe("Se encontaron errores al validar la nota.");

  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El autor especificado no se encuentra activo o no existe. Por favor verifique la información."
  );
});

test("obtener todas las notas", async () => {
  const respuesta = await api.get("/api/notas");

  const { body } = respuesta;

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notasDefault.length);
})

test("obtener notas por carrera", async () => {
  const respuesta = await api.get(
    `/api/notas?carrera=${idCarreraDefault}`
  );

  const { body } = respuesta;

  const busqueda = { carrera: idCarreraDefault };
  const notasPorCarrera = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notasPorCarrera.length);
})

test("obtener notas por materia", async () => {
  const respuesta = await api.get(`/api/notas?carrera=${idCarreraDefault}&materia=${idMateriaDefault}`);

  const { body } = respuesta;

  const busqueda = { carrera: idCarreraDefault, materia: idMateriaDefault };
  const notaPorMateria = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notaPorMateria.length);
})

test("obtener notas por tema", async () => {
  const respuesta = await api.get(
    `/api/notas?carrera=${idCarreraDefault}&materia=${idMateriaDefault}&tema=${idTemaDefault}`
  );

  const { body } = respuesta;

  const busqueda = { carrera: idCarreraDefault, materia: idMateriaDefault, tema: idTemaDefault };
  const notaPorMateria = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notaPorMateria.length);
});

test("obtener notas que contengan cierta palabra", async () => {
  
  const respuesta = await api.get(
    `/api/notas?texto=${palabraBusqueda}`
  );

  const { body } = respuesta;
  const busqueda = { texto: palabraBusqueda };
  const notasBuscadas = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notasBuscadas.length);
})

test("obtener notas mas utiles", async () => {
  const respuesta = await api.get(`/api/notas?op=${OP_NOTAS_UTILES}`);

  const { body } = respuesta;
  const busqueda = { op: OP_NOTAS_UTILES };
  const notas = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notas.length);
})

test("obtener notas mas visualizadas", async () => {
  const respuesta = await api.get(`/api/notas?op=${OP_NOTAS_MAS_VISUALIZADAS}`);

  const { body } = respuesta;
  const busqueda = { op: OP_NOTAS_MAS_VISUALIZADAS };
  const notas = await buscarNotas(busqueda);

  expect(body.exitoso).toBe(true);
  expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
  expect(body.data.length).toBe(notas.length);
});

test("obtener notas con id carrera incorrecto", async () => {
  const respuesta = await api.get(`/api/notas?carrera=85665sasas`);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El id de la carrera tiene un formato incorrecto."
  );
})

test("obtener notas con id materia incorrecto", async () => {
  const respuesta = await api.get(`/api/notas?materia=85665sasas`);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El id de la materia tiene un formato incorrecto."
  );
});

test("obtener notas con id tema incorrecto", async () => {
  const respuesta = await api.get(`/api/notas?tema=85665sasas`);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain(
    "El id del tema tiene un formato incorrecto."
  );
});

test("obtener notas con opcion incorrecta", async () => {
  const respuesta = await api.get(`/api/notas?op=85665sasas`);

  const { body } = respuesta;

  expect(body.exitoso).toBe(false);
  expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
  const mensajes = body.data.map((error) => error.msg);

  expect(mensajes).toContain("La op no es un valor númerico.");
})

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});