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

  return fetch("http://localhost:4200/api/estudiantes/619987ea5062950c40fceafa/listas", requestOptions)
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

// export async function ServicioObtenerListasDeEstudiante(idEstudiante, token) {
//     return fetch(
//       `${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}${idEstudiante}/listas`,
//       {
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         authorization: token
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         return data.data;
//       });    
// }

// export async function ServicioObtenerLista(idEstudiante, idLista, token) {
//   return fetch(
//     `${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}${idEstudiante}/listas${idLista}`,
//     {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       authorization: token
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       return data.data;
//     });    
// }

// export async function ServicioAgregarNotaALista(idNota, idLista, token) {
//     var form = new FormData();
//     form.append("nota", idNota);

//     return fetch(
//       `${REACT_APP_API_URL}${REACT_APP_LISTAS_ENDPOINT}/${idLista}/notas`,
//       {
//         method: "post",
//         body: form,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         authorization: token
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         return data.data;
//       });    
// }