import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import "./index.css"
import { useNotas } from '../../hooks/useNotas';
import Nota from "../../components/Nota/Nota";
import { Pagination } from '@mui/material';
import { useHistory } from "react-router-dom";
import Filtros from '../../components/Filtros';


export default function ResultadoBusqueda() {
    const {search} = useLocation();
    const history = useHistory();
    
    const searchParams = new URLSearchParams(search);

    const texto = searchParams.get("q") || "";

    const { notas, limiteDeNotas } = useNotas({ texto });
    const [pagina, setPagina] = useState(1);
    const [paginasVisitadas, setPaginasVisitadas] = useState((pagina - 1) * limiteDeNotas);

    const administrarPagina = (_, value) => {
      setPagina(value);
      setPaginasVisitadas((value - 1) * limiteDeNotas);
    }

    console.log("NOTAS: ", notas);
    return (
      <Grid container spacing={2} className="container">
        <Grid item xs={4}>
          <Paper elevation={3} className="paper">
            <h1>Filtros</h1>

            {notas && notas.length > 0 ? (
              <Filtros />
            ) : (
              <span>No se encontraron notas con la búsqueda realizada.</span>
            )}
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={3} className="paper">
            <h1 className="titulo-resultado">Resultado de la búsqueda: </h1>
            <h2 className="texto-busqueda">"{texto}"</h2>
            <section className="row center">
              {notas && notas.length > 0 ? (
                notas
                  .slice(paginasVisitadas, paginasVisitadas + limiteDeNotas)
                  .map((nota) => <Nota key={nota.id} nota={nota}></Nota>)
              ) : (
                <span>No se encontraron notas con la búsqueda realizada.</span>
              )}
            </section>

            {notas && notas.length > 0 ? (
              <Pagination
                count={Math.ceil(notas.length / limiteDeNotas)}
                page={pagina}
                onChange={administrarPagina}
              />
            ) : (
              ""
            )}
          </Paper>
        </Grid>
      </Grid>
    );
}
