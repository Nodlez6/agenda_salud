import { Box,CircularProgress, Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PatientsTable from "./PatientsTable";

export const PatientsScreen = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [patients, setPatients] = useState([]);
  const [spinner, setSpinner] = useState(false);
 // /pacientes/:idEspecialidad
  useEffect(() => {
    let isMounted = true;
    setSpinner(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/specialists/pacientes/${id}`)
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

          setPatients(unique);
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
    <>
      <Container sx={{mt: 3}}>
        {spinner ? ( <Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress size={"1.9rem"} />
            </Box>) : (<PatientsTable patients={patients} />)}
       
      </Container>
    </>
  );
};
