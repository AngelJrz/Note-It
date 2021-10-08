import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
    const [datos, setDatos] = useState({
        usuario: '',
        contrasenia: ''
    })

    const CambioDeDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    function login(e) {
        e.preventDefault();
        fetch("http://localhost:4200/estudiante/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: datos.usuario,
                contrasenia: datos.contrasenia
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje)
        }).catch(error => {
            console.log(error)
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
                        ¿No cuentas con un usuario? <Link to='/register'>Registrate</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}