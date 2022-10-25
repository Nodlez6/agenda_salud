import styled from '@emotion/styled';
import { alpha, Box, Button, CircularProgress, Container, Grid, Switch, TextField, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { flexbox } from '@mui/system';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../auth/authContext';



export const ProfileScreen = () => {

  const { user } = useContext(AuthContext);
  const [editForm, setEditForm] = React.useState(true);
  const [formValues, setFormValues] = React.useState()
  const [spinner, setSpinner] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const url = (user.admin) ? `/specialists/${user.id}` : `/users/${user.id}`;
  const url2 = (user.admin) ? `/specialists/${user.id}` : `/users/${user.id}`;

  const notifyError = () =>
    toast.error("No se han guardado los cambios", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifySuccess = () =>
    toast.success("Se han guardado los cambios", {
      position: toast.POSITION.TOP_CENTER,
    });

  useEffect (() => {
    let isMounted = true;
    setSpinner(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}${url2}`)
      .then(function (response) {
        if (isMounted) {
          setFormValues({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            correo: response.data.correo,
            celular: response.data.celular,
          })
          setSpinner(false);
        }
      }
      )
      .catch(function (error) {
        console.log(error);
      }
      );
      return () => {
        isMounted = false;
      }

  }, [refresh])
  

  

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
    console.log(formValues);
  }

  const handleSubmmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setRefresh(!refresh);
    setEditForm(!editForm);
    axios.patch(`${process.env.REACT_APP_API_URL}${url}`, formValues)
      .then(function (response) {
       
        notifySuccess();
      }
      )
      .catch(function (error) {
        notifyError();
      }
      );
  };


  return (
    <Container>
      <ToastContainer />
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
          {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>) : (<> 
            <Grid item md={2} >
              <Switch  onChange={() => setEditForm(!editForm)}  defaultChecked />
            </Grid>
            <Grid item md={5} xs={12}>
            <TextField sx={{width: "100%"}} onChange={handleInputChange} name="nombre" defaultValue={formValues?.nombre} id="outlined-basic" label="Nombre" variant="outlined" disabled={editForm} />
            </Grid>
            <Grid item md={5} xs={12}>
            <TextField sx={{width: "100%"}} onChange={handleInputChange} name="apellido" defaultValue={formValues?.apellido} id="outlined-basic" label="Apellido" variant="outlined"  disabled={editForm} />
            </Grid>
            <Grid item md={5}xs={12} >
            <TextField sx={{width: "100%"}} onChange={handleInputChange} name="correo" defaultValue={formValues?.correo} id="outlined-basic" label="Correo" variant="outlined" disabled={editForm} />
            </Grid>
            <Grid item md={5} xs={12}>
            <TextField sx={{width: "100%"}} onChange={handleInputChange} name="celular" defaultValue={formValues?.celular} id="outlined-basic" label="Celular" variant="outlined" disabled={editForm} />
            </Grid>
            <Grid item md={12} xs={12}>
            <Button 
            disabled={editForm}
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
          onClick={handleSubmmit}
          >
            Guardar
          </Button>
          </Grid>
        </> )}
           
        
       
      </Grid>
    </Container>
  )

  }