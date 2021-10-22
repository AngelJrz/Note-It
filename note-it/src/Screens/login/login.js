import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {servicioLogin} from '../../services/login';
import './login.css'
import Boton from "../../components/Boton/index.js";

export default function LoginScreen() {
    const history = useHistory();
    const [datos, setDatos] = useState({
        usuario: '',
        contrasenia: ''
    });

    const CambioDeDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    function login(e) {
        e.preventDefault();
        servicioLogin(datos)
        .then(datosLogin => {
            if (datosLogin.resultado) {
                sessionStorage.setItem('token', datosLogin.data);
                history.push("/");
            }else{
                alert(datosLogin.mensaje);
            }
        }).catch(err => {
            alert("Ocurrió un error");
        })   
    }

    return (
        <div>
            <form className='form' onSubmit={login}> 
                <div>
                    <h1>Inicia Sesión</h1>
                </div>
                <div>
                    <label htmlFor='usuario'>Usuario</label>
                    <input type='text' id='usuario' placeholder='Ingresa tu usuario' onChange={CambioDeDatos} name="usuario" required>
                    </input>
                </div>

                <div className="areaPassword">
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' placeholder='Ingresa tu contraseña' onChange={CambioDeDatos} name="contrasenia" required>
                    </input>
                </div>

                <div className="areaBoton">
                    <Boton texto="Inicia sesión" tipo="boton principal "/>
                </div>

                <div className="areaRegistro">
                    ¿No cuentas con un usuario? <Link to='/registro'>Registrate</Link>
                </div>
            </form>
        </div>
    )
}