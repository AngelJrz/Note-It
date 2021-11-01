import Nota from '../models/Nota.js';
import { guardarImagen } from "../utilities/fileManager.js";

const AUTOR_POPULATE_CONFIG = {
  nombres: 1,
  apellidos: 1,
  usuario: 1,
};

const CATALOGO_POPULATE_CONFIG = {
    nombre: 1
}

export async function crearNuevaNota(nuevaNota) {
    const { imagen } = nuevaNota;

    var rutaImagen = "/images/notas/dog-guitar.jpg";

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

        rutaImagen = resultadoGuardo.path;
    }

    const notaCompleta = {
        titulo: nuevaNota.titulo,
        cuerpo: nuevaNota.cuerpo,
        imagen: rutaImagen,
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
  const { id, titulo, carrera, materia, tema } = busqueda;

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

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: "i"};
    }

    if (carrera) {
      filtro.carrera = carrera;
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