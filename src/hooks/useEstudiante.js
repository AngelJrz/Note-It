import { useEffect, useState } from "react";
import { servicioBuscarEstudiante } from "../services/Estudiante";

export function BuscarEstudiante(nombreUsuario) {
    const [estudiante, setEstudiante] = useState([]); 
  
    useEffect(function () {
        servicioBuscarEstudiante(nombreUsuario)
        .then(estudianteEncontrado => {
          if(estudianteEncontrado.data.estudiante){
            setEstudiante(estudianteEncontrado.data.estudiante);
          }else{
            setEstudiante(null);
          }
        })
      .catch(error => {
        console.error(error);
        setEstudiante([])
      });
    }, [nombreUsuario]);
  
    return { estudiante };
  }