const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_MATERIAS_ENDPOINT = process.env.REACT_APP_MATERIAS_ENDPOINT;

export async function obtenerTemas(idMateria) {
  if (idMateria) {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_MATERIAS_ENDPOINT}/${idMateria}/temas`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        const { data } = resultado;
        return data;
      })
      .catch((err) => {
        return [];
      });
  }
}
