const ENDPOINT = "http://localhost:4200/api/carreras";

export function obtenerCarreras() {
    return fetch(ENDPOINT)
    .then(response => {
        return response.json()
    }).then(resultado => {
        const { data } = resultado
        return data;
    })
}

export async function obtenerCarrera(idCarrera) {
    return fetch(`${ENDPOINT}?idCarrera=${idCarrera}`, {
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
    return fetch(`${ENDPOINT}/${idCarrera}/materias`, {
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