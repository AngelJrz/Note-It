import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import contextoEstudiante from "../../context/UserContext";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

import { useNotas } from '../../hooks/useNotas';
import './index.css'
import Progreso from '../../components/Progreso';
import EdicionNota from '../../components/EdicionNota';

const CANTIDAD_NOTA_ESPERADA = 1;
const POSICION_NOTA_A_EDITAR = 0;

export default function EditarNota(props) {
    // const history = useHistory();
    const { datosEstudiante } = useContext(contextoEstudiante);
    // console.log("USER: ", datosEstudiante);
    // console.log("ENTRE v':");
    // useEffect(() => {
    //   if (datosEstudiante === null) {
    //     history.push("/");
    //   }
    // }, []);

    const { id } = props.match.params || "";
    const { notas, cargandoNotas, errorBusqueda } = useNotas({ id });

    return (
      <Grid container className="container">
        <Grid item>
          <Paper elevation={3} className="formulario">
            <h1>Editar nota</h1>
            
            {
                errorBusqueda.error ? (
                    <span>{errorBusqueda.mensaje}</span>
                ) : !cargandoNotas && notas.length === CANTIDAD_NOTA_ESPERADA ? (
                    <EdicionNota notaAEditar={notas[POSICION_NOTA_A_EDITAR]} creador={datosEstudiante}/>
                ) : (
                    <span>No se encontró la nota a editar.</span>
                )
            }
          </Paper>
        </Grid>

        <Progreso abrir={cargandoNotas}/>
      </Grid>
    );
}
