import { useState, useEffect } from "react";
import { ServicioObtenerListasDeEstudiante } from "../services/listas";


export function ObtenerListasEstudiante(idEstudiante, token) {
  const [listas, setListas] = useState(null);

  useEffect(function () {
    ServicioObtenerListasDeEstudiante(idEstudiante, token)
      .then((listas) => {
        setListas(listas);
      })
      .catch((error) => {
        console.error(error);
        setListas(null);
      });
  }, []);

  return { listas };
}
