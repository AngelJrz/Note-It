import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";


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
                        <Button variant="contained" size="small" onClick={IrADetalles}>Explorar lista</Button>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
} 