import './DetallesNota.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Boton from '../../components/Boton';
import Divider from '@mui/material/Divider';
import { useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Progreso from "../../components/Progreso";
import React, {useContext, useState} from 'react';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComentarNota } from '../../services/notas';
import contextoEstudiante from '../../context/UserContext';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Notificacion from "../../components/Notificacion/index";
import { EliminarNota, ObtenerNota } from '../../hooks/Notas.js';
import { generarLetrasAvatar } from '../../utilerias/generarAvatar';
import { formatearFecha } from '../../utilerias/administrarFechas';
import Comentario from '../../components/Comentario';
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

    function irAEditarNota() {
      history.push({
        pathname: `/nota/${idNota}/editar`
      });
    }
    
    function enviarComentario(e) {
      e.preventDefault();
      setAbrirProgreso(true);
      const comentario = document.getElementById('comentarioDeNota');
      const nuevoComentario = {
        usuario: datosEstudiante.estudiante.usuario,
        contenido: comentario.value
      }

      ComentarNota(idNota, nuevoComentario, datosEstudiante.token)
      .then(respuesta => {
        setAbrirProgreso(false);
        if (respuesta.exitoso) {
          handleClose();
          setNotificar({
            ...notificar,
            abrir: true,
            mensaje: respuesta.mensaje,
          });
          history.go(0)
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
    
    return (
      <div>
        {nota &&
          nota.map((n) => (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Paper elevation={3} className='paperNota'>
                  <div className="previewImagen">
                    <img
                      src={n.imagen}
                      alt={`Imagen para la nota ${n.titulo}`}
                      title={`Imagen para la nota ${n.titulo}`}
                    />
                  </div>
                  <Typography variant="h4" gutterBottom component="div">
                    <h1>{n.titulo}</h1>
                  </Typography>

                  <section className='seccion-info-basica'>
                    <Typography variant="span" gutterBottom component="div">
                      {formatearFecha(n.fechaCreacion)}
                    </Typography>

                    <div className="seccion-bottom-visualizaciones">
                      <VisibilityOutlinedIcon />
                      <span>{n.visualizaciones}</span>
                    </div>

                    <div className="seccion-bottom-esUtil">
                      <ThumbUpIcon />
                      <span>{n.esUtil}</span>
                    </div>
                  </section>

                  <Divider />
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    id='autorDeNota'
                  >
                    {`${n.autor.nombres} ${n.autor.apellidos}`}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <div
                      className="post__description"
                      dangerouslySetInnerHTML={{ __html: n.cuerpo }}
                    />
                  </Typography>
                  {datosEstudiante !== null &&
                  datosEstudiante.estudiante.usuario === n.autor.usuario ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      id='contenedorDeBotones'
                    >
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        id='botonEliminar'
                      >
                        Eliminar
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            ¿Está seguro que desea eliminar la nota?
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            id='infoModal'
                          >
                            Esta acción desaparecerá la información de nuestro
                            sistema.
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            id="contenedorDeBotonesModal"
                          >
                            <Button
                              onClick={handleClose}
                              variant="contained"
                              color="error"
                              id="botonEliminarModal"
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={eliminaNota}
                              variant="contained"
                              color="success"
                            >
                              Sí
                            </Button>
                          </Stack>
                        </Box>
                      </Modal>

                      <Button
                        onClick={irAEditarNota}
                        variant="outlined"
                        color="secondary"
                        startIcon={<EditIcon />}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={AgregarALista}
                        variant="outlined"
                        color="success"
                        startIcon={<PlaylistAddIcon />}
                      >
                        Añadir a lista
                      </Button>
                    </Stack>
                  ) : datosEstudiante !== null ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      id="contenedorBasico"
                    >
                      <Button
                        onClick={AgregarALista}
                        variant="outlined"
                        color="success"
                        startIcon={<PlaylistAddIcon />}
                      >
                        Añadir a lista
                      </Button>
                    </Stack>
                  ) : (
                    <p></p>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={4} id='perfilAutor'>
                <Paper
                  elevation={3}
                  id="paperAutor"
                  justifyContent="center"
                  style={{ textAlign: "center" }}
                >
                  <Avatar
                    {...generarLetrasAvatar(
                      `${n.autor.nombres} ${n.autor.apellidos}`
                    )}
                    id="avatarAutor"
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    id="nombreAutor"
                  >
                    <Link to={`/estudiante/${n.autor.usuario}`}>
                      <span>{n.autor.nombres}</span>
                    </Link>
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body2"
                    gutterBottom
                    component="div"
                    id="biografiaAutor"
                  >
                    {n.autor.biografia}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={8}>
                <Paper elevation={3} id="paperAreaComentarios">
                  <Typography variant="h6" gutterBottom component="div">
                    Comentarios
                  </Typography>
                  {datosEstudiante !== null ? (
                    <form className="" onSubmit={enviarComentario}>
                      <input
                        type="text"
                        id="comentarioDeNota"
                        placeholder="Comentario"
                        name="comentario"
                        required
                      ></input>
                      <Boton texto="Enviar" tipo="boton principal" />
                    </form>
                  ) : (
                    <p></p>
                  )}

                  {n.comentarios.length > 0 ? (
                    n.comentarios.map((comentario) => (
                      <Comentario comentario={comentario}/>
                    ))
                  ) : (
                    <Paper
                      id="paperComentario"
                      justifyContent="left"
                      style={{ textAlign: "center" }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        id='errorComentarios'
                      >
                        No cuenta con comentarios
                      </Typography>
                    </Paper>
                  )}
                </Paper>
              </Grid>
            </Grid>
          ))}
        <Progreso abrir={abrirProgreso} />
        <Notificacion notificar={notificar} setNotificar={setNotificar} />
      </div>
    );
}