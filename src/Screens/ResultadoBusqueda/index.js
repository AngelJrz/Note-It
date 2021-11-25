import React from 'react';
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import "./index.css"
import { useNotas } from '../../hooks/useNotas';
import Nota from "../../components/Nota/Nota";

export default function ResultadoBusqueda() {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);

    const texto = searchParams.get("q");

    const { busqueda, setBusqueda, notas } = useNotas({ texto });

    return (
      <Grid container spacing={2} className="container">
        <Grid item xs={4}>
          <Paper elevation={3}>
            <h3>Filtros</h3>

            <form>
              <fieldset></fieldset>

              <button>Buscar</button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={3}>
            <h1>Resultado de la búsqueda</h1>
            <p>{texto}</p>

            {notas && notas.map((nota) => (<Nota key={nota.id} nota={nota}></Nota>))}
          </Paper>
        </Grid>
      </Grid>
    );
}
