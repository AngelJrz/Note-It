import React, {useContext, useState} from 'react';
import './DetallesNota.css'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { EliminarNota, ObtenerNota } from '../../hooks/Notas.js';
import contextoEstudiante from '../../context/UserContext';
import { useHistory } from "react-router-dom";
import Notificacion from "../../components/Notificacion/index";
import Progreso from "../../components/Progreso";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DetallesNota(props){
    let idNota = props.match.params.id;
    const { nota } = ObtenerNota(idNota);
    const history = useHistory();
    const {datosEstudiante} = useContext(contextoEstudiante);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [abrirProgreso, setAbrirProgreso] = useState(false);
    const [notificar, setNotificar] = useState({
      abrir: false,
      mensaje: "",
      tipo: "success",
    });

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    function eliminaNota() {
      setAbrirProgreso(true);
      EliminarNota(nota[0].id, datosEstudiante.token)
      .then(respuesta => {
        setAbrirProgreso(false);
        if (respuesta.exitoso) {
          handleClose();
          setNotificar({
            ...notificar,
            abrir: true,
            mensaje: respuesta.mensaje,
          });
          history.push("/");
        } else {
          setAbrirProgreso(false);
          setNotificar({
            abrir: true,
            mensaje: respuesta.mensaje,
            tipo: "error",
          });
        }
      });
    }

    function AgregarALista() {
      history.push({
        pathname: '/listas',
        state: { detail: idNota }
      });
    }
    
    return( 
      <div>
      {
        nota && nota.map(n => (
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper elevation={3} sx={{ padding: 2.5, marginTop: 7  }}>
                  <Typography variant="h4" gutterBottom component="div">
                      <h1>{n.titulo}</h1>
                  </Typography>
                  <Divider />
                  <Typography variant="h5" gutterBottom component="div" sx={{ marginTop: 1 }}>
                      {n.autor.nombres}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                      <div className="post__description" dangerouslySetInnerHTML={{ __html: n.cuerpo}}  />
                  </Typography>
                  {
                    datosEstudiante !== null && datosEstudiante.estudiante.usuario === n.autor.usuario ?
                  <Stack direction="row" spacing={2} sx={{ marginTop: 4, flexDirection: "row-reverse" }}>
                    <Button onClick={handleOpen} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ marginLeft: 2}}>Eliminar</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          ¿Está seguro que desea eliminar la nota?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Esta acción desaparecerá la información de nuestro sistema.
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ marginTop: 3, flexDirection: "row-reverse" }}>
                          <Button onClick={handleClose} variant="contained" color="error" sx={{ marginLeft: 2}}>Cancelar</Button>
                          <Button onClick={eliminaNota} variant="contained" color="success">Sí</Button>
                        </Stack>
                      </Box>
                    </Modal>

                    <Button variant="outlined" color="secondary" startIcon={<EditIcon />} sx={{ marginLeft: 2}}>Editar</Button>
                    <Button onClick={AgregarALista} variant="outlined" color="success" startIcon={<PlaylistAddIcon />}>Añadir a lista</Button>
                  </Stack>
                  :
                  datosEstudiante !== null ?
                  <Stack direction="row" spacing={2} sx={{ marginTop: 4, flexDirection: "row-reverse" }}>
                    <Button onClick={AgregarALista} variant="outlined" color="success" startIcon={<PlaylistAddIcon />}>Añadir a lista</Button>
                  </Stack>
                  :
                  <p></p>
                  }
              </Paper>
            </Grid>

            <Grid item xs={4} sx={{ marginTop: 7  }}>
               <Paper elevation={3} sx={{ padding: 2.5 }} justifyContent="center" style={{textAlign: "center"}}>
                    <Avatar {...stringAvatar(`${n.autor.nombres} ${n.autor.apellidos}`)} sx={{ width: 80, height: 80, margin: "0 auto"}}/>
                    <Typography variant="h6" gutterBottom component="div" sx={{marginTop: 1 }}>
                    <Link to={`/estudiante/${n.autor.usuario}`}>
                      <span>{n.autor.nombres}</span>
                    </Link>
                    
                    </Typography>
                    <Divider />
                    <Typography variant="body2" gutterBottom component="div" sx={{marginTop: 1 }}>
                    {n.autor.biografia}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={8}>
                <Paper elevation={3} sx={{ padding: 2.5, marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Comentarios
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                              <TextField
                          id="outlined-textarea"
                          label="Comentario"
                          placeholder="Comentario"
                          multiline
                        />
                    </Box>
                </Paper>
            </Grid>
          </Grid>
        ))
      }
        <Progreso abrir={abrirProgreso} />
        <Notificacion notificar={notificar} setNotificar={setNotificar} />
      </div>
    );
}