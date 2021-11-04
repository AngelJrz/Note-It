import Nota from '../models/Nota.js';
import { guardarImagen } from "../utilities/fileManager.js";

const IMAGEN_DEFUALT = process.env.IMAGEN_DEFUALT;

const AUTOR_POPULATE_CONFIG = {
  nombres: 1,
  apellidos: 1,
  usuario: 1,
};

const CATALOGO_POPULATE_CONFIG = {
    nombre: 1
}

const OP_NOTAS_UTILES = "1";
const OP_NOTAS_MAS_VISUALIZADAS = "2";

export async function crearNuevaNota(nuevaNota) {
    const { imagen } = nuevaNota;

    var nombreImagenCompleto = IMAGEN_DEFUALT;

    var resultadoCreacion = {
        seCreo: true,
        mensaje: "La nota fue creada exitosamente."
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

    const nota = new Nota(notaCompleta);

    return nota.save()
    .then((notaGuardada) => {
        console.log(notaGuardada);
        if(!notaGuardada) {
            resultadoCreacion.seCreo = false;
            resultadoCreacion.mensaje = "Ocurrió un error al intentar crear la nota. Intenté de nuevo."

            return resultadoCreacion;
        }
            

        return resultadoCreacion;
    })
    .catch(error => {
        console.error(error);
        resultadoCreacion.seCreo = false;
        resultadoCreacion.mensaje =
          "Ocurrió un error al intentar crear la nota. Intenté de nuevo.";
        return resultadoCreacion;
    })
}

export async function obtenerNotas(busqueda) {
  const { id, titulo, carrera, materia, tema, op } = busqueda;

    if (id) {
        return Nota.findById(id)
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
          });
    }

    var filtro = {};

    if (carrera) {
      filtro.carrera = carrera;
    }

    switch (op) {
      case OP_NOTAS_UTILES:
        filtro.esUtil = { $gt: 0 };
        return Nota.find(filtro)
          .sort("-esUtil")
          .populate("autor", AUTOR_POPULATE_CONFIG)
          .populate("carrera", CATALOGO_POPULATE_CONFIG)
          .populate("materia", CATALOGO_POPULATE_CONFIG)
          .populate("tema", CATALOGO_POPULATE_CONFIG)
          .then((notas) => {
            return notas;
          })
          .catch((err) => {
            console.error(err);

            return [];
          });
      case OP_NOTAS_MAS_VISUALIZADAS:
        filtro.visualizaciones = { $gt: 0 };
        return Nota.find(filtro)
          .sort("-visualizaciones")
          .populate("autor", AUTOR_POPULATE_CONFIG)
          .populate("carrera", CATALOGO_POPULATE_CONFIG)
          .populate("materia", CATALOGO_POPULATE_CONFIG)
          .populate("tema", CATALOGO_POPULATE_CONFIG)
          .then((notas) => {
            return notas;
          })
          .catch((err) => {
            console.error(err);

            return [];
          });
    }

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: "i" };
    }

    if (materia) {
      filtro.materia = materia;
    }

    if (tema) {
      filtro.tema = tema;
    }
    
    return Nota.find(filtro)
      .populate("autor", AUTOR_POPULATE_CONFIG)
      .populate("carrera", CATALOGO_POPULATE_CONFIG)
      .populate("materia", CATALOGO_POPULATE_CONFIG)
      .populate("tema", CATALOGO_POPULATE_CONFIG)
      .then((notas) => {
        return notas;
      })
      .catch((err) => {
        console.error(err);

        return [];
      });
}