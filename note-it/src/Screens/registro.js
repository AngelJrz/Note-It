import React, { useState } from 'react'

import { registrarEstudiante } from '../services/registrar';
import { useCarreras } from '../hooks/useCarreras';

export default function RegistroScreen({ history }) {
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
      nombres: '',
      apellidos: '',
      correo: '',
      usuario: '',
      contrasenia: '',
      carrera: ''
    })

    const [errorConfirmacionContrasenia, setErrorConfirmacionContrasenia] = useState("");

    const { carreras } = useCarreras();

    const [errorRegistro, setErrorRegistro] = useState("")

    const actualizarInfo = (e) => {
      setNuevoEstudiante({
        ...nuevoEstudiante,
        [e.target.name]: e.target.value
      })

      setErrorRegistro("")
    }

    const cancelarRegistro = () => {
      history.push('/');
    }

    const validarConfirmacionContrasenia = (e) => {
      const confirmaContrasenia = e.target.value;

      if (nuevoEstudiante.contrasenia !== confirmaContrasenia) {
        setErrorConfirmacionContrasenia(
          "La confirmación de la contraseña no coincide con la ingresada."
        );
      }
      else {
        setErrorConfirmacionContrasenia("")
      }
    }

    const registrarNuevoEstudiante = (e) => {
      e.preventDefault()
      
      if (!errorConfirmacionContrasenia) {
        registrarEstudiante(nuevoEstudiante)
        .then(respuesta => {
          if (respuesta.exitoso) {
            history.push({
              pathname: "validar-codigo",
              state: { usuario: nuevoEstudiante.usuario },
            });
          } else {
            setErrorRegistro(respuesta.mensaje)
          }
        }).catch(error => {
          console.error(error);
        })
      }
      
    }

    return (
      <div>
        <h1>Registrar cuenta</h1>
        <form onSubmit={registrarNuevoEstudiante}>
          <div>
            <label htmlFor="nombres">Nombres</label>
            <input
              id="nombres"
              type="text"
              placeholder="Ingresa tu(s) nombre(s)"
              name="nombres"
              minLength="2"
              required
              onChange={actualizarInfo}
            ></input>
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos</label>
            <input
              id="apellidos"
              type="text"
              minLength="2"
              placeholder="Ingresa tu(s) apellidos(s)"
              name="apellidos"
              required
              onChange={actualizarInfo}
            ></input>
          </div>
          <div>
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="zsXXXXXXXX@estudiantes.uv.mx"
              name="correo"
              pattern="zs([0-9]{8})+@estudiantes\.uv\.mx"
              title="Por favor ingresa un correo en el formato zsXXXXXXXX@estudiantes.uv.mx"
              required
              onChange={actualizarInfo}
            ></input>
          </div>
          <div>
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              name="usuario"
              required
              onChange={actualizarInfo}
            ></input>
          </div>
          <div>
            <label htmlFor="contrasenia">Contraseña</label>
            <input
              type="password"
              id="contrasenia"
              name="contrasenia"
              required
              minLength="8"
              onChange={actualizarInfo}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmaContrasenia">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmaContrasenia"
              name="confirmaContrasenia"
              required
              minLength="8"
              onChange={validarConfirmacionContrasenia}
            ></input>
          </div>
          <div>
            <span>{errorConfirmacionContrasenia}</span>
          </div>
          <div>
            <label htmlFor="carreras">Carrera en la que estudias</label>
            <select
              id="carreras"
              required
              name="carrera"
              onChange={actualizarInfo}
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
          </div>

          {errorRegistro && <span>{errorRegistro}</span>}

          <div>
            <button type="submit">Registrar cuenta</button>
          </div>
        </form>

        <div>
          <button onClick={cancelarRegistro}>Cancelar</button>
        </div>
      </div>
    );
}
