import { Guid } from "js-guid";

import Nota from '../models/Nota.js';
import { guardarImagen } from "../utilities/fileManager.js";

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

    const id = Guid.newGuid();

    const notaCompleta = {
        id: id,
        titulo: nuevaNota.titulo,
        cuerpo: nuevaNota.cuerpo,
        imagen: rutaImagen,
        informacionAcademica: {
            carrera: nuevaNota.carrera,
            materia: nuevaNota.materia,
            tema: nuevaNota.tema
        },
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