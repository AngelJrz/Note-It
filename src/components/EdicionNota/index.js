import React, { useEffect } from 'react';
import Boton from "../../components/Boton/index.js";
import ImageUpload from "../../components/ImageUpload";
import Progreso from "../../components/Progreso";
import Notificacion from "../../components/Notificacion";
import EditorContenido from "../EditorContenido";
import useAdminNota from "../../hooks/useAdminNota";

export default function EdicionNota(props) {
    const { notaAEditar, creador } = props;

    const {
      nota,
      carreras,
      materias,
      temas,
      cuerpo,
      cambioDeInfoNota,
      cambioDeCuerpo,
      cambioDeEditorState,
      limpiarInfoNota,
      onInformacionCargada,
      esTituloIncorrecto
    } = useAdminNota(
      {
        titulo: notaAEditar.titulo,
        cuerpo: notaAEditar.cuerpo,
        carrera: notaAEditar.informacionAcademica.carrera.id,
        materia: notaAEditar.informacionAcademica.materia.id,
        tema: notaAEditar.informacionAcademica.tema.id,
      },
      false
    );

    useEffect(() => {
      onInformacionCargada(
        "carrera",
        notaAEditar.informacionAcademica.carrera.id
      );

      onInformacionCargada(
        "materia",
        notaAEditar.informacionAcademica.materia.id
      );
    }, []);

    const actualizarNota = (e) => {
        e.preventDefault();

        if (esTituloIncorrecto()) {
            console.log("TITULO INCORRECTO!");
        }

        console.log("NOTA A ACT: ", nota);
    }

    return (
      <form onSubmit={actualizarNota}>
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
        </fieldset>

        {/* {errorCreacion && <span className="danger">{errorCreacion}</span>} */}

        <span className="danger">* Campos obligatorios</span>
        <Boton texto="Actualizar nota" tipo="boton principal" />
        <Boton texto="Cancelar" tipo="boton secundario" />

        {/* <Progreso abrir={abrirProgreso} /> */}
        {/* <Notificacion notificar={notificar} setNotificar={setNotificar} /> */}
      </form>
    );
}
