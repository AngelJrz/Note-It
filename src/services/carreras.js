const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_CARRERAS_ENDPOINT = process.env.REACT_APP_CARRERAS_ENDPOINT;

export async function obtenerCarreras() {
  return fetch(`${REACT_APP_API_URL}${REACT_APP_CARRERAS_ENDPOINT}`)
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
      const { data } = resultado;
      return data;
    });
}

export async function obtenerCarrera(idCarrera) {
  return fetch(`${REACT_APP_API_URL}${REACT_APP_CARRERAS_ENDPOINT}?idCarrera=${idCarrera}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((carreras) => {
      return carreras;
    });
}

export async function obtenerMaterias(idCarrera) {
  if (idCarrera) {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_CARRERAS_ENDPOINT}/${idCarrera}/materias`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        const { data } = resultado;
        return data;
      });
  }
}
