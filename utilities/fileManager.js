import fs from 'fs';

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

    const path = `${carpeta}/notas/${name}`;

    guardarArchivo(path, data).then(seGuardo => {
      return seGuardo;
    }).catch(err => {
      console.log(err);

      return err;
    });
}