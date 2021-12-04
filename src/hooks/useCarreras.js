import { useState, useEffect } from "react";
import { obtenerCarreras } from "../services/carreras.js";

export function useCarreras(cargar = true) {
  const [carreras, setCarreras] = useState([]);

  useEffect(function () {

    if (cargar) {
      obtenerCarreras()
        .then((carreras) => {
          setCarreras(carreras);
        })
        .catch((error) => {
          console.error(error);
          setCarreras([]);
        });
    }
    
  }, [cargar]);

  return { carreras };
}