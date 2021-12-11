import { useCallback,useContext  } from "react";
import {servicioLogin} from '../services/Estudiante';
import contextoEstudiante from "../context/UserContext";
import { useHistory } from "react-router-dom";

const REACT_APP_SESSION_KEY = process.env.REACT_APP_SESSION_KEY;

export default function useUser() {
    const history = useHistory();
    const {setDatosEstudiante} = useContext(contextoEstudiante);

    const loginContext = useCallback((datos) => {
        servicioLogin(datos)
        .then(datosLogin => {
            if (datosLogin.resultado) {
                window.sessionStorage.setItem(REACT_APP_SESSION_KEY, JSON.stringify(datosLogin.data));
                setDatosEstudiante(datosLogin.data);
                history.push("/");
            }else{
                alert(datosLogin.mensaje);
            }
        }).catch(err => {
            window.sessionStorage.removeItem(REACT_APP_SESSION_KEY);
            alert("Ocurrió un error");
        })   
    }, [setDatosEstudiante, history]);

    const logoutContext = useCallback(() => {
        window.sessionStorage.removeItem(REACT_APP_SESSION_KEY);
        setDatosEstudiante(null);
        history.push("/");
    }, [setDatosEstudiante, history]);

    return(
        {
            loginContext,
            logoutContext,
        }
    )
}