import './ListasScreen.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useHistory } from "react-router-dom";
import Lista from '../../components/Lista/Lista'
import React, {useContext, useEffect} from 'react';
import contextoEstudiante from '../../context/UserContext';
import { ObtenerListasEstudiante } from '../../hooks/Listas';
import ListaDestino from '../../components/ListaDestino/ListaDestino';

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

    function irACrearLista() {
        history.push('/crear-lista');
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
                        listas.data.length > 0 ? seAgrega ? listas.data.map(lista => <ListaDestino lista={lista} nota={idNota}></ListaDestino>) : listas.data.map(lista => <Lista lista={lista}></Lista>)
                        : 
                        <div id='errorDeLista'>
                            <p>No se obtuvieron listas de respuesta</p>
                            <Button variant="contained" color='success' size="small" onClick={irACrearLista}>Crear lista</Button>
                        </div>
                    }
                </Grid>
            </Box>
        </div>

    );
}