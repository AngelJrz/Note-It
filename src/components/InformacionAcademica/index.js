import React from 'react';
import Paper from "@mui/material/Paper";
import { Divider, Typography } from '@mui/material';
import './index.css';
import { Link } from 'react-router-dom';

export default function InformacionAcademica(props) {
    const { informacionAcademica } = props;

    return (
      <Paper elevation={3} className="informacionAcademica-paper">
        <section>
          <Typography variant="h4" component="h4">
            Información académica
          </Typography>

          <Typography variant="h5" component="h5" gutterBottom>
            Carrera
          </Typography>
          <Divider />

          <Typography gutterBottom>
            <Link to={`/busqueda?carrera=${informacionAcademica.carrera.id}`}>
              {informacionAcademica.carrera.nombre}
            </Link>
          </Typography>

          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            className="titulo-info"
          >
            Materia
          </Typography>
          <Divider />
          <Typography gutterBottom>
            <Link
              to={`/busqueda?carrera=${informacionAcademica.carrera.id}&materia=${informacionAcademica.materia.id}`}
            >
              {informacionAcademica.materia.nombre}
            </Link>
          </Typography>

          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            className="titulo-info"
          >
            Tema
          </Typography>
          <Divider />
          <Typography gutterBottom>
            <Link
              to={`/busqueda?carrera=${informacionAcademica.carrera.id}&materia=${informacionAcademica.materia.id}&tema=${informacionAcademica.tema.id}`}
            >
              {informacionAcademica.tema.nombre}
            </Link>
          </Typography>
        </section>
      </Paper>
    );
}
