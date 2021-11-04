const ENDPOINT = "http://localhost:4200/api/materias";

export async function obtenerTemas(idMateria) {
  if (idMateria) {
    return fetch(`${ENDPOINT}/${idMateria}/temas`, {
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
