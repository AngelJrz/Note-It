import { useState, useEffect } from "react";
import { buscarNotas } from "../services/notas";

export function useNotas(busqueda) {
  const [notas, setNotas] = useState([]);
//   const [busqueda, setBusqueda] = useState({});

  useEffect(
    function () {
      console.log("BUSQUEDA: ", busqueda);
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
      busqueda.offset,
      busqueda.limit
    ]
  );

  return { /*busqueda, setBusqueda,*/ notas };
}
