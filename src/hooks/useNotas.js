import { useState, useEffect } from "react";
import { buscarNotas } from "../services/notas";
import { MENSAJE_ERROR_OBTENER_NOTAS } from "../utilerias/constantes";

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
        .then((resultado) => {
          if (resultado.exitoso) {
            const { data } = resultado;
            if (data && data.length > 0) {
              setErrorBusqueda({
                error: false,
                mensaje: "",
              });
              setNotas(data);
            } else {
              setNotas(notasIniciales);
            }
          } else {
            setErrorBusqueda({
              error: true,
              mensaje: resultado.mensaje
            })
            setNotas(notasIniciales);
          }
          
          setCargandoNotas(false);
        })
        .catch((err) => {
          console.error(err);

          setErrorBusqueda({
            error: true,
            mensaje: MENSAJE_ERROR_OBTENER_NOTAS
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
