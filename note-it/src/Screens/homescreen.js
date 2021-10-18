import React, { useState, useEffect } from 'react';
import { servicioObtenerNotas } from '../services/notas';
import Nota from '../components/Nota'

export default function HomeScreen(){
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        servicioObtenerNotas()
        .then(notasRecibidas => {
            setNotas(notasRecibidas);
        })   
    }, []);

    return( 
        <div>
            <h1>Esto es la pantalla de inicio</h1>
            <div className="row center">
                {
                    notas.map(nota => <Nota nota={nota}></Nota>)
                }
            </div>
        </div>
        
    );
}