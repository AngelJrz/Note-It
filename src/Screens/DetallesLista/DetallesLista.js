import React, {useContext} from 'react';
import Nota from '../../components/Nota/Nota'
import './DetallesLista.css'
import Divider from '@mui/material/Divider';
import contextoEstudiante from '../../context/UserContext';
import './DetallesLista.css'
// import { ObtenerLista } from '../../hooks/Listas';

export default function DetallesLista(props){
    // let idLista = props.match.params.id;
    // console.log('llego a detalles ' + idLista);
    // const {datosEstudiante} = useContext(contextoEstudiante);
    // const { lista } = ObtenerLista(datosEstudiante.estudiante.id, idLista, datosEstudiante.token);
    const lista = props.location.state.detail;

    return( 
        <div>
            <h1 id="tituloDetalle">{lista.nombre}</h1>
            <p id="descripcionDetalleLista">{lista.descripcion}</p>
            <Divider />
            <div className="row center" id="coleccionDetallesLista">
                {
                   lista ? lista.notas.map(nota => <Nota nota={nota}></Nota>) : <p>No se obtuvieron notas de respuesta</p> 
                }
            </div>
        </div>
        
    );
}