import { useCallback, useContext, useState  } from "react";
import {servicioLogin} from '../services/Estudiante';
import contextoEstudiante from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { MENSAJE_ERROR_SERVIDOR } from "../utilerias/constantes";

const REACT_APP_SESSION_KEY = process.env.REACT_APP_SESSION_KEY;

export default function useUser() {
    const history = useHistory();
    const [cargando, setCargando] = useState(false);
    const {setDatosEstudiante} = useContext(contextoEstudiante);

    // const loginContext = useCallback((datos) => {
    //     setCargando(true);
    //     servicioLogin(datos)
    //     .then(datosLogin => {
    //         setCargando(false);
    //         if (datosLogin.resultado) {
    //             window.sessionStorage.setItem(REACT_APP_SESSION_KEY, JSON.stringify(datosLogin.data));
    //             setDatosEstudiante(datosLogin.data);
    //             history.push("/");
    //         }else{
    //             // alert(datosLogin.mensaje);
    //             setErrorLogin({
    //                 exitoso: false,
    //                 mensaje: datosLogin.mensaje
    //             });
    //             return;
    //         }
    //     }).catch(err => {
    //         setCargando(false);
    //         window.sessionStorage.removeItem(REACT_APP_SESSION_KEY);
    //         // alert("Ocurrió un error");
    //         setErrorLogin({
    //             exitoso: false,
    //             mensaje: MENSAJE_ERROR_SERVIDOR
    //         })
    //         return;
    //     })   
    // }, [setDatosEstudiante, history]);

    const loginContext = async (datos) => {
      setCargando(true);
      return servicioLogin(datos)
        .then((datosLogin) => {
          setCargando(false);
          if (datosLogin.resultado) {
            window.sessionStorage.setItem(
              REACT_APP_SESSION_KEY,
              JSON.stringify(datosLogin.data)
            );
            setDatosEstudiante(datosLogin.data);
          } 
          
          return datosLogin;
        })
        .catch((err) => {
            console.error(err);
          setCargando(false);
          window.sessionStorage.removeItem(REACT_APP_SESSION_KEY);
          return { 
              resultado: false,
              mensaje: MENSAJE_ERROR_SERVIDOR
          };
        });
    };

    const logoutContext = useCallback(() => {
        window.sessionStorage.removeItem(REACT_APP_SESSION_KEY);
        setDatosEstudiante(null);
        history.push("/");
    }, [setDatosEstudiante, history]);

    return(
        {
            loginContext,
            logoutContext,
            cargando,
        }
    )
}