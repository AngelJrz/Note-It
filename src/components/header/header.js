import './header.css'
import React, {useContext} from 'react'
import contextoEstudiante from '../../context/UserContext';
import { Link } from 'react-router-dom';
import noteItLogo from '../../images/noteit.png';
import Stack from '@mui/material/Stack';
import AvatarPerfil from '../avatar/avatar';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import BarraBusqueda from '../BarraBusqueda';

export default function Header(props){
  const {datosEstudiante} = useContext(contextoEstudiante);

    return (
      <header className="header">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <div className="logo-container">
              <Link to="/">
                <img src={noteItLogo} alt="Logo" className="logoHeader" />
              </Link>
            </div>
          </Grid>
          <Grid item xs={6}>
            <BarraBusqueda />
          </Grid>
          <Grid item xs>
            {datosEstudiante && datosEstudiante.token ? (
              <div className='logo-container'>
                <AvatarPerfil usuario={datosEstudiante} />
              </div>
            ) : (
              <Stack spacing={2} direction="row" justifyContent="center">
                <Link
                  to="/login"
                  className='enlace'
                >
                  Iniciar sesión
                </Link>
                <Divider orientation="vertical" flexItem variant="middle" />
                <Link to="/registro" className='enlace'>
                  Registrarse
                </Link>
              </Stack>
            )}
          </Grid>
        </Grid>
      </header>
    );
} 