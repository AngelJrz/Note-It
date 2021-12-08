import { useState, useEffect } from "react";
import { ServicioObtenerListasDeEstudiante, ServicioObtenerLista } from "../services/listas";


export function ObtenerListasEstudiante(idEstudiante, token) {
    const [listas, setListas] = useState(null);
  
    useEffect(function () {
        ServicioObtenerListasDeEstudiante(idEstudiante, token)
        .then(listas => {
            setListas(listas);
        })
        .catch(error => {
            console.error(error);
            setListas(null)
        });
    }, []);
  
    return { listas };
  }

//   export function ObtenerLista(idEstudiante, idLista, token) {
//     const [lista, setLista] = useState(null);
  
//     useEffect(function () {
//         ServicioObtenerLista(idEstudiante, idLista, token)
//         .then(lista => {
//             setLista(lista);
//         })
//         .catch(error => {
//             console.error(error);
//             setLista(null)
//         });
//     }, []);
  
//     return { lista };
//   }