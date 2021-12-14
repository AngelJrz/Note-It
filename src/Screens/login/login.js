import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import useUser from '../../hooks/useUser';
import './login.css'
import Boton from "../../components/Boton/index.js";
import contextoEstudiante from '../../context/UserContext';
import Progreso from '../../components/Progreso';
import Notificacion from '../../components/Notificacion';
import { MENSAJE_ERROR_SERVIDOR } from '../../utilerias/constantes';

export default function LoginScreen() {
    const history = useHistory();
    const {datosEstudiante} = useContext(contextoEstudiante);
    const { loginContext, cargando, errorLogin } = useUser();
    const [datos, setDatos] = useState({
        usuario: '',
        contrasenia: ''
    });

    const [notificar, setNotificar] = useState({
      abrir: false,
      mensaje: "",
      tipo: "success",
    });

    useEffect(() => {
        if (datosEstudiante) {
            history.push("/");
        }
    }, [datosEstudiante, history])

    const CambioDeDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    function login(e) {
        e.preventDefault();
        loginContext(datos)
        .then((respuesta) => {

            if (respuesta.resultado) {
              history.push("/");
            } else {
              setNotificar({
                tipo: "error",
                mensaje: respuesta.mensaje,
                abrir: true,
              });
            }
        })
        .catch((err) => {
            console.error(err);
            setNotificar({
              tipo: "error",
              mensaje: MENSAJE_ERROR_SERVIDOR,
              abrir: true,
            });
        });
    }

    return (
      <form className="form formLogin" onSubmit={login}>
        <div>
          <h1>Iniciar sesión</h1>
        </div>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Ingresa tu usuario"
            onChange={CambioDeDatos}
            name="usuario"
            required
          ></input>
        </div>

        <div className="areaPassword">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            onChange={CambioDeDatos}
            name="contrasenia"
            required
          ></input>
        </div>

        <div className="areaBoton">
          <Boton texto="Inicia sesión" tipo="boton principal " />
        </div>

        <div className="areaRegistro">
          ¿No cuentas con un usuario? <Link to="/registro">Registrate</Link>
        </div>
        <Progreso abrir={cargando} />
        <Notificacion notificar={notificar} setNotificar={setNotificar} />
      </form>
    );
}