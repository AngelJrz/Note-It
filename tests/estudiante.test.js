import supertest from 'supertest';

import { app, server } from '../index.js';
import {
  CODIGO_VERIFICACION_DEFAULT,
  crearVerificacionDefault,
  desactivarEstudianteDefault,
  eliminarVerificaciones,
  ENDPOINT_ESTUDIANTE,
  ENDPOINT_VERIFICACION,
  ID_CARRERA_DEFAULT,
  ID_ERRONEO,
  MENSAJE_CODIGO_VERIFICACION_INCORRECTO,
  registrarEstudiantesDefault,
  USUARIO_ESTUDIANTE_1_DEFAULT,
} from "./estudianteHelper.js";
import {
  ID_FORMATO_ERRONEO,
} from "./catalogoHelper.js";

import {
  MENSAJE_REGISTRO_DEFAULT,
  MENSAJE_ERROR_INFORMACION_REGISTRO,
  MENSAJE_ERROR_CORREO,
  MENSAJE_ERROR_NOMBRE_ESTUDIANTE,
  MENSAJE_ERROR_APELLIDOS_ESTUDIANTE,
  MENSAJE_ERROR_CARRERA_INEXISTENTE,
  MENSAJE_ERROR_FORMATO_CARRERA,
  MENSAJE_CODIGO_VERIFICACION_CORRECTO,
  MENSAJE_CODIGO_VERIFICACION_EXPIRADO,
  MENSAJE_LOGIN_EXITOSO,
  MENSAJE_LOGIN_USUARIO_INEXISTENTE,
  MENSAJE_LOGIN_CONTRASEÑA_INCORRECTA,
} from "../utilities/constantes.js";
import { cerrarConexion } from '../models/conexion.js';

const api = supertest(app);

beforeAll(async () => {
  await registrarEstudiantesDefault();
})

describe("registrar ", () => {
  test("nuevo estudiante exitosamente", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "Murillo",
      usuario: "usuario_prueba",
      correo: "zs18012174@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_CARRERA_DEFAULT,
    };

    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);
    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_REGISTRO_DEFAULT);
  });

  test("nuevo estudiante con correo incorrecto", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "Murillo",
      usuario: "usuario_prueba2",
      correo: "kevin1@gmail.com",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_CARRERA_DEFAULT,
    };
    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_INFORMACION_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CORREO);
  });

  test("nuevo estudiante con usuario existente", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "Murillo",
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      correo: "zs18012174@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_CARRERA_DEFAULT,
    };
    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(
      `El usuario ${nuevoEstudiante.usuario} ya pertenece a una cuenta activa.`
    );
  });

  test("nuevo estudiante con nombre de 1 letra", async () => {
    const nuevoEstudiante = {
      nombres: "K",
      apellidos: "Murillo",
      usuario: "usuario_prueba2",
      correo: "zs16013168@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_CARRERA_DEFAULT,
    };
    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_INFORMACION_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_NOMBRE_ESTUDIANTE);
  });

  test("nuevo estudiante con apellidos de 1 letra", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "M",
      usuario: "usuario_prueba2",
      correo: "zs180121748@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_CARRERA_DEFAULT,
    };
    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_INFORMACION_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_APELLIDOS_ESTUDIANTE);
  });

  test("nuevo estudiante con carrera no existente", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "Murillo",
      usuario: "usuario_prueba",
      correo: "zs18012174@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_ERRONEO,
    };

    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_INFORMACION_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CARRERA_INEXISTENTE);
  })

  test("nuevo estudiante con id de carrera erroneo", async () => {
    const nuevoEstudiante = {
      nombres: "Kevin",
      apellidos: "Murillo",
      usuario: "usuario_prueba",
      correo: "zs18012174@estudiantes.uv.mx",
      contrasenia: "mipassword",
      biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
      carrera: ID_FORMATO_ERRONEO,
    };

    const respuesta = await api.post(ENDPOINT_ESTUDIANTE).send(nuevoEstudiante);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_INFORMACION_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_FORMATO_CARRERA);
  });
});

describe("confirmar correo ", () => {
  beforeEach(async () => {
    await crearVerificacionDefault();
    await desactivarEstudianteDefault();
  })

  test("con codigo correcto y usuario existente", async () => {
    const verificacion = {
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      codigoVerificacion: CODIGO_VERIFICACION_DEFAULT,
    };

    const respuesta = await api.post(ENDPOINT_VERIFICACION).send(verificacion);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_CODIGO_VERIFICACION_CORRECTO);
  });

  test("con codigo incorrecto y usuario existente", async () => {
    const verificacion = {
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      codigoVerificacion: 12345,
    };

    const respuesta = await api.post(ENDPOINT_VERIFICACION).send(verificacion);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_CODIGO_VERIFICACION_INCORRECTO);
  });

  test("con codigo expirado", async () => {
    await eliminarVerificaciones();

    const verificacion = {
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      codigoVerificacion: 12345,
    };

    const respuesta = await api.post(ENDPOINT_VERIFICACION).send(verificacion);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_CODIGO_VERIFICACION_EXPIRADO);
  });
});

describe("iniciar sesion ", () => {
  test.skip("con usuario existente y contraseña correcta", async () => {
    const loginInfo = {
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      contrasenia: USUARIO_ESTUDIANTE_1_DEFAULT
    };

    const respuesta = await api.post(`${ENDPOINT_ESTUDIANTE}login`).send(loginInfo);

    const { body } = respuesta;

    expect(body.resultado).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_LOGIN_EXITOSO);
    expect(body.data.estudiante.usuario).toBe(loginInfo.usuario);
  })

  test.skip("con usuario incorrecto y contraseña correcta", async () => {
    const loginInfo = {
      usuario: "usuarioIncorecto",
      contrasenia: USUARIO_ESTUDIANTE_1_DEFAULT,
    };

    const respuesta = await api
      .post(`${ENDPOINT_ESTUDIANTE}login`)
      .send(loginInfo);

    const { body } = respuesta;

    expect(body.resultado).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_LOGIN_USUARIO_INEXISTENTE);
  })

  test("con usuario correcto y contraseña incorrecta", async () => {
    const loginInfo = {
      usuario: USUARIO_ESTUDIANTE_1_DEFAULT,
      contrasenia: "contraIncorrecta",
    };

    const respuesta = await api
      .post(`${ENDPOINT_ESTUDIANTE}login`)
      .send(loginInfo);

    const { body } = respuesta;

    expect(body.resultado).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_LOGIN_CONTRASEÑA_INCORRECTA);
  })
})

afterAll(async () => {
    await cerrarConexion();
    await server.close();
})