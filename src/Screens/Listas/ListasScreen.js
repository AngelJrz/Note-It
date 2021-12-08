import React, {useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { ObtenerListasEstudiante } from '../../hooks/Listas';
import contextoEstudiante from '../../context/UserContext';
import Lista from '../../components/Lista/Lista'
import ListaDestino from '../../components/ListaDestino/ListaDestino';
import './ListasScreen.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function ListasScreen(props){
    const history = useHistory();
    const {datosEstudiante} = useContext(contextoEstudiante);
    useEffect(() => {
        if (datosEstudiante === null) {
            history.push("/");
        }
    }, [])

    let seAgrega = false;
    let idNota = null;
    if (typeof props.location.state != 'undefined') {
        seAgrega = true;
        idNota = props.location.state.detail
    }
    
    const { listas } = ObtenerListasEstudiante(datosEstudiante.estudiante.id, datosEstudiante.token);

    return( 
        <div>
            {
                seAgrega ? <h1 id="tituloMisListas">¿A que lista deseas agregar la nota?</h1> : <h1 id="tituloMisListas">- Mis listas -</h1> 
            }
            <Divider />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container id='contenedorListas' spacing={2}>
                    {
                        listas ? seAgrega ? listas.data.map(lista => <ListaDestino lista={lista} nota={idNota}></ListaDestino>) : listas.data.map(lista => <Lista lista={lista}></Lista>) : <p>No se obtuvieron listas de respuesta</p> 
                    }
                </Grid>
            </Box>
        </div>

    );
}