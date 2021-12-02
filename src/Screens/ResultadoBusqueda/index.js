import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import "./index.css"
import { useNotas } from '../../hooks/useNotas';
import Nota from "../../components/Nota/Nota";
import Paginacion from '../../components/Paginacion';
import { Pagination } from '@mui/material';
import { useHistory } from "react-router-dom";


export default function ResultadoBusqueda() {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);

    const texto = searchParams.get("q");
    const offset = searchParams.get("offset");
    const history = useHistory();
    const [pagina, setPagina] = useState(offset && parseInt(offset) + 1);  
    console.log("offset", offset);

    const { notas } = useNotas({ texto, offset });

    const administrarPagina = (_, value) => {
      setPagina(value)

      /**
       * 
       * Para el limit se puede evitar para la consulta a la API, sin embargo se puede utilizar en el código para ir limitando notas
       * por página.
       * 
       */

      const offsetNuevo = (value - 1) * 1;
      history.push({
        pathname: "/busqueda",
        search: `?q=${texto}&offset=${offsetNuevo}`,
      });
    }

    return (
      <Grid container spacing={2} className="container">
        <Grid item xs={4}>
          <Paper elevation={3} className="paper">
            <h1>Filtros</h1>

            <form>
              <fieldset></fieldset>

              <button>Buscar</button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={3} className="paper">
            <h1 className="titulo-resultado">Resultado de la búsqueda: </h1>
            <h2 className="texto-busqueda">"{texto}"</h2>
            <section className="row center">
              {notas &&
                notas.map((nota) => <Nota key={nota.id} nota={nota}></Nota>)}
            </section>

            {/* <Paginacion /> */}

            <Pagination count={notas && Math.ceil(notas.length / 1)} page={pagina} onChange={administrarPagina}/>
          </Paper>
        </Grid>
      </Grid>
    );
}
