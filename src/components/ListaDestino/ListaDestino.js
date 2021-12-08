import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import contextoEstudiante from '../../context/UserContext';
import { ServicioAgregarNotaALista } from '../../services/listas';
import Progreso from '../Progreso';
import Notificacion from '../Notificacion';


export default function ListaDestino(props){
    const { lista, nota } = props;
    const {datosEstudiante} = useContext(contextoEstudiante);
    const [abrirProgreso, setAbrirProgreso] = useState(false);
    const [notificar, setNotificar] = useState({
      abrir: false,
      mensaje: "",
      tipo: "success",
    });

    function guardarNotaEnLista() {
        setAbrirProgreso(true);
        ServicioAgregarNotaALista({nota: nota}, lista.id, datosEstudiante.token)
        .then(resultado => {
            setAbrirProgreso(false);
            if (resultado.exitoso) {
                setNotificar({
                  ...notificar,
                  abrir: true,
                  mensaje: resultado.mensaje,
                });
              } else {
                setAbrirProgreso(false);
                setNotificar({
                  abrir: true,
                  mensaje: resultado.mensaje,
                  tipo: "error",
                });
              }
        }).catch(error => {
            setAbrirProgreso(false);
                setNotificar({
                  abrir: true,
                  mensaje: error.mensaje,
                  tipo: "error",
                });
        })
    }
    
    return( 
        <Grid item xs={8} md={5}>
            <Card sx={{ maxWidth: 650, minHeight: 150, marginTop:2, marginLeft: 'auto', marginRight: 'auto', boxShadow: 3, }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}  gutterBottom>
                        {lista.nombre}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} component="div">
                        {lista.descripcion}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        <Button variant="contained" color="success" size="small" onClick={guardarNotaEnLista}>Agregar</Button>
                    }
                </CardActions>
            </Card>
            <Progreso abrir={abrirProgreso} />
            <Notificacion notificar={notificar} setNotificar={setNotificar} />
        </Grid>
    );
} 