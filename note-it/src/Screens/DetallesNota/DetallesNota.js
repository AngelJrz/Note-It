import React from 'react';
import './DetallesNota.css'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function DetallesNota(props){
    let idNota = props.match.params.id;

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
    
    return( 
        // <Box
        //     sx={{
        //         display: 'flex',
        //         flexWrap: 'wrap',
        //         '& > :not(style)': {
        //         m: 1,
        //         width: 128,
        //         height: 128,
        //         },
        //     }}
        //     >

        // </Box>

        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Paper elevation={3} sx={{ padding: 2.5, marginTop: 4 }}>
                    <Typography variant="h4" gutterBottom component="div">
                        Titulo de la nota {idNota}
                    </Typography>
                    <Typography variant="h5" gutterBottom component="div">
                        Usuario Generico
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                        quasi quidem quibusdam.
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2.5, marginTop: 4 }}>
                    <Avatar {...stringAvatar('Usuario generico')} />
                    <Typography variant="h6" gutterBottom component="div" sx={{marginTop: 1 }}>
                        Usuario generico
                    </Typography>
                    <Typography variant="body2" gutterBottom component="div" sx={{marginTop: 1 }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur.
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
    );
}