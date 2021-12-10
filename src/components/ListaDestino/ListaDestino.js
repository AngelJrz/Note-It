import "./ListaDestino.css"
import Progreso from '../Progreso';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Notificacion from '../Notificacion';
import Typography from '@mui/material/Typography';
import React, {useContext, useState} from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import contextoEstudiante from '../../context/UserContext';
import { ServicioAgregarNotaALista } from '../../services/listas';


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
            <Card id="cardListaDestino">
                <CardContent>
                    <Typography id="nombreListaDestino" gutterBottom>
                        {lista.nombre}
                    </Typography>
                    <Typography id="descripcionListaDestino" component="div">
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