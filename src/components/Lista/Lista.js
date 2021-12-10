import "./Lista.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Lista(props){
    const { lista } = props;
    const history = useHistory();

    function IrADetalles() {
        history.push({
            pathname: '/detalles-lista',
            state: { detail: lista }
        });
    }
    
    return( 
        <Grid item xs={8} md={5}>
            <Card id="cardLista">
                <CardContent>
                    <Typography id="nombreLista"  gutterBottom>
                        {lista.nombre}
                    </Typography>
                    <Typography id="descripcionLista" component="div">
                        {lista.descripcion}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        <Button variant="contained" size="small" onClick={IrADetalles}>Explorar lista</Button>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
} 