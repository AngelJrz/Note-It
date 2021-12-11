import { useState, useEffect } from "react";
import { buscarNotas } from "../services/notas";

export function useNotas(busqueda) {
  const notasIniciales = [];

  const [notas, setNotas] = useState(notasIniciales);
  const [cargandoNotas, setCargandoNotas] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState({
    error: false,
    mensaje: ""
  });

  const limiteDeNotas = 3;

  useEffect(
    function () {
      setCargandoNotas(true);
      buscarNotas(busqueda)
        .then((notas) => {
          setCargandoNotas(false);
          if (notas && notas.length > 0) {
            
            setNotas(notas);
          }
          else {
            setNotas(notasIniciales);
          }
          
        })
        .catch((err) => {
          console.error(err);

          setErrorBusqueda({
            error: true,
            mensaje: "Ocurrió un error al intentar obtener las notas. Intente más tarde."
          })
          setCargandoNotas(false);
          setNotas(notasIniciales);
        });
    },
    [
      busqueda.id,
      busqueda.texto,
      busqueda.carrera,
      busqueda.materia,
      busqueda.tema,
      busqueda.op,
      busqueda.limit
    ]
  );

  return { notas, limiteDeNotas, cargandoNotas, errorBusqueda };
}
