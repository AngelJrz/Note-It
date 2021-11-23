const API_ENDPOINT = 'http://localhost:4200'

export async function registrarEstudiante(nuevoEstudiante) {
    return fetch(`${API_ENDPOINT}/api/estudiantes`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(nuevoEstudiante)
    }).then(response => {
        return response.json();
    }).then(resultado => {
        return resultado;
    })
}

export async function validarCodigo(usuario, codigoVerificacion) {
  const verificacion = {
    usuario: usuario,
    codigoVerificacion: parseInt(codigoVerificacion),
  };

  return fetch(`${API_ENDPOINT}/api/verificacion`, {
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