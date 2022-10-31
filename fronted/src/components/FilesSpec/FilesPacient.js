import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
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

  const theme = useTheme();

  const showComponentFiles = (id) => {
    setIdPaciente(id);
    setShowPacientes(false);
    setShowFiles(true);
  };

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${process.env.REACT_APP_API_URL}/specialists/pacientes/${user.id}`)
      .then(function (response) {
        if(isMounted){
          const data = []
          response.data.forEach((element) => {
            data.push(element.usuarios)
          });
          console.log(data);
          setPacientes(data);
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
      
      {showPacieentes && pacientes.map((paciente) => (
         <Card key={paciente.id} sx={{ display: 'flex', maxWidth: 250, height: 80, padding: 2 }}>
         <Grid container columnSpacing={2}>
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
       
       
 
         </Grid>
       
     </Card>)) }
      
     {showFiles && <UploadFilePacient
      user={user}
      idPaciente={idPaciente}
     />}
     
    </div>
  )
}
