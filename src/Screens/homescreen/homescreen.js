import React from 'react';
import { ObtenerNotas } from '../../hooks/Notas.js';
import './homeScreen.css'
import SeccionNotas from '../../components/SeccionNotas/index.js';
import { OP_NOTAS_UTILES, OP_NOTAS_MAS_VISUALIZADAS } from '../../utilerias/constantes.js';

export default function HomeScreen(){

    return (
      <section className="seccion-inicio">
        <h1>Inicio</h1>
        <SeccionNotas titulo="Más visualizadas" op={OP_NOTAS_MAS_VISUALIZADAS} />
        <SeccionNotas titulo="Más útiles" op={OP_NOTAS_UTILES} />
      </section>
    );
}