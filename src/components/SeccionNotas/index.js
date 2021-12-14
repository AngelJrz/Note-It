import React from 'react';
import Paper from "@mui/material/Paper";
import Nota from "../../components/Nota/Nota";
import { Button } from '@mui/material';
import { useNotas } from '../../hooks/useNotas';
import CargaNotaSkeleton from "../../components/CargaNotaSkeleton";
import { useHistory } from "react-router-dom";
import './index.css';

export default function SeccionNotas(props) {
    const { titulo = "Notas", op, limit} = props;
    const history = useHistory();

    const { notas, cargandoNotas, errorBusqueda } = useNotas({ op, limit });

    const verTodas = () => {
      if (op) {
        history.push({
          pathname: "/busqueda",
          search: `?op=${op}`,
        });
      }
      else {
        history.push({
          pathname: "/busqueda",
        });
      }
    };

    return (
      <Paper elevation={3}>
        <section className="seccion">
          <h2>{titulo}</h2>

          <div className="row center">

            {cargandoNotas ? (
              <CargaNotaSkeleton />
            ) : errorBusqueda.error ? (
              <span>{errorBusqueda.mensaje}</span>
            ) : !cargandoNotas && notas.length > 0 ? (
              notas
                .map((nota) => <Nota key={nota.id} nota={nota}></Nota>)
            ) : (
              <span>No se encontraron notas con la búsqueda realizada.</span>
            )}
          </div>

          <div className="boton-ver-container">
            <Button variant="contained" onClick={verTodas}>Ver todas</Button>
          </div>
        </section>
      </Paper>
    );
}
