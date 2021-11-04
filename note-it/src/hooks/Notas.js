import { useState, useEffect } from "react";
import { servicioObtenerNotas, servicioObtenerNota } from "../services/notas";

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
  }, [notas]);

  return { notas };
}

export function ObtenerNota(idNota) {
  const [nota, setNota] = useState([]); 

  useEffect(function () {
    servicioObtenerNota(idNota).then(nota => {
      console.log("sadfhksdj" + nota);
      setNota(nota);
    })
    .catch(error => {
      console.error(error);
      setNota([])
    });
  }, []);

  return { nota };
}