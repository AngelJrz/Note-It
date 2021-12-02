import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Logout from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Mi perfil">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 50, height: 50 }}>{usuario.estudiante.nombres.substring(0, 2).charAt(0).toUpperCase() + usuario.estudiante.nombres.substring(0, 2).charAt(1)}</Avatar>
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
          <Avatar /><Link to={`/estudiante/${usuario.estudiante.usuario}`}>Mi Perfil</Link>
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
          Mis listas
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
