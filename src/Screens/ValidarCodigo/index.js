import React, { useState } from "react";
import Boton from "../../components/Boton";

import { useRegistro } from "../../hooks/useRegistro.js";
import './index.css'
import Progreso from "../../components/Progreso";
import Notificacion from "../../components/Notificacion/index.js";

export default function ValidarCodigo({ location, history }) {
  const { usuario } = location.state || "";

  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [notificar, setNotificar] = useState({
    abrir: false,
    mensaje: "",
    tipo: "success",
  });

  const { validar , cargando } = useRegistro();

  const actualizarCodigo = (e) => {
    setCodigoVerificacion(e.target.value);
  };

  const validarCodigoVerificacion = (e) => {
    e.preventDefault();

    const verificacion = {
      usuario,
      codigoVerificacion
    }

    validar(verificacion).then((respuesta) => {
      if (respuesta.exitoso) {
        setCodigoVerificacion("");
        setNotificar({
          tipo: "success",
          abrir: true,
          mensaje: respuesta.mensaje,
        });

        setTimeout(() => {
          history.push({
            pathname: "/login"
          });
        }, 3000);
      } else {
        setNotificar({
          tipo: "error",
          abrir: true,
          mensaje: respuesta.mensaje,
        });
      }
    })
  };

  return (
    <form onSubmit={validarCodigoVerificacion} className="form-validar">
      <h1 className="form-titulo">Validar código de verificación</h1>
      <p>
        Enviamos un código de verificación al correo que proporcionaste para tu
        registro. Ingrésalo en el campo de abajo.
      </p>

      <fieldset>
        <label htmlFor="codigoVerificacion">Código de verificación</label>
        <input
          type="text"
          id="codigoVerificacion"
          name="codigoVerificacion"
          pattern="[0-9]{5,5}"
          maxLength="5"
          minLength="5"
          value={codigoVerificacion}
          onChange={actualizarCodigo}
          required
          title="Ingresa la clave de verificación."
          autoFocus
        ></input>
      </fieldset>

      <Boton texto="Validar" tipo="boton principal" />

      <p>¿No te ha llegado el código de verificación?</p>
      <Boton tipo="boton secundario" texto="Enviar de nuevo" />

      <Progreso abrir={cargando} />
      <Notificacion notificar={notificar} setNotificar={setNotificar} />
    </form>
  );
}
