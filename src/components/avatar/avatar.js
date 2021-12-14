import './avatar.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import useUser from '../../hooks/useUser';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { generarLetrasAvatar } from '../../utilerias/generarAvatar';

export default function AvatarPerfil(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {logoutContext} = useUser();
  const open = Boolean(anchorEl);
  const {usuario} = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Salir = () => {
    logoutContext();
  }

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Mi perfil">
          <IconButton onClick={handleClick} size="small">
            <Avatar id="avatarImagen" {...generarLetrasAvatar(`${usuario.estudiante.nombres}${usuario.estudiante.apellidos}`)}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />
          <Link to={`/estudiante/${usuario.estudiante.usuario}`}>Mi Perfil</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <NoteAddIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/crear-nota">Crear una nota</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NoteAddIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/crear-lista">Crear una lista</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/listas">Mis listas</Link>
        </MenuItem>
        <MenuItem onClick={Salir}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
            Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
