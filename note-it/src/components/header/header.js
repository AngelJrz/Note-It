import './header.css'
import React, {useContext} from 'react'
import contextoEstudiante from '../../context/UserContext';
import { Link } from 'react-router-dom';
import noteItLogo from '../../images/noteit.png';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AvatarPerfil from '../avatar/avatar';

export default function Header(props){
  const {datosEstudiante} = useContext(contextoEstudiante);

    return( 
        <header className="row header">
        <div>
          <Link to="/">
            <img src={noteItLogo} alt="Logo" className="logoHeader"/>
          </Link>
        </div>
        <div>
          {
            datosEstudiante != null && datosEstudiante.token ? 
            <AvatarPerfil usuario={datosEstudiante}/> 
            :
            <div> 
              <Stack spacing={2} direction="row">
                <Link to="/login"><Button variant="contained">Inicia sesión</Button></Link>
                <Link to="/registro"><Button variant="outlined">Registrarse</Button></Link>
              </Stack>
            </div>
          }
        </div>
      </header>
    );
} 