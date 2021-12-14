import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import './index.css'
import { obtenerCadenaSinEspacios } from '../../utilerias/administrarCadenas';
import { LARGO_INCORRECTO } from '../../utilerias/constantes';

export default function BarraBusqueda() {
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const history = useHistory();

    const realizarBusqueda = (e) => {
      e.preventDefault();

      setTextoBusqueda(obtenerCadenaSinEspacios(textoBusqueda))

      if (textoBusqueda.trim().length === LARGO_INCORRECTO) return;

      window.localStorage.setItem("texto", textoBusqueda);

      history.push({
        pathname: "/busqueda",
        search: `?q=${textoBusqueda}`,
      });

      setTextoBusqueda("");
    };

    const actualizarTextoBusqueda = (e) => {
        setTextoBusqueda(e.target.value);
    }

    return (
      <form onSubmit={realizarBusqueda}>
        <Grid
          container
          spacing={3}
          className='barra-busqueda'
        >
          <Grid item xs={8}>
              <input
                type="text"
                required
                placeholder="Buscar en título o cuerpo de la nota..."
                value={textoBusqueda}
                onChange={actualizarTextoBusqueda}
                className="busqueda"
                title='Ingresa una cadena de búsqueda'
              />
          </Grid>
          <Grid item>
            <IconButton aria-label="Buscar" type='submit'>
              <SearchIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </form>
    );
}
