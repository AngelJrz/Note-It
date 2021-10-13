import React, { useState } from 'react';
import { validarCodigo } from '../services/registrar';

export default function ValidarCodigo({ match }) {
  const { usuario } = match.params;

  const [codigoVerificacion, setCodigoVerificacion] = useState("")
  const [errorValidacion, setErrorValidacion] = useState({
    error: false,
    mensaje: ""
  })
  
  const actualizarCodigo = (e) => {
    setCodigoVerificacion(e.target.value);
  }

  const validarCodigoVerificacion = (e) => {
    e.preventDefault();

    validarCodigo(usuario, codigoVerificacion)
    .then(resultado => {
      console.log(resultado);
      if(resultado.exitoso) {
        setErrorValidacion({
          error: false,
          mensaje: "",
        });
      }
      else {
        setErrorValidacion({
          error: true,
          mensaje: resultado.mensaje
        });
      }
    })
    .catch(error => {
      console.error(error);
    })
    console.log(codigoVerificacion);
  }

    return (
      <>
        <h1>Validar código de verificación</h1>
        <form onSubmit={validarCodigoVerificacion}>
          <p>Enviamos un código de verificación al correo que proporcionaste para tu registro. Ingrésalo en el campo de abajo.</p>
          <div>
            <label htmlFor="codigoVerificacion">Código de verificación</label>
            <input
              type="number"
              id="codigoVerificacion"
              name="codigoVerificacion"
              minLength="5"
              maxLength="5"
              value={codigoVerificacion}
              onChange={actualizarCodigo}
              required
              title="Ingresa la clave de verificación."
            ></input>
          </div>

          <span>{ errorValidacion.error && errorValidacion.mensaje}</span>
          <div>
            <button type="submit">Validar</button>
          </div>
        </form>

        <p>¿No te ha llegado el código de verificación? <button>Enviar de nuevo</button> </p>
      </>
    );
}
