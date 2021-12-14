import React from 'react';
import './PerfilEstudiante.css'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { BuscarEstudiante } from '../../hooks/useEstudiante';
import { generarLetrasAvatar } from '../../utilerias/generarAvatar';

export default function PerfilEstudiante(props){
    let usuario = props.match.params.usuario;
    const { estudiante } = BuscarEstudiante(usuario);
    
    return( 
      <div>
        <Grid container spacing={2} justifyContent="center" id="gridPerfilEstudiante">
          <Grid item xs={8}>
            <Paper elevation={3} id="paperPerfilEstudiante" >
                <Avatar {...generarLetrasAvatar(`${estudiante.nombres} ${estudiante.apellidos}`)} id="avatarPerfilAutor"/>
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