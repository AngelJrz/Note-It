import fs from 'fs';
import { Guid } from "js-guid";

const carpeta = process.cwd() + "/images/";

if (!fs.existsSync(carpeta)) {
    fs.mkdir(carpeta, null, function (err) {
      if (err) {
        console.error(err);
      }
    });
}

const guardarArchivo = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) {
        console.error(err);
        reject(false);
      }

      resolve(true);
    });
  });
}

export async function guardarImagen(imagen) {
    const { name, data } = imagen;
    const id = Guid.newGuid();

    const nombreCompleto = `${id}${name}`;
    const path = `${carpeta}/notas/${nombreCompleto}`;

    var respuesta = {
      seGuardo: false,
      nombreCompleto: ""
    }

    return guardarArchivo(path, data).then(seGuardo => {
      if (seGuardo) {
        respuesta.seGuardo = seGuardo;
        respuesta.nombreCompleto = nombreCompleto;
      }

      return respuesta;
    }).catch(err => {
      console.log(err);
    
      return respuesta;
    });
}