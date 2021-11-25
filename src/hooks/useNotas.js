import { useState, useEffect } from "react";
import { buscarNotas } from "../services/notas";

export function useNotas(busqueda) {
  const [notas, setNotas] = useState([]);
//   const [busqueda, setBusqueda] = useState({});

  useEffect(
    function () {
      buscarNotas(busqueda)
        .then((notas) => {
          setNotas(notas);
        })
        .catch((err) => {
          console.err(err);

          setNotas([]);
        });
    },
    [
      busqueda.id,
      busqueda.texto,
      busqueda.carrera,
      busqueda.materia,
      busqueda.tema,
      busqueda.op,
    ]
  );

  return { /*busqueda, setBusqueda,*/ notas };
}
