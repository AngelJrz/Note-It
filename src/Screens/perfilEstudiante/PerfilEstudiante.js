import React from 'react';
import './PerfilEstudiante.css'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { BuscarEstudiante } from '../../hooks/useEstudiante';

export default function PerfilEstudiante(props){
    let usuario = props.match.params.usuario;
    const { estudiante } = BuscarEstudiante(usuario);

    function stringToColor(string) {
      let hash = 0;
      let i;
    
      
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }

  function stringAvatar(name) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
    
    return( 
      <div>
        <Grid container spacing={2} justifyContent="center" id="gridPerfilEstudiante">
          <Grid item xs={8}>
            <Paper elevation={3} id="paperPerfilEstudiante" >
                <Avatar {...stringAvatar(`${estudiante.nombres} ${estudiante.apellidos}`)} id="avatarPerfilAutor"/>
                <Typography variant="body1" gutterBottom component="div" id="usuarioAutor">
                  @{estudiante.usuario}
                </Typography>
                <Typography variant="h5" gutterBottom component="div" id="nombreAutor">
                  {estudiante.nombres} {estudiante.apellidos}
                </Typography>
                <Divider />
                <Typography  variant="body1" gutterBottom component="div" id="biografiaAutor">
                  {estudiante.biografia}
                </Typography>
                <Typography  variant="body2" gutterBottom component="div" id="correoAutor">
                  {estudiante.correo}
                </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}