import Lista from "../models/Lista.js";
import {
  AUTOR_POPULATE_CONFIG, NOTA_LISTA_POPULATE_CONFIG,
} from "../utilities/constantes.js";
import { existeNota } from "./nota.js";

export async function obtenerListasPorEstudiante(creador) {
    if (!creador) 
        return [];

    return Lista.find({ creador })
      .populate({
          path: 'notas',
          select: NOTA_LISTA_POPULATE_CONFIG,
          populate: {
              path: 'autor',
              select: AUTOR_POPULATE_CONFIG
          }
      })
      .populate("creador", AUTOR_POPULATE_CONFIG)
      .then((listas) => {
        return listas;
      })
      .catch((err) => {
        console.error(err);

        return [];
      });
}

export async function obtenerListaPorEstudiante(idEstudiante, idLista) {
    if (!idEstudiante || !idLista) 
        return {};

    return Lista.findOne({ _id: idLista, creador: idEstudiante })
        .populate("notas")
      .populate("creador", AUTOR_POPULATE_CONFIG)
      .then((lista) => {
        return lista;
      })
      .catch((err) => {
        console.error(err);

        return [];
      });
}

export async function crearLista(lista) {
    const nuevaLista = new Lista(lista);

    var seCreoLista = true;

    return nuevaLista.save()
        .then((listaCreada) => {
            console.log(listaCreada);
            if (!listaCreada)
                seCreoLista = false;

            return seCreoLista;
        })
        .catch((err) => {
            console.error(err);

            seCreoLista = false;

            return seCreoLista;
        })
}

export async function agregarNotaALista(idLista, nota) {
    var resultadoAgreacion = {
        exitoso: true,
        mensaje: "La nota fue agregada con éxito."
    };

    const existeNotaAAgregar = await existeNota(nota);
    if (!existeNotaAAgregar) {
      resultadoAgreacion.exitoso = false;
      resultadoAgreacion.mensaje = "La nota que se intenta agregar no existe.";

      return resultadoAgreacion;
    }

    const existeNotaEnLaLista = await existeNotaEnLista(idLista, nota);

    if (existeNotaEnLaLista) {
      resultadoAgreacion.exitoso = false;
      resultadoAgreacion.mensaje =
        "La nota ya se encuentra agregada a la lista.";

      return resultadoAgreacion;
    }

    return Lista.findByIdAndUpdate(idLista, { $push: { notas: nota } }, { new: true, useFindAndModify: true })
        .then((resultado) => {
            console.log(resultado);

            if(!resultado) {
                resultadoAgreacion.exitoso = false;
                resultadoAgreacion.mensaje = "La lista especificada no existe.";
            }

            return resultadoAgreacion;
        })
        .catch((err) => {
            console.error(err);
            resultadoAgreacion.exitoso = false;
            resultadoAgreacion.mensaje = "Ocurrió un error al intentar agregar la nota a la lista. Intenté más tarde."

            return resultadoAgreacion;
        })
}

function existeNotaEnLista(idLista, nota) {
    var existe = false;

    return Lista.findOne({_id: idLista, notas: nota})
        .then((lista) => {
            if(lista) {
                existe = true;
            }
            
            return existe;
        })
        .catch((err) => {
            console.error(err);

            return existe;
        })
}