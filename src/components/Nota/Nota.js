import * as React from 'react';
import './Nota.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useHistory } from "react-router-dom";
import { Avatar, CardMedia } from '@mui/material';
import { generarLetrasAvatar } from '../../utilerias/generarAvatar';
import { formatearFecha } from '../../utilerias/administrarFechas';



export default function Nota(props){
    const { nota } = props;
    const history = useHistory();

    const irANota = () => {
        history.push(`/Nota/${nota.id}`);
    }
    
    return (
      <Card className="nota">
        <CardMedia component="img" image={nota.imagen} className="imagen" />
        <CardContent>
          <section className="seccion-top">
            <Avatar
              {...generarLetrasAvatar(
                `${nota.autor.nombres} ${nota.autor.apellidos}`
              )}
            />

            <div className="seccion-top-info">
              <h4>{nota.autor.usuario}</h4>
              <p>{formatearFecha(nota.fechaCreacion)}</p>
            </div>
          </section>

          <section className="seccion-centro">
            <h4>{nota.titulo}</h4>
          </section>
        </CardContent>
        <CardActions>
          <section className="seccion-bottom">
            <div className="seccion-bottom-visualizaciones">
              <VisibilityOutlinedIcon />
              <span>{nota.visualizaciones}</span>
            </div>

            <div className="seccion-bottom-esUtil">
              <ThumbUpIcon />
              <span>{nota.esUtil}</span>
            </div>

            <div className="seccion-bottom-opcion">
              <Button
                variant="contained"
                size="small"
                onClick={irANota}
              >
                Leer
              </Button>
            </div>
          </section>
        </CardActions>
      </Card>
    );
} 