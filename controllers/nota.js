import Nota from '../models/Nota.js';
import { guardarImagen } from "../utilities/fileManager.js";
import {
  AUTOR_POPULATE_CONFIG,
  CATALOGO_POPULATE_CONFIG,
  OP_NOTAS_UTILES,
  OP_NOTAS_MAS_VISUALIZADAS,
  OK_STATUS,
  ACTUALIZAR_CONFIG,
} from "../utilities/constantes.js";
import { cerrarConexion, abrirConexion } from '../models/conexion.js';

const IMAGEN_DEFUALT = process.env.IMAGEN_DEFUALT;

export async function crearNuevaNota(nuevaNota) {
    const { imagen } = nuevaNota;

    var nombreImagenCompleto = IMAGEN_DEFUALT;

    var resultadoCreacion = {
        seCreo: true,
        mensaje: "La nota fue creada exitosamente.",
        notaCreada: null
    }

    if (imagen) {
        const resultadoGuardo = await guardarImagen(imagen)
          .then((resultado) => {
            return resultado;
          })
          .catch((err) => {
            console.error(err);
            return err;
          });

        if(!resultadoGuardo.seGuardo) {
            resultadoCreacion.seCreo = false;
            resultadoCreacion.mensaje = "Ocurrió un error al intentar guardar la imagen. Intenté de nuevo.";

            return resultadoCreacion;
        }

        nombreImagenCompleto = resultadoGuardo.nombreCompleto;
    }

    const notaCompleta = {
        titulo: nuevaNota.titulo,
        cuerpo: nuevaNota.cuerpo,
        imagen: nombreImagenCompleto,
        carrera: nuevaNota.carrera,
        materia: nuevaNota.materia,
        tema: nuevaNota.tema,
        autor: nuevaNota.autor
    }

    await abrirConexion();

    const nota = new Nota(notaCompleta);

    return nota
      .save()
      .then((notaGuardada) => {
        console.log(notaGuardada);
        if (!notaGuardada) {
          resultadoCreacion.seCreo = false;
          resultadoCreacion.mensaje =
            "Ocurrió un error al intentar crear la nota. Intenté de nuevo.";

          return resultadoCreacion;
        }
        
        resultadoCreacion.notaCreada = notaGuardada;

        return resultadoCreacion;
      })
      .catch((error) => {
        console.error(error);
        resultadoCreacion.seCreo = false;
        resultadoCreacion.mensaje =
          "Ocurrió un error al intentar crear la nota. Intenté de nuevo.";
        return resultadoCreacion;
      })
      .finally(async () => {
        await cerrarConexion();
      });
}

export async function obtenerNotas(busqueda) {
  const { id, texto, carrera, materia, tema, op, limit = "0" } = busqueda;

  await abrirConexion();

    if (id) {
        console.log("Búsqueda por ID");
        return await Nota.findById(id)
          .populate("autor", AUTOR_POPULATE_CONFIG)
          .populate("carrera", CATALOGO_POPULATE_CONFIG)
          .populate("materia", CATALOGO_POPULATE_CONFIG)
          .populate("tema", CATALOGO_POPULATE_CONFIG)
          .then((nota) => {
            return [nota];
          })
          .catch((err) => {
            console.error(err);

            return [];
          })
    }

    var filtro = {};

    if (carrera) {
      filtro.carrera = carrera;
    }

    if (texto) {
      filtro.$or = [
        { titulo: { $regex: texto, $options: "i" } },
        { cuerpo: { $regex: texto, $options: "i" } },
      ];
    }

    if (materia) {
      filtro.materia = materia;
    }

    if (tema) {
      filtro.tema = tema;
    }

    switch (op) {
      case OP_NOTAS_UTILES:
        console.log("Búsqueda por Notas utiles: ", filtro);
        filtro.esUtil = { $gt: 0 };
        return await Nota.find(filtro)
          .sort("-esUtil")
          .populate("autor", AUTOR_POPULATE_CONFIG)
          .populate("carrera", CATALOGO_POPULATE_CONFIG)
          .populate("materia", CATALOGO_POPULATE_CONFIG)
          .populate("tema", CATALOGO_POPULATE_CONFIG)
          .limit(parseInt(limit))
          .then((notas) => {
            return notas;
          })
          .catch((err) => {
            console.error(err);

            return [];
          })
      case OP_NOTAS_MAS_VISUALIZADAS:
        console.log("Búsqueda por Notas más visualizadas: ", filtro);
        filtro.visualizaciones = { $gt: 0 };
        return await Nota.find(filtro)
          .sort("-visualizaciones")
          .populate("autor", AUTOR_POPULATE_CONFIG)
          .populate("carrera", CATALOGO_POPULATE_CONFIG)
          .populate("materia", CATALOGO_POPULATE_CONFIG)
          .populate("tema", CATALOGO_POPULATE_CONFIG)
          .limit(parseInt(limit))
          .then((notas) => {
            return notas;
          })
          .catch((err) => {
            console.error(err);

            return [];
          })
    }
    
    console.log("Búsqueda: ", filtro);
    return await Nota.find(filtro)
      .sort("-createdAt")
      .populate("autor", AUTOR_POPULATE_CONFIG)
      .populate("carrera", CATALOGO_POPULATE_CONFIG)
      .populate("materia", CATALOGO_POPULATE_CONFIG)
      .populate("tema", CATALOGO_POPULATE_CONFIG)
      .limit(parseInt(limit))
      .then((notas) => {
        return notas;
      })
      .catch((err) => {
        console.error(err);

        return [];
      })
}

export async function existeNota(id) {
  var existe = true;

  await abrirConexion();

  return Nota.findById(id)
    .then((nota) => {
      if (!nota) {
        existe = false;
      }

      return existe;
    })
    .catch((err) => {
      console.error(err);

      existe = false;

      return existe;
    })
}

export async function actualizarNota(notaAActualizar) {
  var queryDeActualizacion = {};

  if (notaAActualizar.titulo) {
    queryDeActualizacion.titulo = notaAActualizar.titulo;
  }

  if (notaAActualizar.cuerpo) {
    queryDeActualizacion.cuerpo = notaAActualizar.cuerpo;
  }

  if (notaAActualizar.carrera) {
    queryDeActualizacion.carrera = notaAActualizar.carrera;
  }

  if (notaAActualizar.materia) {
    queryDeActualizacion.materia = notaAActualizar.materia;
  }

  if (notaAActualizar.tema) {
    queryDeActualizacion.tema = notaAActualizar.tema;
  }
  
  var seActualizo = true;

  await abrirConexion();

  return Nota.findByIdAndUpdate(
    notaAActualizar.id,
    queryDeActualizacion,
    ACTUALIZAR_CONFIG
  )
    .then((resultado) => {
      if (resultado.ok !== OK_STATUS) {
        seActualizo = false;
      }

      return seActualizo;
    })
    .catch((err) => {
      console.error(err);

      seActualizo = false;

      return seActualizo;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function eliminarNota(id) {
  var seElimino = true;

  await abrirConexion();

  return Nota.findByIdAndDelete(id, { rawResult: true })
    .then((resultado) => {
      if (resultado.value === null || resultado.ok !== OK_STATUS) {
        seElimino = false;
      }

      return seElimino;
    })
    .catch((err) => {
      console.error(err);

      seElimino = false;

      return seElimino;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function agregarComentario(id, comentario) {
  await abrirConexion();

  var comentarioAgregado = true;

  return Nota.findByIdAndUpdate(
    id,
    { $push: { comentarios: comentario } },
    { new: true, useFindAndModify: true }
  )
    .then((resultado) => {

      if (!resultado) {
        comentarioAgregado = false;
      }

      return comentarioAgregado;
    })
    .catch((err) => {
      console.error(err);

      comentarioAgregado = false;

      return comentarioAgregado;
    })
    .finally(async () => {
      await cerrarConexion();
    });
}

export async function agregarVisualizacion(id) {
  await abrirConexion();

  const INCREMENTO_VISUALIZACION = 1;
  var visualizacionAgregada = true;

  return Nota.findByIdAndUpdate(
    id,
    { $inc: { visualizaciones: INCREMENTO_VISUALIZACION } },
    { new: true, useFindAndModify: true }
  )
    .then((resultado) => {
      if (!resultado) {
        visualizacionAgregada = false;
      }

      return visualizacionAgregada;
    })
    .catch((err) => {
      console.error(err);

      visualizacionAgregada = false;

      return visualizacionAgregada;
    })
}