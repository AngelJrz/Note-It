import React, {useContext} from 'react';
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
      EliminarNota(nota[0].id).then(resultado => {
        const lskadjf = resultado;
        if (resultado.exitoso) {
          alert('Se elimino la nota: ' + nota[0].id);
          history.push('/');
        } else {
          alert('No se elimino');
        }
      });
    }
    
    return( 
      <div>
      {
        nota && nota.map(n => (
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper elevation={3} sx={{ padding: 2.5, marginTop: 4 }}>
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

                    <Button variant="outlined" color="secondary" startIcon={<EditIcon />}>Editar</Button>
                  </Stack>
                  :
                  <p></p>
                  }
              </Paper>
            </Grid>

            <Grid item xs={4}>
               <Paper elevation={3} sx={{ padding: 2.5, marginTop: 4 }} justifyContent="center" style={{textAlign: "center"}}>
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
      </div>
    );
}