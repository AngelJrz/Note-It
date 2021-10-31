import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'
import Boton from "../../components/Boton/index.js";
import { useCarreras } from "../../hooks/useCarreras";
import { useMaterias } from '../../hooks/useMaterias';
import useTemas from '../../hooks/useTemas';
import ImageUpload from '../../components/ImageUpload';
import { crearNuevaNota } from '../../services/notas';
import Progreso from '../../components/Progreso';
import Notificacion from "../../components/Notificacion";

export default function CrearNota() {
  const valorInicialNota = {
    titulo: "",
    cuerpo: "",
    carrera: "",
    materia: "",
    tema: "",
  };
  const { carreras } = useCarreras();
  const { materias, setCarrera } = useMaterias();
  const { temas, setMateria } = useTemas();
  const [imagen, setImagen] = useState(null);

  const [abrirProgreso, setAbrirProgreso] = useState(false);
  const [notificar, setNotificar] = useState({abrir: false, mensaje: '', tipo: 'success'});
  const [errorCreacion, setErrorCreacion] = useState("");

  const [nota, setNota] = useState(valorInicialNota);

  const cambioDeInfoNota = (e) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    setNota({
      ...nota,
      [nombre]: valor,
    });

    setErrorCreacion("");

    if (nombre === "carrera") {
      setCarrera(valor);
    } else if (nombre === "materia") {
      setMateria(valor);
    }
  };

  const actualizarImagen = (e) => {
    if (e.target && e.target.files.length > 0) {
      setImagen(e.target);
      setImagenPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [imagenPreview, setImagenPreview] = useState(null);

  let editorState = EditorState.createEmpty();
  const [cuerpo, setCuerpo] = useState(editorState);

  const cambioDeEditorState = (editorState) => {
    setCuerpo(editorState);
    setErrorCreacion("");
  };

  const cambioDeCuerpo = (val) => {
    nota.cuerpo = val;
    setErrorCreacion("");
  };

  const crearNota = (e) => {
    e.preventDefault();
    const largoMinimoTitulo = 5;
    const largoMaximoTitulo = 50;
    const largoMinimoCuerpo = 20;
    const largoMaximoCuerpo = 3000;
    const largoPorDefectoCuerpo = 8;

    if (
      nota.titulo.length < largoMinimoTitulo ||
      nota.titulo.length > largoMaximoTitulo
    ) {
      setErrorCreacion(
        `El título de la nota debe tener al menos 5 caracteres y máximo 50 caracteres. Actualmente tiene ${nota.titulo.length} caracteres.`
      );

      return;
    } else if (nota.carrera.length === 0) {
      setErrorCreacion("La carrera es obligatoria, por favor selecciona una.");

      return;
    } else if (nota.materia.length === 0) {
      setErrorCreacion("La materia es obligatoria, por favor selecciona una.");

      return;
    } else if (nota.tema.length === 0) {
      setErrorCreacion("El tema es obligatorio, por favor selecciona una.");

      return;
    } else if (
      nota.cuerpo.value.length < largoMinimoCuerpo + largoPorDefectoCuerpo ||
      nota.cuerpo.value.length > largoMaximoCuerpo + largoPorDefectoCuerpo
    ) {
      setErrorCreacion(
        `El cuerpo de la nota debe tener al menos 20 caracteres y máximo 3000. Actualmente tiene ${
          nota.cuerpo.value.length - largoPorDefectoCuerpo
        } caracteres.`
      );

      return;
    }

    setAbrirProgreso(true);

    crearNuevaNota(nota)
      .then((respuesta) => {
        console.log("Respuesta en GUI: ", respuesta);
        setAbrirProgreso(false);
        if (respuesta.exitoso) {
          setNota(valorInicialNota);
          setCuerpo(editorState);
          setImagen(null);

          setNotificar({
            ...notificar,
            abrir: true,
            mensaje: respuesta.mensaje,
          });
        }
        else {
          setNotificar({
            abrir: true,
            mensaje: respuesta.mensaje,
            tipo: "error",
          });
        }
      })
      .catch((err) => {
        console.log("error en GUI: ", err);

        setNotificar({
          abrir: true,
          mensaje: "Ocurrió un error en el servidor. Intente más tarde.",
          tipo: "error"
        });
        setAbrirProgreso(false);
      });
  };

  return (
    <form onSubmit={crearNota}>
      <fieldset>
        <label htmlFor="titulo">Título (*)</label>
        <input
          type="text"
          name="titulo"
          minLength="5"
          maxLength="50"
          value={nota.titulo}
          onChange={cambioDeInfoNota}
          placeholder="Título"
          required
        />

        <h2>Información académica</h2>
        <label htmlFor="carrera">Carrera (*)</label>
        <select
          id="carreras"
          required
          name="carrera"
          value={nota.carrera}
          onChange={cambioDeInfoNota}
        >
          <option value="" selected disabled>
            Selecciona una carrera
          </option>
          {carreras.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="materia">Materia (*)</label>
        <select
          id="materias"
          required
          name="materia"
          value={nota.materia}
          onChange={cambioDeInfoNota}
        >
          <option value="" selected disabled>
            Selecciona una materia
          </option>
          {materias &&
            materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre}
              </option>
            ))}
        </select>

        <label htmlFor="tema">Tema (*)</label>
        <select
          id="temas"
          name="tema"
          required
          value={nota.tema}
          onChange={cambioDeInfoNota}
        >
          <option value="" selected disabled>
            Selecciona un tema
          </option>
          {temas &&
            temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.nombre}
              </option>
            ))}
        </select>

        <label htmlFor="contenido">Contenido (*)</label>
        <Editor
          editorState={cuerpo}
          toolbarClassName="editor-toolbar"
          wrapperClassName="wrapper"
          editorClassName="editor"
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
          onEditorStateChange={cambioDeEditorState}
          className="editor"
        />
        <textarea
          name="cuerpo"
          className="contenido-textarea"
          disabled
          ref={cambioDeCuerpo}
          value={draftToHtml(convertToRaw(cuerpo.getCurrentContent()))}
        />

        <ImageUpload
          imagen={imagen}
          setImagen={setImagen}
          onChange={actualizarImagen}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
        />
      </fieldset>

      {errorCreacion && <span>{errorCreacion}</span>}

      <span>* Campos obligatorios</span>
      <Boton texto="Crear nota" tipo="boton principal" />
      <Boton texto="Cancelar" tipo="boton secundario" />

      <Progreso abrir={abrirProgreso} />
      <Notificacion notificar={notificar} setNotificar={setNotificar} />
    </form>
  );
}


