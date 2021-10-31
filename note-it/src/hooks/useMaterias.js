import { useState, useEffect } from "react";
import { obtenerMaterias } from "../services/carreras.js";

export function useMaterias() {
    const [materias, setMaterias] = useState([]);
    const [carrera, setCarrera] = useState("");

    useEffect(function () {
      obtenerMaterias(carrera)
        .then((materias) => {
          setMaterias(materias);
        })
        .catch((error) => {
          console.error(error);
          setMaterias([]);
        });
    }, [carrera]);

    return { materias, setCarrera };
}