import { useState } from "react";
import { registrarEstudiante, validarCodigo } from "../services/registrar.js";
import { obtenerCadenaSinEspacios } from "../utilerias/administrarCadenas.js";
import { EMAIL_REGEX, MENSAJE_ERROR_APELLIDOS_ESTUDIANTE, MENSAJE_ERROR_CONTRASEÑA_ESTUDIANTE, MENSAJE_ERROR_CORREO_ESTUDIANTE, MENSAJE_ERROR_NOMBRES_ESTUDIANTE, MENSAJE_ERROR_SERVIDOR, MENSAJE_ERROR_USUARIO_ESTUDIANTE, USUARIO_REGEX } from "../utilerias/constantes.js";

const LARGO_MINIMO_NOMBRES = 2;
const LARGO_MAXIMO_NOMBRES = 80;
const LARGO_MAXIMO_APELLIDOS = 100;
const LARGO_MINIMO_USUARIO = 8;
const LARGO_MAXIMO_USUARIO = 30;
const LARGO_MINIMO_CONTRASEÑA = 8;

export function useRegistro() {
    
    const estudianteInicial = {
      nombres: "",
      apellidos: "",
      correo: "",
      usuario: "",
      contrasenia: "",
      carrera: "",
    };
    const [nuevoEstudiante, setNuevoEstudiante] = useState(estudianteInicial);
    const [cargando, setCargando] = useState(false);

    async function registrar(estudiante) {
      var resultado = {
        exitoso: false,
        mensaje: ""
      };

      if (!estanNombresCorrectos()) {
        resultado.mensaje = MENSAJE_ERROR_NOMBRES_ESTUDIANTE;

        return resultado;
      }

      if (!estanApellidosCorrectos()) {
        resultado.mensaje = MENSAJE_ERROR_APELLIDOS_ESTUDIANTE;

        return resultado;
      }

      if (!estaCorreoCorrecto()) {
        resultado.mensaje = MENSAJE_ERROR_CORREO_ESTUDIANTE;

        return resultado;
      }

      if (!estaUsuarioCorrecto()) {
        resultado.mensaje = MENSAJE_ERROR_USUARIO_ESTUDIANTE;

        return resultado;
      }

      if (!estaContraseñaCorrecta()) {
        resultado.mensaje = MENSAJE_ERROR_CONTRASEÑA_ESTUDIANTE;

        return resultado;
      }

      setCargando(true);

      return registrarEstudiante(estudiante)
        .then((respuesta) => {
          setCargando(false);
          return respuesta;
        })
        .catch((err) => {
          console.error(err);
          setCargando(false);
          return {
            exitoso: false,
            mensaje: MENSAJE_ERROR_SERVIDOR,
          };
        });
    }

    async function validar(verificacion) {
      const { usuario = "", codigoVerificacion = 0 } = verificacion;
      setCargando(true);

      return validarCodigo(usuario, codigoVerificacion)
        .then((resultado) => {
          setCargando(false);
          return resultado;
        })
        .catch((error) => {
          setCargando(false);
          console.error(error);

          return {
            exitoso: false,
            mensaje: MENSAJE_ERROR_SERVIDOR,
          };
        });
    }

    function estanNombresCorrectos() {
      const nombres = obtenerCadenaSinEspacios(nuevoEstudiante.nombres);

      var estanCorrectos = nombres.length >= LARGO_MINIMO_NOMBRES && nombres.length <= LARGO_MAXIMO_NOMBRES;

      return estanCorrectos;
    }

    function estanApellidosCorrectos() {
      const apellidos = obtenerCadenaSinEspacios(nuevoEstudiante.apellidos);

      var estanCorrectos = 
        apellidos.length >= LARGO_MINIMO_NOMBRES &&
        apellidos.length <= LARGO_MAXIMO_APELLIDOS;

      return estanCorrectos;
    }

    function estaCorreoCorrecto() {
      const correo = obtenerCadenaSinEspacios(nuevoEstudiante.correo);

      var estaCorrecto = EMAIL_REGEX.test(correo);

      return estaCorrecto;
    }

    function estaUsuarioCorrecto() {
      const usuario = obtenerCadenaSinEspacios(nuevoEstudiante.usuario);

      var estaCorrecto = USUARIO_REGEX.test(usuario) && usuario.length >= LARGO_MINIMO_USUARIO && usuario.length <= LARGO_MAXIMO_USUARIO;

      return estaCorrecto;
    }

    function estaContraseñaCorrecta() {
      const contraseña = obtenerCadenaSinEspacios(nuevoEstudiante.contrasenia);

      var estaCorrecta = contraseña.length >= LARGO_MINIMO_CONTRASEÑA;

      return estaCorrecta;
    }

    function reestablecerInfoEstudiante() {
      setNuevoEstudiante(estudianteInicial);
    }

    return {
      reestablecerInfoEstudiante,
      nuevoEstudiante,
      setNuevoEstudiante,
      registrar,
      validar,
      cargando,
    };
}
