const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_ESTUDIANTES_ENDPOINT = process.env.REACT_APP_ESTUDIANTES_ENDPOINT;
const REACT_APP_VERIFICACION_ENDPOINT = process.env.REACT_APP_VERIFICACION_ENDPOINT;

export async function registrarEstudiante(nuevoEstudiante) {
  return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(nuevoEstudiante),
  })
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
      return resultado;
    });
}

export async function validarCodigo(usuario, codigoVerificacion) {
  const verificacion = {
    usuario: usuario,
    codigoVerificacion: parseInt(codigoVerificacion),
  };

  return fetch(`${REACT_APP_API_URL}${REACT_APP_VERIFICACION_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(verificacion),
  })
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
      return resultado;
    });
}
