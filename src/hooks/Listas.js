import { useState, useEffect } from "react";
import { ServicioCrearLista, ServicioAgregarNotaALista, ServicioObtenerListasDeEstudiante } from "../services/listas";

// export function CrearLista(datosLista) {
//   const [respuesta, setRespuesta] = useState([]);

//   useEffect(function () {
//     ServicioCrearLista(datosLista).then(respuesta => {
//         setRespuesta(respuesta);
//     })
//     .catch(error => {
//       console.error(error);
//       setRespuesta([])
//     });
//   }, []);

//   return { respuesta };
// }