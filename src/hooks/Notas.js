import { useState, useEffect } from "react";
import { servicioObtenerNotas, servicioObtenerNota, servicioEliminarNota } from "../services/notas";

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

export function ObtenerNota(idNota) {
  const [nota, setNota] = useState([]); 

  useEffect(function () {
    servicioObtenerNota(idNota).then(nota => {
      setNota(nota);
    })
    .catch(error => {
      console.error(error);
      setNota([])
    });
  }, []);

  return { nota };
}

export function EliminarNota(idNota) {
  return servicioEliminarNota(idNota)
  .then(resultado => {
    return resultado; 
  })
  .catch(error => {
    console.error(error);
  });
}