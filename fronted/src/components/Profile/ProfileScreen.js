import styled from '@emotion/styled';
import { alpha, Button, Container, Grid, Switch, TextField, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { flexbox } from '@mui/system';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/authContext';



export const ProfileScreen = () => {

  const { user } = useContext(AuthContext);
  const [editForm, setEditForm] = React.useState(true);
  const [formValues, setFormValues] = React.useState(user)



  console.log(user);
  return (
    <Container>
      <Grid sx={{mt: 2}} container spacing={2}>
          <Grid item md={10} xs={12}>
            <Typography
                variant="h6"
                sx={{
                  mr: 2,

                  fontFamily: "monospace",
                  fontWeight: 600,

                  color: "black",
                  textDecoration: "none",
                }}
              >
                Perfil
              </Typography>
              <hr/>
          </Grid>
          <Grid item md={2} >
            <Switch  onChange={() => setEditForm(!editForm)}  defaultChecked />
          </Grid>
          <Grid item md={5} xs={12}>
          <TextField sx={{width: "100%"}} defaultValue={formValues.nombre} id="outlined-basic" label="Nombre" variant="outlined" disabled={editForm} />
          </Grid>
          <Grid item md={5} xs={12}>
          <TextField sx={{width: "100%"}} defaultValue={formValues.apellido} id="outlined-basic" label="Apellido" variant="outlined"  disabled={editForm} />
          </Grid>
          <Grid item md={5}xs={12} >
          <TextField sx={{width: "100%"}} defaultValue={formValues.correo} id="outlined-basic" label="Correo" variant="outlined" disabled={editForm} />
          </Grid>
          <Grid item md={5} xs={12}>
          <TextField sx={{width: "100%"}} defaultValue={formValues.celular} id="outlined-basic" label="Celular" variant="outlined" disabled={editForm} />
          </Grid>
          <Grid item md={12} xs={12}>
          <Button 
          sx={{
            backgroundColor: "#163172",
            color: "white",
            "&:hover": {
              backgroundColor: "#1d4197",
              transition: "0.4s",
            },
            "&:disabled": {
              background: "#cfcfcf",
            },
          }}
        
        >
          Guardar
        </Button>
          </Grid>
        
       
      </Grid>
    </Container>
  )

  }