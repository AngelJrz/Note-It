import React, { useState } from 'react'
import Boton from "../Boton";
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";



import './index.css'

export default function BarraBusqueda() {
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const history = useHistory();

    const offsetDefault = 0;

    const realizarBusqueda = (e) => {
        e.preventDefault();

        history.push({
          pathname: "/busqueda",
          search: `?q=${textoBusqueda}`,
        });
    }

    const actualizarTextoBusqueda = (e) => {
        setTextoBusqueda(e.target.value);
    }

    return (
      <form onSubmit={realizarBusqueda}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <fieldset>
              <input
                type="text"
                required
                placeholder="Buscar en título o cuerpo de la nota..."
                value={textoBusqueda}
                onChange={actualizarTextoBusqueda}
                className="busqueda"
              />
            </fieldset>
          </Grid>
          <Grid item>
            {/* <Boton texto="Buscar" tipo="boton principal" /> */}
            <IconButton aria-label="Buscar">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    );
}
