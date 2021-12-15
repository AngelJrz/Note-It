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
        return data;
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
    const { id, texto, carrera, materia, tema, op, limit } = busqueda;

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
          tieneParametros = true;
        }

        if (limit) {
          if (tieneParametros) {
            query += "&";
          }

          query += `limit=${limit}`;
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
        return data;
      }); 
}

export async function actualizarNotaServicio(nota, datosEstudiante) {
  const notaAActualizar = {
    ...nota,
    cuerpo: nota.cuerpo.value
  }

  return fetch(
    `${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}/${notaAActualizar.id}`,
    {
      method: "PUT",
      headers: {
        authorization: datosEstudiante.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(notaAActualizar),
    }
  ).then((response) => {
    return response.json();
  })
  .then((resultado) => {
    return resultado;
  })
  .catch((error) => {
    console.log('error', error)
  });
}

export async function ComentarNota(idNota, comentario, token) {
    var myHeaders = new Headers();
    myHeaders.append("authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(comentario);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    return fetch(`${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}/${idNota}/comentarios`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
      return resultado;
    })
    .catch((error) => {
      console.log('error', error)
    });
}

export async function agregarVisualizacion(idNota) {
  return fetch(
    `${REACT_APP_API_URL}${REACT_APP_NOTAS_ENDPOINT}/${idNota}/visualizaciones`,
    {
      method: "POST"
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
      return resultado;
    })
}