const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_NOTAS_ENDPOINT = process.env.REACT_APP_NOTAS_ENDPOINT;

export async function servicioObtenerNotas() {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.data;
    })    
}

export async function servicioObtenerNota(idNota) {
    return fetch(
      `${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}?id=${idNota}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });    
}

export async function crearNuevaNota(nota, datosEstudiante) {
    var form = new FormData();

    form.append("titulo", nota.titulo);
    form.append("cuerpo", nota.cuerpo.value);
    form.append("carrera", nota.carrera);
    form.append("materia", nota.materia);
    form.append("tema", nota.tema);
    form.append("autor", datosEstudiante.estudiante.id);

    if (nota.imagen && nota.imagen.files.length > 0) {
        form.append("imagen", nota.imagen.files[0], nota.imagen.value);
    }

    return fetch(`${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}`, {
      method: "POST",
      body: form,
      headers: {
        authorization: datosEstudiante.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        console.log(resultado);
        return resultado;
      })
      .catch((err) => {
        console.error(err);

        return {
          exitoso: false,
          mensaje:
            "Ocurrió un error al intentar conectarse al servidor. Intente más tarde.",
          data: err,
        };
      });
}

export async function servicioEliminarNota(idNota, token) {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}/${idNota}`, {
      method: "delete",
      headers: {
       'Content-Type': 'application/json',
       'authorization': token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
}

export async function buscarNotas(busqueda) {
    const { id, texto, carrera, materia, tema, op, offset, limit } = busqueda;

    var query = '';
    var tieneParametros = false;

    if (id) {
        query += `id=${id}`;
    }
    else {
        if (texto) {
            query += `texto=${texto}`;

            tieneParametros = true;
        }

        if (offset) {
          if (tieneParametros) {
            query += "&";
          }

          query += `offset=${offset}`;
          tieneParametros = true;
        }

        if (limit) {
          if (tieneParametros) {
            query += "&";
          }

          query += `limit=${limit}`;
          tieneParametros = true;
        }

        if (carrera) {
            if (tieneParametros) {
                query += '&'
            }

            query += `carrera=${carrera}`;
            tieneParametros = true;
        }

        if (materia) {
            if (tieneParametros) {
              query += "&";
            }

            query += `materia=${materia}`;
            tieneParametros = true;
        }

        if (tema) {
          if (tieneParametros) {
            query += "&";
          }

          query += `tema=${tema}`;
          tieneParametros = true;
        }

        if (op) {
          if (tieneParametros) {
            query += "&";
          }

          query += `op=${op}`;
        }
    }
    

    return fetch(`${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      }); 
}