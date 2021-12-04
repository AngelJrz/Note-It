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
import NotaSkeleton from '../../components/NotaSkeleton';


function ResultadoBusqueda() {
    const {search} = useLocation();
    
    const searchParams = new URLSearchParams(search);

    const texto = searchParams.get("q") || "";
    const carrera = searchParams.get("carrera") || "";
    const materia = searchParams.get("materia") || "";
    const tema = searchParams.get("tema") || "";
    const op = searchParams.get("op") || "";

    const { notas, limiteDeNotas, cargandoNotas, errorBusqueda } = useNotas({ texto, carrera, materia, tema, op });
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

            {/* {notas && notas.length > 0 ? (
              <Filtros texto={texto} carrera={carrera} materia={materia} tema={tema} op={op}/>
            ) : (
              <span>No se encontraron notas con la búsqueda realizada.</span>
            )} */}

            {notas && notas.length > 0 ? (
              <Filtros
                texto={texto}
                carrera={carrera}
                materia={materia}
                tema={tema}
                op={op}
              />
            ) : (
              <Filtros cargar={false} />
            )}

            {/* {!cargandoNotas ?
              (<Filtros
                texto={texto}
                carrera={carrera}
                materia={materia}
                tema={tema}
                op={op}
              />) : <></>
            } */}
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={3} className="paper">
            <h1 className="titulo-resultado">Resultado de la búsqueda: </h1>
            <h2 className="texto-busqueda">"{texto}"</h2>

            <section className="row center">
              {cargandoNotas ? (
                <div className="row center">
                  <NotaSkeleton />
                  <NotaSkeleton />
                  <NotaSkeleton />
                </div>
              ) : errorBusqueda.error ? (
                <span>{errorBusqueda.mensaje}</span>
              ) : !cargandoNotas && notas.length > 0 ? (
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
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
                className="paginacion"
              />
            ) : (
              <></>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
}

export default React.memo(ResultadoBusqueda);