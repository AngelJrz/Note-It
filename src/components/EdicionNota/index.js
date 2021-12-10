import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Boton from "../../components/Boton/index.js";
import Progreso from "../../components/Progreso";
import Notificacion from "../../components/Notificacion";
import EditorContenido from "../EditorContenido";
import useAdminNota from "../../hooks/useAdminNota";
import { MENSAEJE_ERROR_CUERPO_NOTA, MENSAEJE_ERROR_MATERIA_NO_SELECCIONADA, MENSAEJE_ERROR_TEMA_NO_SELECCIONADO, MENSAJE_ERROR_CARRERA_NO_SELECCIONADA, MENSAJE_ERROR_SERVIDOR, MENSAJE_ERROR_TITULO_NOTA } from '../../utilerias/constantes.js';
import { actualizarNotaServicio } from '../../services/notas.js';

export default function EdicionNota(props) {
    const { notaAEditar, creador } = props;

    const history = useHistory();

    const [abrirProgreso, setAbrirProgreso] = useState(false);
    const [notificar, setNotificar] = useState({
      abrir: false,
      mensaje: "",
      tipo: "success",
    });

    const {
      nota,
      carreras,
      materias,
      temas,
      cuerpo,
      cambioDeInfoNota,
      cambioDeCuerpo,
      cambioDeEditorState,
      onInformacionCargada,
      esTituloIncorrecto,
      estaCarreraSeleccionada,
      estaMateriaSeleccionada,
      estaTemaSeleccionado,
      estaCuerpoIncorrecto
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
            setNotificar({
              tipo: "error",
              abrir: true,
              mensaje: MENSAJE_ERROR_TITULO_NOTA
            })

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
            mensaje: MENSAEJE_ERROR_CUERPO_NOTA,
          });

          return;
        }

        setAbrirProgreso(true);
        nota.id = notaAEditar.id;
        actualizarNotaServicio(nota, creador)
        .then((respuesta) => {
          if (respuesta && respuesta.exitoso) {
            setNotificar({
              tipo: "success",
              abrir: true,
              mensaje: respuesta.mensaje,
            });

            setTimeout(() => {
              setAbrirProgreso(false);
              history.push({
                pathname: `/Nota/${nota.id}`
              });
            }, 2000);
          }
          else {
            setAbrirProgreso(false);
            setNotificar({
              tipo: "error",
              abrir: true,
              mensaje: respuesta.mensaje,
            });
          }
        })
        .catch((error) => {
          console.error(error);

          setAbrirProgreso(false);
          setNotificar({
            tipo:"error",
            abrir: true,
            mensaje: MENSAJE_ERROR_SERVIDOR
          })
        })
    }

    return (
      <form onSubmit={actualizarNota}>
        <div className="previewImagen">
          <img
            src={notaAEditar.imagen}
            alt={`Imagen para la nota ${notaAEditar.titulo}`}
            title={`Imagen para la nota ${notaAEditar.titulo}`}
          />
        </div>

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

        <span className="danger">* Campos obligatorios</span>
        <Boton texto="Actualizar nota" tipo="boton principal" />
        <Boton texto="Cancelar" tipo="boton secundario" />

        <Progreso abrir={abrirProgreso} />
        <Notificacion notificar={notificar} setNotificar={setNotificar} />
      </form>
    );
}
