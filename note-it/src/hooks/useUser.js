import { useCallback,useContext  } from "react";
import {servicioLogin} from '../services/Estudiante';
import contextoEstudiante from "../context/UserContext";
import { useHistory } from "react-router-dom";

export default function useUser() {
    const history = useHistory();
    const {setDatosEstudiante} = useContext(contextoEstudiante);

    const loginContext = useCallback((datos) => {
        servicioLogin(datos)
        .then(datosLogin => {
            if (datosLogin.resultado) {
                setDatosEstudiante(datosLogin.data);
                history.push("/");
            }else{
                alert(datosLogin.mensaje);
            }
        }).catch(err => {
            alert("Ocurrió un error");
        })   
    }, [setDatosEstudiante, history]);

    const logoutContext = useCallback(() => {
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