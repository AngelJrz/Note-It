import React, { useState, useContext } from "react";
import "./index.css";
import Boton from "../../components/Boton/index.js";
import ImageUpload from "../../components/ImageUpload";
import { crearNuevaNota } from "../../services/notas";
import Progreso from "../../components/Progreso";
import Notificacion from "../../components/Notificacion";
import EditorContenido from "../EditorContenido";
import useAdminNota from "../../hooks/useAdminNota";
import contextoEstudiante from "../../context/UserContext";
import { MENSAEJE_ERROR_CUERPO_NOTA, MENSAEJE_ERROR_MATERIA_NO_SELECCIONADA, MENSAEJE_ERROR_TEMA_NO_SELECCIONADO, MENSAJE_ERROR_CARRERA_NO_SELECCIONADA, MENSAJE_ERROR_SERVIDOR, MENSAJE_ERROR_TITULO_NOTA } from "../../utilerias/constantes";

export default function CreacionNota() {
  const {datosEstudiante} = useContext(contextoEstudiante);
    const {
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
      esTituloIncorrecto,
      estaCarreraSeleccionada,
      estaMateriaSeleccionada,
      estaTemaSeleccionado,
      estaCuerpoIncorrecto,
      obtenerLargoCuerpoNota
    } = useAdminNota();

  const [abrirProgreso, setAbrirProgreso] = useState(false);
  const [notificar, setNotificar] = useState({
    abrir: false,
    mensaje: "",
    tipo: "success",
  });

  const crearNota = (e) => {
    e.preventDefault();

    if (esTituloIncorrecto()) {

      setNotificar({
        tipo: "error",
        abrir: true,
        mensaje: `${MENSAJE_ERROR_TITULO_NOTA} Actualmente tiene ${nota.titulo.length} caracteres.`,
      });

      return;
    } 
    
    if (!estaCarreraSeleccionada()) {
      setNotificar({
        tipo: "error",
        abrir: true,
        mensaje: MENSAJE_ERROR_CARRERA_NO_SELECCIONADA,
      });

      return;
    } 
    
    if (!estaMateriaSeleccionada()) {
      setNotificar({
        tipo: "error",
        abrir: true,
        mensaje: MENSAEJE_ERROR_MATERIA_NO_SELECCIONADA,
      });

      return;
    } 
    
    if (!estaTemaSeleccionado()) {
      setNotificar({
        tipo: "error",
        abrir: true,
        mensaje: MENSAEJE_ERROR_TEMA_NO_SELECCIONADO,
      });

      return;
    } 
    
    if (estaCuerpoIncorrecto()) {
      setNotificar({
        tipo: "error",
        abrir: true,
        mensaje: `${MENSAEJE_ERROR_CUERPO_NOTA} Actualmente tiene ${obtenerLargoCuerpoNota()} caracteres.`,
      });

      return;
    }

    setAbrirProgreso(true);
    
    crearNuevaNota(nota, datosEstudiante)
      .then((respuesta) => {
        setAbrirProgreso(false);
        if (respuesta.exitoso) {
          limpiarInfoNota();

          setNotificar({
            tipo: "success",
            abrir: true,
            mensaje: respuesta.mensaje,
          });
        } else {
          setNotificar({
            abrir: true,
            mensaje: respuesta.mensaje,
            tipo: "error",
          });
        }
      })
      .catch(() => {
        setNotificar({
          abrir: true,
          mensaje: MENSAJE_ERROR_SERVIDOR,
          tipo: "error",
        });
        setAbrirProgreso(false);
      });
  };

  return (
    <form onSubmit={crearNota}>
      <fieldset>
        <label htmlFor="titulo">
          Título (<span className="danger">*</span>)
        </label>
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
        <label htmlFor="carrera">
          Carrera (<span className="danger">*</span>)
        </label>
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

        <label htmlFor="materia">
          Materia (<span className="danger">*</span>)
        </label>
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

        <label htmlFor="tema">
          Tema (<span className="danger">*</span>)
        </label>
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

        <label htmlFor="contenido">
          Contenido (<span className="danger">*</span>)
        </label>

        <EditorContenido
          cuerpo={cuerpo}
          cambioDeEditorState={cambioDeEditorState}
          cambioDeCuerpo={cambioDeCuerpo}
        />

        <ImageUpload
          imagen={imagen}
          onChange={actualizarImagen}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
        />
      </fieldset>

      <span className="danger">* Campos obligatorios</span>
      <Boton texto="Crear nota" tipo="boton principal" />
      <Boton texto="Cancelar" tipo="boton secundario" />

      <Progreso abrir={abrirProgreso} />
      <Notificacion notificar={notificar} setNotificar={setNotificar} />
    </form>
  );
}
