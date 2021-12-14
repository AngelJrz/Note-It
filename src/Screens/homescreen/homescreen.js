import React from 'react';
import { ObtenerNotas } from '../../hooks/Notas.js';
import './homeScreen.css'
import SeccionNotas from '../../components/SeccionNotas/index.js';
import { OP_NOTAS_MAS_VISUALIZADAS, LIMITE_SECCION_NOTAS } from '../../utilerias/constantes.js';

export default function HomeScreen(){

    return (
      <section className="seccion-inicio">
        <h1>Inicio</h1>
        <SeccionNotas
          titulo="Más recientes"
          limit={LIMITE_SECCION_NOTAS}
        />
        <SeccionNotas
          titulo="Más visualizadas"
          op={OP_NOTAS_MAS_VISUALIZADAS}
          limit={LIMITE_SECCION_NOTAS}
        />
      </section>
    );
}