import React from 'react';
import { ObtenerNotas } from '../../hooks/Notas.js';
import Nota from '../../components/Nota/Nota'
import './homeScreen.css'

export default function HomeScreen(){
    const { notas } = ObtenerNotas();

    return( 
        <div>
            <h1>Esto es la pantalla de inicio</h1>
            <div className="row center">
                {
                   notas ? notas.map(nota => <Nota nota={nota}></Nota>) : <p>No se obtuvieron notas de respuesta</p> 
                }
            </div>
        </div>
        
    );
}