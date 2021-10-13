import { useState, useEffect } from "react";
import { obtenerCarreras } from "../services/carreras.js";

export function useCarreras() {
  const [carreras, setCarreras] = useState([]);

  useEffect(function () {
    obtenerCarreras().then((carreras) => {
      setCarreras(carreras);
    })
    .catch(error => {
      console.error(error);
      setCarreras([])
    });
  }, []);

  return { carreras };
}
