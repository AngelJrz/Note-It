import React from 'react'
import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';

const useStyle = makeStyles(theme => ({
    root: {
        top: createTheme({
            spacing: 6
        })
    }
}))

export default function Notificacion(props) {

    const { notificar, setNotificar} = props;
    const classes = useStyle();

    const controlarApertura = (event, reason) => {
        setNotificar({
            ...notificar,
            abrir: false
        })
    }

    return (
      <Snackbar
        className={classes.root}
        open={notificar.abrir}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={controlarApertura}
      >
        <Alert
          severity={notificar.tipo}
          onClose={controlarApertura}
          sx={{
            width: "100%",
            fontSize: "16px",
          }}
        >
          {notificar.mensaje}
        </Alert>
      </Snackbar>
    );
}
