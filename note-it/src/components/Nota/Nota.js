import * as React from 'react';
import './Nota.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";



export default function Nota(props){
    const { nota } = props;
    const history = useHistory();
    
    return( 
        <Card sx={{ maxWidth: 250, minHeight: 300, margin: 1 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {nota.autor.usuario}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }} component="div">
                    {nota.titulo}
                </Typography>
                <Typography variant="body2">
                {
                    nota.cuerpo
                }
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" onClick={() => history.push(`/Nota/${nota.id}`)}>Leer</Button>
            </CardActions>
        </Card>
    );
} 