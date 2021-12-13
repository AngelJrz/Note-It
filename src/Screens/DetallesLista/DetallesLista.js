import './DetallesLista.css'
import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Nota from '../../components/Nota/Nota'
import { useHistory } from "react-router-dom";

export default function DetallesLista(props){
    const lista = props.location.state.detail;
    const history = useHistory();

    function irPrincipal() {
        history.push('/');
    }

    return( 
        <div>
            <h1 id="tituloDetalle">{lista.nombre}</h1>
            <p id="descripcionDetalleLista">{lista.descripcion}</p>
            <Divider />
            <div className="row center" id="coleccionDetallesLista">
                {
                   lista.notas.length > 0? 
                   lista.notas.map(nota => <Nota nota={nota}></Nota>) 
                   : 
                   <div id='errorNotasDeLista'>
                        <p>No se obtuvieron notas de respuesta</p>
                        <Button variant="contained" color='success' size="small" onClick={irPrincipal}>Explorar notas</Button>
                   </div>
                }
            </div>
        </div>
        
    );
}