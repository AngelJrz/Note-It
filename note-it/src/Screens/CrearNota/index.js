import React from 'react'

import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import useStyles from './styles';
import CreacionNota from '../../components/CreacionNota';

export default function CrearNota() {

  const styles = useStyles();

  return (
    <Grid container className={styles.container}>
      <Grid item>
        <Paper elevation={3} className={styles.formulario}>
          <h1>Crear nueva nota</h1>
          <CreacionNota />
        </Paper>
      </Grid>
    </Grid>
  );
}


