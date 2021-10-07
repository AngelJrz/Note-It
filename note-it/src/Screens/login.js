import React from 'react';
import { Link } from 'react-router-dom';

export default function loginScreen() {

    return (
        <div>
            <form className='form'>
                <div>
                    <h1>Inicia Sesión</h1>
                </div>
                <div>
                    <label htmlFor='email'>Usuario</label>
                    <input type='email' id='email' placeholder='Ingresa tu usuario' required>
                    </input>
                </div>

                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' placeholder='Ingresa tu contraseña' required>
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