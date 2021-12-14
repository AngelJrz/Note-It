import React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { formatearFecha } from '../../utilerias/administrarFechas';
import { Avatar, Divider } from '@mui/material';
import { generarLetrasAvatar } from '../../utilerias/generarAvatar';
import './index.css';

export default function Comentario(props) {
    const { comentario } = props;

    return (
      <Paper
        className='comentario'
      >
        <section className='seccion-top-comentario'>
          <Avatar {...generarLetrasAvatar(comentario.usuario)} />
          <Typography
            variant="h6"
            gutterBottom
            component="h6"
          >
            <Link to={`/estudiante/${comentario.usuario}`}>
              <span>{comentario.usuario}</span>
            </Link>
          </Typography>
        </section>

        <Divider />

        <Typography
          variant="body1"
          gutterBottom
          component="p"
        >
          {comentario.contenido}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          component="span"
        >
          {formatearFecha(comentario.fecha)}
        </Typography>
      </Paper>
    );
}
