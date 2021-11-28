import React, {useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import useStyles from './styles';
import CreacionNota from '../../components/CreacionNota';
import contextoEstudiante from '../../context/UserContext';

export default function CrearNota() {
  const history = useHistory();
  const {datosEstudiante} = useContext(contextoEstudiante);
  useEffect(() => { 
    if (datosEstudiante === null) {
        history.push("/");
    }
}, [])

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


