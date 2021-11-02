import { useState, createRef } from "react";
import { useCarreras } from "./useCarreras";
import { useMaterias } from "./useMaterias";
import useTemas from "./useTemas";
import useCuerpoNota from "./useCuerpoNota";

export default function useAdminNota(
  notaDefualt = {
    titulo: "",
    cuerpo: "",
    carrera: "",
    materia: "",
    tema: "",
    imagen: null
  }, 
  esCreacion = true
) {
  const [nota, setNota] = useState(notaDefualt);
  const { carreras } = useCarreras();
  const { materias, setCarrera } = useMaterias();
  const { temas, setMateria } = useTemas();
  const [imagenPreview, setImagenPreview] = useState(null);
  const imagen = createRef();
  const { cuerpo, cambioDeEditorState } = useCuerpoNota(
    esCreacion,
    notaDefualt.cuerpo
  );

  const cambioDeInfoNota = (e) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    setNota({
      ...nota,
      [nombre]: valor,
    });

    if (nombre === "carrera") {
      setCarrera(valor);
    } else if (nombre === "materia") {
      setMateria(valor);
    }
  };

  const cambioDeCuerpo = (val) => {
    nota.cuerpo = val;
  };

  const actualizarImagen = (e) => {
    if (e.target && e.target.files.length > 0) {
      nota.imagen = imagen.current;
      setImagenPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const limpiarInfoNota = () => {
    setNota(notaDefualt);
    cambioDeEditorState(null);
    imagen.current = null;
    setImagenPreview(null);
  };

  return {
    nota,
    carreras,
    materias,
    temas,
    imagen,
    imagenPreview,
    cuerpo,
    cambioDeInfoNota,
    cambioDeCuerpo,
    cambioDeEditorState,
    actualizarImagen,
    setImagenPreview,
    limpiarInfoNota
  };
}
