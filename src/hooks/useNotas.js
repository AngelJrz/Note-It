import { useState, useEffect } from "react";
import { buscarNotas } from "../services/notas";

export function useNotas(busqueda) {
  const notasIniciales = [];

  const [notas, setNotas] = useState(notasIniciales);

  const limiteDeNotas = 3;

  useEffect(
    function () {
      console.log("BUSQUEDA: ", busqueda);
      buscarNotas(busqueda)
        .then((notas) => {
          if (notas) {
            setNotas(notas);
          }
          else {
            setNotas(notasIniciales);
          }
          
        })
        .catch((err) => {
          console.error(err);
          setNotas(notasIniciales);
        });
    },
    [
      busqueda.id,
      busqueda.texto,
      busqueda.carrera,
      busqueda.materia,
      busqueda.tema,
      busqueda.op
    ]
  );

  return { notas, limiteDeNotas };
}
