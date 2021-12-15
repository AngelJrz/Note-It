import React from 'react';
import { Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import { Divider } from '@mui/material';
import './index.css'

export default function NotFound() {
    return (
      <Grid container className="container">
        <Grid item>
          <Paper elevation={3} className='notFound-paper'>
            <h1>Not Found</h1>
            <Divider />
            <p>Lo sentimos, esta página no fue encontrada.</p>
            <Link to="/">Ir a inicio</Link>
          </Paper>
        </Grid>
      </Grid>
    );
}
