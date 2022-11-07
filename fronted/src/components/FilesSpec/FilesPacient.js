import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography, CircularProgress } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../auth/authContext';
import { UploadFilePacient } from './UploadFilePacient';
import axios from 'axios';

export const FilesPacient = () => {
  const { user } = useContext(AuthContext);
  const [pacientes, setPacientes] = React.useState([]);
  const [idPaciente, setIdPaciente] = React.useState("");
  const [showPacieentes, setShowPacientes] = React.useState(true);
  const [showFiles, setShowFiles] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);

  const theme = useTheme();

  const showComponentFiles = (id) => {
    setIdPaciente(id);
    setShowPacientes(false);
    setShowFiles(true);
  };

  useEffect(() => {
    let isMounted = true;
    setSpinner(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/specialists/pacientes/${user.id}`)
      .then(function (response) {
        if(isMounted){
          const data = []
          response.data.forEach((element) => {
            data.push(element.usuarios)
          });
          const uniqueObj = []
          //remove duplicates from array
          const unique = data.filter(elem => {
            const isDuplicate = uniqueObj.includes(elem.id);
            if(!isDuplicate){
              uniqueObj.push(elem.id)
              return true
            }
            return false
          })
          setPacientes(unique);
          setSpinner(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    }
  }, []);


  return (
    <div>
      {spinner && <Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress size={"1.9rem"} />
            </Box>}
      {showPacieentes && 
       (<Grid container columnSpacing={2} rowSpacing={2}>
        
          {pacientes.map((paciente) => (
            <Grid key={paciente.id} item xs={9}  md={3}>
              <Card  sx={{ display: 'flex', maxWidth: 250, height: 80, padding: 2 }}>
                <Grid item xs={9} sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: 1}}>
                  
                    <Typography sx={{fontSize: 15}}>
                      {paciente.nombre} {paciente.apellido}
                    </Typography>
                    <Button onClick={() => showComponentFiles(paciente.id)} sx={{backgroundColor: "#163172",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1d4197",
                        transition: "0.4s",
                      }}}>
                      <Typography sx={{fontSize: 11}}>
                        Archivos
                      </Typography>
                    </Button>
      
                </Grid>
              
              <Grid item xs={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                <AccountCircleIcon sx={{ width: 50, height: 50, color: "#163172" }} />
              </Grid>
            </Card>
            </Grid>))}
     </Grid>)} 
      
     {showFiles && <UploadFilePacient
      user={user}
      idPaciente={idPaciente}
     />}
     
    </div>
  )
}
