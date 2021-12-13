import supertest from "supertest";
import mongoose from "mongoose";

import { app, server } from "../index.js";
import {
  CONTRASENIA_ESTUDIANTE_1_DEFAULT,
  ENDPOINT_ESTUDIANTE,
  ID_ERRONEO,
  iniciarSesion,
  MENSAJE_ERROR_TOKEN,
  registrarEstudiantesDefault,
  TOKEN_ERRONEO,
  USUARIO_ESTUDIANTE_1_DEFAULT,
} from "./estudianteHelper.js";
import {
  crearListasDefault,
  ENDPOINT_LISTAS,
  ID_LISTA_1_DEFAULT,
  listasIniciales,
  MENSAJE_ERROR_AGREGAR_NOTA,
  MENSAJE_ERROR_CREADOR,
  MENSAJE_ERROR_ID_LISTA,
  MENSAJE_ERROR_ID_NOTA,
  MENSAJE_ERROR_NOMBRE,
  MENSAJE_ERROR_NOTA_EXISTENTE,
  MENSAJE_ERROR_OBTENER,
  MENSAJE_ERROR_OBTENER_LISTA,
  MENSAJE_ERROR_VALIDACION,
  MENSAJE_LISTAS_ENCONTRADAS,
  MENSAJE_LISTA_ENCONTRADA,
  MENSAJE_LISTA_INEXISTENTE,
  MENSAJE_NOTA_AGREGADA,
  MENSAJE_REGISTRO_DEFAULT,
  NOMBRE_LARGO,
} from "./listaHelper.js";
import { crearNotasDefault, eliminarTodasLasNotas, ID_NOTA_1_DEFAULT } from "./notaHelper.js";

const api = supertest(app);

var infoLogin;

beforeAll(async () => {
  await registrarEstudiantesDefault();
  await crearListasDefault();

  infoLogin = await iniciarSesion(USUARIO_ESTUDIANTE_1_DEFAULT, CONTRASENIA_ESTUDIANTE_1_DEFAULT);
});

describe("crear lista ", () => {
    test.skip("con información correcta", async () => {
      const infoListaNueva = {
        nombre: "Lista para probar",
        descripcion: "Lista para probar primer test",
      };

      const { estudiante, token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(true);
      expect(body.mensaje).toBe(MENSAJE_REGISTRO_DEFAULT);
    });

    test.skip("sin descripcion", async () => {
      const infoListaNueva = {
        nombre: "Lista para probar sin descripción",
        descripcion: "",
      };

      const { estudiante, token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(true);
      expect(body.mensaje).toBe(MENSAJE_REGISTRO_DEFAULT);
    })

    test.skip("sin nombre", async () => {
      const infoListaNueva = {
        nombre: "",
        descripcion: "Lista sin nombre",
      };

      const { estudiante, token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDACION);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_NOMBRE);
    });

    test.skip("con nombre mayor al permitido", async () => {
      const infoListaNueva = {
        nombre: NOMBRE_LARGO,
        descripcion: "Lista con nombre largo",
      };

      const { estudiante, token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDACION);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_NOMBRE);
    });

    test.skip("sin nombre y descripcion", async () => {
      const infoListaNueva = {};

      const { estudiante, token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDACION);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_NOMBRE);
    });

    test.skip("con creador no activo o inexistente", async () => {
      const infoListaNueva = {
        nombre: "Lista con crador no activo",
        descripcion: "",
      };

      const { token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${ID_ERRONEO}/listas`)
        .set("authorization", token)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDACION);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_CREADOR);
    });

    test("sin token valido o inactivo", async () => {
      const infoListaNueva = {
        nombre: "Lista para probar",
        descripcion: "Lista para probar test",
      };

      const { estudiante } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
        .set("authorization", TOKEN_ERRONEO)
        .send(infoListaNueva);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_TOKEN);
    });
})

describe("obtener ", () => {
  test("listas creadas por estudiante activo", async () => {
    const { estudiante, token } = infoLogin.data;
    
    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_LISTAS_ENCONTRADAS);
    expect(body.data).toHaveLength(listasIniciales.length);
  })

  test("listas de estudiante no activo", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${ID_ERRONEO}/listas`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CREADOR);
  })

  test("listas con token inactivo", async () => {
    const { estudiante } = infoLogin.data;

    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas`)
      .set("authorization", TOKEN_ERRONEO);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_TOKEN);
  })

  test("lista creada por estudiante activo", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas/${ID_LISTA_1_DEFAULT}`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_LISTA_ENCONTRADA);
    expect(body.data.nombre).toBe(listasIniciales[0].nombre);
  })

  test("lista creada por estudiante inactivo", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${ID_ERRONEO}/listas/${ID_LISTA_1_DEFAULT}`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_LISTA);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CREADOR);
  });

  test("lista con token inactivo", async () => {
    const { estudiante } = infoLogin.data;

    const respuesta = await api
      .get(`${ENDPOINT_ESTUDIANTE}${estudiante._id}/listas/${ID_LISTA_1_DEFAULT}`)
      .set("authorization", TOKEN_ERRONEO);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_TOKEN);
  });
})

describe("agregar ", () => {
    beforeAll(async () => {
      await eliminarTodasLasNotas();
      await crearNotasDefault();
    })

    test.skip("nota existente a lista existente", async () => {
      const peticion = {
        nota: ID_NOTA_1_DEFAULT
      }

      const { token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(true);
      expect(body.mensaje).toBe(MENSAJE_NOTA_AGREGADA);
    })

    test.skip("nota inexistente a lista existente", async () => {
      const peticion = {
        nota: "7092e08309a76056780537dc",
      };

      const { token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe("La nota que se intenta agregar no existe.");
    })

    test.skip("nota existente a lista inexistente", async () => {
      const peticion = {
        nota: ID_NOTA_1_DEFAULT,
      };

      const { token } = infoLogin.data;
      const idInexistente = "6192e08309a76056780537df";
      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${idInexistente}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_LISTA_INEXISTENTE);
    });

    test.skip("nota con id erroneo a lista existente", async () => {
      const peticion = {
        nota: "EstoNoEsUnID",
      };

      const { token } = infoLogin.data;

      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_AGREGAR_NOTA);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_ID_NOTA);
    });

    test.skip("nota existente a lista con id erroneo", async () => {
      const peticion = {
        nota: ID_NOTA_1_DEFAULT,
      };

      const { token } = infoLogin.data;
      const idErroneo = "EstoNoEsUnId";
      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${idErroneo}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_AGREGAR_NOTA);

      const mensajes = body.data.map((error) => error.msg);

      expect(mensajes).toContain(MENSAJE_ERROR_ID_LISTA);
    });

    test.skip("nota previamente agregada en la lista", async () => {
      const peticion = {
        nota: ID_NOTA_1_DEFAULT,
      };

      const { token } = infoLogin.data;

      await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", token)
        .send(peticion);

      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", token)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_NOTA_EXISTENTE);
    });

    test("nota a lista con token inactivo", async () => {
      const peticion = {
        nota: ID_NOTA_1_DEFAULT,
      };

      const respuesta = await api
        .post(`${ENDPOINT_LISTAS}${ID_LISTA_1_DEFAULT}/notas`)
        .set("authorization", TOKEN_ERRONEO)
        .send(peticion);

      const { body } = respuesta;

      expect(body.exitoso).toBe(false);
      expect(body.mensaje).toBe(MENSAJE_ERROR_TOKEN);
    });
})

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});