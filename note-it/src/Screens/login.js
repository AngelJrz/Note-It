import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {servicioLogin} from '../services/login';
import { useHistory } from "react-router-dom";

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
                    <input id='usuario' placeholder='Ingresa tu usuario' onChange={CambioDeDatos} name="usuario" required>
                    </input>
                </div>

                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' placeholder='Ingresa tu contraseña' onChange={CambioDeDatos} name="contrasenia" required>
                    </input>
                </div>

                <div>
                    <label/>
                    <button className='primary' type='submit'>
                        Iniciar Sesión
                    </button>
                </div>

                <div>
                    <label/>
                    <div>
                        ¿No cuentas con un usuario? <Link to='/registro'>Registrate</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}