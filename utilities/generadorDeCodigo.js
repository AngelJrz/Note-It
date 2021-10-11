const min = 10000;
const max = 99999;

export default function generarCodigoVerificacion() {
  const codigoVerificacion = Math.floor(Math.random() * (max - min + 1)) + min;

  return codigoVerificacion
}
