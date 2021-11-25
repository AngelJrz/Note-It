import { useState, useEffect } from "react";
import { obtenerTemas } from "../services/materias";

export default function useTemas() {
    const [temas, setTemas] = useState([]);
    const [materia, setMateria] = useState("");

    useEffect(
      function () {
        obtenerTemas(materia)
          .then((temas) => {
            setTemas(temas);
          })
          .catch((error) => {
            console.error(error);
            setTemas([]);
          });
      },
      [materia]
    );

    return { temas, setMateria };
}