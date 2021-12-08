import { useState, createRef } from "react";
import { useCarreras } from "./useCarreras";
import { useMaterias } from "./useMaterias";
import useTemas from "./useTemas";
import useCuerpoNota from "./useCuerpoNota";
import { LARGO_INCORRECTO } from "../utilerias/constantes";

const LARGO_MINIMO_TITULO = 5;
const LARGO_MAXIMO_TITULO = 50;
const LARGO_MINIMO_CUERPO = 20;
const LARGO_MAXIMO_CUERPO = 3000;
const LARGO_CUERPO_DEFUALT = 8;

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

  const onInformacionCargada = (nombre, valor) => {
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

  const esTituloIncorrecto = () => {
    var esIncorrecto = false;

    if (
      nota.titulo.length < LARGO_MINIMO_TITULO ||
      nota.titulo.length > LARGO_MAXIMO_TITULO
    ) {
      esIncorrecto = true;
    }

    return esIncorrecto;
  };

  const estaCarreraSeleccionada = () => {
    var estaSeleccionada = true;

    if (nota.carrera.length === LARGO_INCORRECTO) {
      estaSeleccionada = false;
    }

    return estaSeleccionada;
  }

  const estaMateriaSeleccionada = () => {
    var estaSeleccionada = true;

    if (nota.materia.length === LARGO_INCORRECTO) {
      estaSeleccionada = false;
    }

    return estaSeleccionada;
  };

  const estaTemaSeleccionado = () => {
    var estaSeleccionado = true;

    if (nota.tema.length === LARGO_INCORRECTO) {
      estaSeleccionado = false;
    }

    return estaSeleccionado;
  };

  const estaCuerpoIncorrecto = () => {
    var estaIncorrecto = false;

    if (
      nota.cuerpo.value.length < LARGO_MINIMO_CUERPO + LARGO_CUERPO_DEFUALT ||
      nota.cuerpo.value.length > LARGO_MAXIMO_CUERPO + LARGO_CUERPO_DEFUALT
    ) {
      estaIncorrecto = true;
    }

    return estaIncorrecto;
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
    limpiarInfoNota,
    onInformacionCargada,
    esTituloIncorrecto,
    estaCarreraSeleccionada,
    estaMateriaSeleccionada,
    estaTemaSeleccionado,
    estaCuerpoIncorrecto
  };
}
