import { app, server } from "../index.js";
import supertest from "supertest";
import mongoose from "mongoose";
import {
  crearNotasDefault,
  notasDefault,
  PATH_IMAGEN,
  eliminarTodasLasNotas,
  MENSAJE_NOTAS_ENCONTRADAS,
  ID_CARRERA_DEFAULT,
  ID_MATERIA_DEFAULT,
  ID_TEMA_DEFUALT,
  palabraBusqueda,
  OP_NOTAS_UTILES,
  OP_NOTAS_MAS_VISUALIZADAS,
  buscarNotas,
  MENSAJE_ERROR_OBTENER_NOTAS,
  ENDPOINT_NOTAS,
  MENSAJE_REGISTRO,
  MENSAJE_ERROR_REGISTRO,
  MENSAJE_ERROR_TITULO,
  MENSAJE_ERROR_CUERPO,
  MENSAJE_ERROR_AUTOR,
  ID_NOTA_1_DEFAULT,
  MENSAJE_COMENTARIO_AGREGADO,
  MENSAJE_COMENTARIO_ERROR_CONTENIDO,
  MENSAJE_COMENTARIO_ERRORES,
  ID_MATERIA_EXTRA,
  ID_TEMA_EXTRA,
} from "./notaHelper.js";

import {
  iniciarSesion,
  registrarEstudiantesDefault,
  USUARIO_ESTUDIANTE_1_DEFAULT,
  CONTRASENIA_ESTUDIANTE_1_DEFAULT,
  ID_ERRONEO,
  MENSAJE_ERROR_USUARIO,
  TOKEN_ERRONEO,
  MENSAJE_ERROR_TOKEN,
} from "./estudianteHelper.js";
import {
  MENSAJE_ERROR_CARRERA_INEXISTENTE,
  MENSAJE_ERROR_MATERIA_INEXISTENTE,
  MENSAJE_ERROR_TEMA_INEXISTENTE,
} from "./catalogoHelper.js";
import { MENSAJE_ERROR_ACTUALIZAR_MATERIA_CARRERA, MENSAJE_ERROR_NOTA_ID, MENSAJE_ERROR_NOTA_INEXISTENTE, MENSAJE_ERROR_VALIDAR_NOTA, MENSAJE_EXITOSO_ACTUALIZAR_NOTA, MENSAJE_NOTA_ELIMINADA } from "../utilities/constantes.js";

const api = supertest(app);

var infoLogin;

beforeAll(async () => {
  await registrarEstudiantesDefault();
  await eliminarTodasLasNotas();
  await crearNotasDefault();
});

describe("registrar ", () => {

  beforeAll(async () => {
    infoLogin = await iniciarSesion(
      USUARIO_ESTUDIANTE_1_DEFAULT,
      CONTRASENIA_ESTUDIANTE_1_DEFAULT
    );
  })

  test.skip("nota exitosamente", async () => {
    const { estudiante, token } = infoLogin.data;
    
    const respuesta = await api
      .post(ENDPOINT_NOTAS)
      .set("authorization", token)
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_REGISTRO);
  });

  test.skip("nota exitosamente sin imagen", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post(ENDPOINT_NOTAS)
      .set("authorization", token)
      .field("titulo", "Mi primera nota sin imagen")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_REGISTRO);
  });

  test.skip("nota sin titulo", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post(ENDPOINT_NOTAS)
      .set("authorization", token)
      .field("titulo", "")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_TITULO);
  });

  test.skip("nota sin cuerpo", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post(ENDPOINT_NOTAS)
      .set("authorization", token)
      .field("titulo", "Mi primera nota sin cuerpo")
      .field("cuerpo", "")
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CUERPO);
  });

  test.skip("nota con una carrera que no existe", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post(ENDPOINT_NOTAS)
      .set("authorization", token)
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_ERRONEO)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_CARRERA_INEXISTENTE);
  });

  test.skip("nota con una materia que no existe", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post("/api/notas")
      .set("authorization", token)
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_ERRONEO)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_MATERIA_INEXISTENTE);
  });

  test.skip("nota con un tema que no existe", async () => {
    const { estudiante, token } = infoLogin.data;

    const respuesta = await api
      .post("/api/notas")
      .set("authorization", token)
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_ERRONEO)
      .field("autor", String(estudiante._id));

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_TEMA_INEXISTENTE);
  });

  test("nota con un autor que no existe", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .post("/api/notas")
      .set("authorization", token)
      .attach("imagen", PATH_IMAGEN)
      .field("titulo", "Mi primera nota")
      .field(
        "cuerpo",
        "En mi primera nota quiero comentar sobre lo que me ocurrió."
      )
      .field("carrera", ID_CARRERA_DEFAULT)
      .field("materia", ID_MATERIA_DEFAULT)
      .field("tema", ID_TEMA_DEFUALT)
      .field("autor", ID_ERRONEO);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_REGISTRO);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_AUTOR);
  });
});

describe("editar ", () => {
  beforeAll(async () => {
    infoLogin = await iniciarSesion(
      USUARIO_ESTUDIANTE_1_DEFAULT,
      CONTRASENIA_ESTUDIANTE_1_DEFAULT
    );
  });

  test.skip("titulo de la nota", async () => {
    const infoNota = {
      titulo: "Nuevo titulo para prueba."
    }

    const { token } = infoLogin.data;
    
    const respuesta = await api
      .put(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}`)
      .set("authorization", token)
      .send(infoNota);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_EXITOSO_ACTUALIZAR_NOTA)
  })

  test.skip("cuerpo de la nota", async () => {
    const infoNota = {
      cuerpo: "<h1>Nuevo cuerpo</h1> <p>Esto es un nuevo cuerpo.</p>",
    };

    const { token } = infoLogin.data;

    const respuesta = await api
      .put(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}`)
      .set("authorization", token)
      .send(infoNota);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_EXITOSO_ACTUALIZAR_NOTA);
  })

  test.skip("informacion academica de nota", async () => {
    const infoNota = {
      carrera: ID_CARRERA_DEFAULT,
      materia: ID_MATERIA_EXTRA,
      tema: ID_TEMA_EXTRA
    };

    const { token } = infoLogin.data;

    const respuesta = await api
      .put(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}`)
      .set("authorization", token)
      .send(infoNota);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_EXITOSO_ACTUALIZAR_NOTA);
  })

  test.skip("informacion academica sin carrera", async () => {
    const infoNota = {
      materia: ID_MATERIA_EXTRA,
      tema: ID_TEMA_EXTRA,
    };

    const { token } = infoLogin.data;

    const respuesta = await api
      .put(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}`)
      .set("authorization", token)
      .send(infoNota);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDAR_NOTA);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_ACTUALIZAR_MATERIA_CARRERA);
  })
})

describe("eliminar ", () => {
  beforeAll(async () => {
    infoLogin = await iniciarSesion(
      USUARIO_ESTUDIANTE_1_DEFAULT,
      CONTRASENIA_ESTUDIANTE_1_DEFAULT
    );
  });

  test.skip("nota existente", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .delete(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}`)
      .set("authorization", token)

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTA_ELIMINADA);
  })

  test.skip("nota inexistente", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .delete(`${ENDPOINT_NOTAS}/${ID_ERRONEO}`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);

    expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDAR_NOTA);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_NOTA_INEXISTENTE);
  });

  test("nota con formato de id incorrecto", async () => {
    const { token } = infoLogin.data;

    const respuesta = await api
      .delete(`${ENDPOINT_NOTAS}/idFormatoIncorrecto`)
      .set("authorization", token);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);

    expect(body.mensaje).toBe(MENSAJE_ERROR_VALIDAR_NOTA);

    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_NOTA_ID);
  });
})

describe("obtener ", () => {

  test.skip("todas las notas", async () => {
    const respuesta = await api.get(ENDPOINT_NOTAS);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notasDefault.length);
  });

  test.skip("notas por carrera", async () => {
    const respuesta = await api.get(`${ENDPOINT_NOTAS}?carrera=${ID_CARRERA_DEFAULT}`);

    const { body } = respuesta;

    const busqueda = { carrera: ID_CARRERA_DEFAULT };
    const notasPorCarrera = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notasPorCarrera.length);
  });

  test.skip("obtener notas por materia", async () => {
    const respuesta = await api.get(
      `/api/notas?carrera=${ID_CARRERA_DEFAULT}&materia=${ID_MATERIA_DEFAULT}`
    );

    const { body } = respuesta;

    const busqueda = {
      carrera: ID_CARRERA_DEFAULT,
      materia: ID_MATERIA_DEFAULT,
    };
    const notaPorMateria = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notaPorMateria.length);
  });

  test.skip("obtener notas por tema", async () => {
    const respuesta = await api.get(
      `/api/notas?carrera=${ID_CARRERA_DEFAULT}&materia=${ID_MATERIA_DEFAULT}&tema=${ID_TEMA_DEFUALT}`
    );

    const { body } = respuesta;

    const busqueda = {
      carrera: ID_CARRERA_DEFAULT,
      materia: ID_MATERIA_DEFAULT,
      tema: ID_TEMA_DEFUALT,
    };
    const notaPorMateria = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notaPorMateria.length);
  });

  test.skip("notas que contengan cierta palabra", async () => {
    const respuesta = await api.get(`/api/notas?texto=${palabraBusqueda}`);

    const { body } = respuesta;
    const busqueda = { texto: palabraBusqueda };
    const notasBuscadas = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notasBuscadas.length);
  });

  test.skip("notas mas utiles", async () => {
    const respuesta = await api.get(`/api/notas?op=${OP_NOTAS_UTILES}`);

    const { body } = respuesta;
    const busqueda = { op: OP_NOTAS_UTILES };
    const notas = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notas.length);
  });

  test.skip("notas mas visualizadas", async () => {
    const respuesta = await api.get(
      `/api/notas?op=${OP_NOTAS_MAS_VISUALIZADAS}`
    );

    const { body } = respuesta;
    const busqueda = { op: OP_NOTAS_MAS_VISUALIZADAS };
    const notas = await buscarNotas(busqueda);

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_NOTAS_ENCONTRADAS);
    expect(body.data.length).toBe(notas.length);
  });

  test.skip("notas con id carrera incorrecto", async () => {
    const respuesta = await api.get(`/api/notas?carrera=85665sasas`);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(
      "El id de la carrera tiene un formato incorrecto."
    );
  });

  test.skip("notas con id materia incorrecto", async () => {
    const respuesta = await api.get(`/api/notas?materia=85665sasas`);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(
      "El id de la materia tiene un formato incorrecto."
    );
  });

  test.skip("notas con id tema incorrecto", async () => {
    const respuesta = await api.get(`/api/notas?tema=85665sasas`);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain("El id del tema tiene un formato incorrecto.");
  });

  test("notas con opcion incorrecta", async () => {
    const respuesta = await api.get(`/api/notas?op=85665sasas`);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_OBTENER_NOTAS);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain("La op no es un valor numérico.");
  });
})

describe("agregar comentario ", () => {
  beforeAll(async () => {
    infoLogin = await iniciarSesion(
      USUARIO_ESTUDIANTE_1_DEFAULT,
      CONTRASENIA_ESTUDIANTE_1_DEFAULT
    );
  });

  test.skip("con informacion correcta", async () => {
    const { estudiante, token } = infoLogin.data;

    const nuevoComentario = {
      usuario: estudiante.usuario,
      contenido: "Contenido correcto de comentario.",
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(true);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_AGREGADO);
  })

  test.skip("sin contenido", async () => {
    const { estudiante, token } = infoLogin.data;

    const nuevoComentario = {
      usuario: estudiante.usuario,
      contenido: ""
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_ERRORES);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_COMENTARIO_ERROR_CONTENIDO);
  })

  test.skip("con el tamaño del contenido menor al permitido", async () => {
    const { estudiante, token } = infoLogin.data;

    const nuevoComentario = {
      usuario: estudiante.usuario,
      contenido: "Con"
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_ERRORES);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_COMENTARIO_ERROR_CONTENIDO);
  });

  test.skip("con el tamaño del contenido mayor al permitido", async () => {
    const { estudiante, token } = infoLogin.data;

    const nuevoComentario = {
      usuario: estudiante.usuario,
      contenido:
        "Esto es un comentario de prueba que sobrepasa los caracteres permitidos para la validación. Esto es un comentario de prueba que sobrepasa los caracteres permitidos para la validación. Esto es un comentario de prueba que sobrepasa los caracteres permitidos para la validación. Esto es un comentario de prueba que sobrepasa los caracteres permitidos para la validación.",
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_ERRORES);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_COMENTARIO_ERROR_CONTENIDO);
  });

  test.skip("sin usuario", async () => {
    const { token } = infoLogin.data;

    const nuevoComentario = {
      contenido:
        "Esto es un comentario de prueba 1233.",
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_ERRORES);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_USUARIO);
  });

  test.skip("con usuario inexistente", async () => {
    const { token } = infoLogin.data;

    const nuevoComentario = {
      usuario: "usuarioNoExiste",
      contenido: "Esto es un comentario de prueba 1233.",
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", token)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_COMENTARIO_ERRORES);
    const mensajes = body.data.map((error) => error.msg);

    expect(mensajes).toContain(MENSAJE_ERROR_USUARIO);
  });

  test("con token inactivo", async () => {
    const { estudiante } = infoLogin.data;

    const nuevoComentario = {
      usuario: estudiante.usuario,
      contenido: "Esto es un comentario de prueba 1233.",
    };

    const respuesta = await api
      .post(`${ENDPOINT_NOTAS}/${ID_NOTA_1_DEFAULT}/comentarios`)
      .set("authorization", TOKEN_ERRONEO)
      .send(nuevoComentario);

    const { body } = respuesta;

    expect(body.exitoso).toBe(false);
    expect(body.mensaje).toBe(MENSAJE_ERROR_TOKEN);
  });
})

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
