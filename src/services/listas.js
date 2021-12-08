const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_ESTUDIANTES_ENDPOINT = process.env.REACT_APP_ESTUDIANTES_ENDPOINT;
const REACT_APP_LISTAS_ENDPOINT = process.env.REACT_APP_LISTAS_ENDPOINT;

export async function ServicioCrearLista(nuevaLista, idEstudiante, token) {  
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(nuevaLista);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };
  return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}/${idEstudiante}/listas`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((resultado) => {
    return resultado
  })
  .catch((error) => {
    console.log('error', error)
  });   
}

export async function ServicioObtenerListasDeEstudiante(idEstudiante, token) {
      var myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}/${idEstudiante}/listas`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        return resultado
      })
      .catch((error) => {
        console.log('error', error)
      }); 
}

export async function ServicioObtenerLista(idEstudiante, idLista, token) {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}/${idEstudiante}/listas/${idLista}`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((resultado) => {
    return resultado
  })
  .catch((error) => {
    console.log('error', error)
  }); 
}

export async function ServicioAgregarNotaALista(nota, idLista, token) {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(nota);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  return fetch(`${REACT_APP_API_URL}${REACT_APP_LISTAS_ENDPOINT}/${idLista}/notas`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((resultado) => {
    return resultado
  })
  .catch((error) => {
    console.log('error', error)
  });     
}