import { useState } from "react";
import { registrarEstudiante, validarCodigo } from "../services/registrar.js";
import { MENSAJE_ERROR_SERVIDOR } from "../utilerias/constantes.js";

export function useRegistro() {
    const [cargando, setCargando] = useState(false)

    async function registrar(estudiante) {
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

    return { registrar, validar, cargando };
}
