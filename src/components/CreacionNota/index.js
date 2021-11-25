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
    } = useAdminNota();

  const [abrirProgreso, setAbrirProgreso] = useState(false);
  const [notificar, setNotificar] = useState({
    abrir: false,
    mensaje: "",
    tipo: "success",
  });
  const [errorCreacion, setErrorCreacion] = useState("");

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

    crearNuevaNota(nota, datosEstudiante)
      .then((respuesta) => {
        console.log("Respuesta en GUI: ", respuesta);
        setAbrirProgreso(false);
        if (respuesta.exitoso) {
          limpiarInfoNota();

          setNotificar({
            ...notificar,
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
      .catch((err) => {
        console.log("error en GUI: ", err);

        setNotificar({
          abrir: true,
          mensaje: "Ocurrió un error en el servidor. Intente más tarde.",
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

      {errorCreacion && <span className="danger">{errorCreacion}</span>}

      <span className="danger">* Campos obligatorios</span>
      <Boton texto="Crear nota" tipo="boton principal" />
      <Boton texto="Cancelar" tipo="boton secundario" />

      <Progreso abrir={abrirProgreso} />
      <Notificacion notificar={notificar} setNotificar={setNotificar} />
    </form>
  );
}
