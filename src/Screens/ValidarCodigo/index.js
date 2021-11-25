import React, { useState } from "react";
import Boton from "../../components/Boton";
import { validarCodigo } from "../../services/registrar";
import './index.css'

export default function ValidarCodigo({ location, history }) {
  const { usuario } = location.state;

  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [errorValidacion, setErrorValidacion] = useState({
    error: false,
    mensaje: "",
  });

  const actualizarCodigo = (e) => {
    setCodigoVerificacion(e.target.value);
  };

  const validarCodigoVerificacion = (e) => {
    e.preventDefault();

    validarCodigo(usuario, codigoVerificacion)
      .then((resultado) => {
        console.log(resultado);
        if (resultado.exitoso) {
          setErrorValidacion({
            error: false,
            mensaje: "",
          });

          history.push("/login");
        } else {
          setErrorValidacion({
            error: true,
            mensaje: resultado.mensaje,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(codigoVerificacion);
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

      <span>{errorValidacion.error && errorValidacion.mensaje}</span>

      <Boton texto="Validar" tipo="boton principal" />

      <p>¿No te ha llegado el código de verificación?</p>
      <Boton tipo="boton secundario" texto="Enviar de nuevo" />
    </form>
  );
}
