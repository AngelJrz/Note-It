import React, { useState } from "react";

import Boton from "../../components/Boton/index.js";
import { useCarreras } from "../../hooks/useCarreras";
import Notificacion from "../../components/Notificacion/index.js";

import './index.css'
import Progreso from "../../components/Progreso/index.js";
import { useRegistro } from "../../hooks/useRegistro.js";

export default function RegistroScreen({ history }) {
  const estudianteInicial = {
    nombres: "",
    apellidos: "",
    correo: "",
    usuario: "",
    contrasenia: "",
    carrera: "",
  };
  const [nuevoEstudiante, setNuevoEstudiante] = useState(estudianteInicial);
  const [notificar, setNotificar] = useState({
    abrir: false,
    mensaje: "",
    tipo: "success",
  });

  const [errorConfirmacionContrasenia, setErrorConfirmacionContrasenia] =
    useState("");

  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState("")

  const { carreras } = useCarreras();

  const { registrar, cargando } = useRegistro();

  const actualizarInfo = (e) => {
    setNuevoEstudiante({
      ...nuevoEstudiante,
      [e.target.name]: e.target.value,
    });
  };

  const cancelarRegistro = () => {
    history.push("/");
  };

  const limpiarCampos = () => {
    setNuevoEstudiante(estudianteInicial);
    setConfirmacionContrasenia("");
  }

  const validarConfirmacionContrasenia = (e) => {
    const confirmaContrasenia = e.target.value;

    setConfirmacionContrasenia(confirmaContrasenia);

    if (nuevoEstudiante.contrasenia !== confirmaContrasenia) {
      setErrorConfirmacionContrasenia(
        "La confirmación de la contraseña no coincide con la ingresada."
      );
    } else {
      setErrorConfirmacionContrasenia("");
    }
  };

  const registrarNuevoEstudiante = (e) => {
    e.preventDefault();

    if (!errorConfirmacionContrasenia) {
      registrar(nuevoEstudiante).then((respuesta) => {
        if (respuesta.exitoso) {
          limpiarCampos();
          setNotificar({
            tipo: "info",
            abrir: true,
            mensaje: "Verifica tu correo.",
          });
          
          setTimeout(() => {
            history.push({
              pathname: "validar-codigo",
              state: { usuario: nuevoEstudiante.usuario },
            });
          }, 3000);
        } else {
          setNotificar({
            tipo: "error",
            abrir: true,
            mensaje: respuesta.mensaje,
          });
        }
      });
    }
  };

  return (
    <form onSubmit={registrarNuevoEstudiante} className="form">
      <h1>Registrar cuenta</h1>

      <fieldset>
        <label htmlFor="nombres">
          Nombres (<span>*</span>)
        </label>
        <input
          value={nuevoEstudiante.nombres}
          id="nombres"
          type="text"
          placeholder="Ingresa tu(s) nombre(s)"
          name="nombres"
          minLength="2"
          required
          onChange={actualizarInfo}
        ></input>

        <label htmlFor="apellidos">
          Apellidos (<span>*</span>)
        </label>
        <input
          value={nuevoEstudiante.apellidos}
          id="apellidos"
          type="text"
          minLength="2"
          placeholder="Ingresa tu(s) apellidos(s)"
          name="apellidos"
          required
          onChange={actualizarInfo}
        ></input>

        <label htmlFor="correo">
          Correo electrónico (<span>*</span>)
        </label>
        <input
          value={nuevoEstudiante.correo}
          id="correo"
          type="email"
          placeholder="zsXXXXXXXX@estudiantes.uv.mx"
          name="correo"
          pattern="zs([0-9]{8})+@estudiantes\.uv\.mx"
          title="Por favor ingresa un correo en el formato zsXXXXXXXX@estudiantes.uv.mx"
          required
          onChange={actualizarInfo}
        ></input>

        <label htmlFor="usuario">
          Usuario (<span>*</span>)
        </label>
        <input
          value={nuevoEstudiante.usuario}
          id="usuario"
          type="text"
          placeholder="Ingresa tu usuario. Por ejemplo nuevoUsuario1."
          name="usuario"
          minLength="5"
          pattern="^\S+$"
          title="El usuario no debe contener espacios y debe tener al menos 5 caracteres."
          required
          onChange={actualizarInfo}
        ></input>

        <label htmlFor="contrasenia">
          Contraseña (<span>*</span>)
        </label>
        <input
          value={nuevoEstudiante.contrasenia}
          type="password"
          id="contrasenia"
          name="contrasenia"
          required
          minLength="8"
          onChange={actualizarInfo}
        ></input>

        <label htmlFor="confirmaContrasenia">
          Confirmar contraseña (<span>*</span>)
        </label>
        <input
          value={confirmacionContrasenia}
          type="password"
          id="confirmaContrasenia"
          name="confirmaContrasenia"
          required
          minLength="8"
          onChange={validarConfirmacionContrasenia}
        ></input>

        <span>{errorConfirmacionContrasenia}</span>

        <label htmlFor="carreras">
          Carrera en la que estudias (<span>*</span>)
        </label>
        <select
          value={nuevoEstudiante.carrera}
          id="carreras"
          required
          name="carrera"
          onChange={actualizarInfo}
        >
          <option value="" selected disabled>
            Selecciona una carrera
          </option>
          {carreras && carreras.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </select>
      </fieldset>

      <span>* Campos obligatorios</span>

      <Boton texto="Registrar cuenta" tipo="boton principal" />
      <Boton
        texto="Cancelar"
        tipo="boton secundario"
        onClick={cancelarRegistro}
      />

      <Progreso abrir={cargando} />
      <Notificacion notificar={notificar} setNotificar={setNotificar} />
    </form>
  );
}
