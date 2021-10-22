import { useState, useEffect } from "react";
import { servicioObtenerNotas } from "../services/notas";

export function ObtenerNotas() {
  const [notas, setNotas] = useState([]);

  useEffect(function () {
    servicioObtenerNotas().then(notas => {
        setNotas(notas);
    })
    .catch(error => {
      console.error(error);
      setNotas([])
    });
  }, []);

  return { notas };
}