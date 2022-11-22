import Refresh from "@mui/icons-material/Refresh";
import { Button, Card, CardContent, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import { StaticDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../auth/authContext";
import DialogQuote from "./DialogQuote";

function toDate(dStr, format) {
  var now = new Date();
  if (format === "h:m") {
    now.setHours(dStr.substr(0, dStr.indexOf(":")));
    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
    now.setSeconds(0);
    return now;
  } else return "Invalid Format";
}

const formatSelectedDate = (data,quotesTaked ) => {
  let data_final = [];
  const dates_without_period = [];
  data.forEach((elem) => {
    if(elem.periodicidad !== 0){
      let cantidad, dia;
      (elem.periodicidad === 1) ? cantidad = 3 : cantidad = 1;
      (elem.periodicidad === 1) ? dia = 7 : dia = 14;
      for(let i = 0; i <= cantidad; i++) {
        const fecha_bdd = new Date(elem.fecha.slice(0,10) );
        const nueva_fecha = new Date();
        nueva_fecha.setDate(fecha_bdd.getDate() + i*dia + 1);
        let suma = (nueva_fecha.getDate() < 10) ? "0" : "";
        data_final.push({ fecha: nueva_fecha.getFullYear()+ '-' + (nueva_fecha.getMonth()+1) + '-' + suma + nueva_fecha.getDate(), desde: elem.desde, hasta: elem.hasta}); 
      }
    }
    else{
      dates_without_period.push({ fecha: elem.fecha.slice(0,10), desde: elem.desde, hasta: elem.hasta, deleted_at: elem.deleted_at});
    }
   
  });
  dates_without_period.forEach((elem) => {
  
    if(elem.deleted_at){
      
      data_final = data_final.filter((item) => (item.fecha === elem.fecha && item.desde === elem.desde && item.hasta === elem.hasta) ? false : true);
    }
    else{
      data_final.push(elem);
    }
  });
 
  quotesTaked.forEach((elem) => {
    data_final = data_final.filter((item) =>(item.fecha === elem.fecha.slice(0,10) && item.desde === elem.desde && item.hasta === elem.hasta) ? false : true);
  });

  return data_final;
}
let data_final = [];
let quantityHours = 0;
let idQuote = 0;

export const SpecialistScheduler = () => {
  const notifyError = () =>
    toast.error("No se ha guardado el horario", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifySuccess = () =>
    toast.success("Cita agendada con éxito", {
      position: toast.POSITION.TOP_CENTER,
    });
  const { id } = useParams();
  const [value, setValue] = React.useState(null);
 const [bloqueHora, setBloqueHora] = React.useState([]);
 const { user } = useContext(AuthContext);
 const [isValid, setIsValid] = React.useState(true);
 const [spinner, setSpinner] = React.useState(false);
 const [open, setOpen] = React.useState(false);
 const [token, setToken] = React.useState("");


  const handleCalendar = (date) => {
    let data_aux = [];
    let suma = (date.getDate() < 10) ? "0" : "";
    let dateCompare = date.getFullYear()+ '-' + (date.getMonth()+1) + '-' + suma + date.getDate();
    data_final.forEach((elem) => {
      if(elem.fecha === dateCompare){
        data_aux.push({ desde: elem.desde, hasta: elem.hasta, select: false});        
      }
    });
    setBloqueHora(data_aux);
    setValue(date);
  }; 


  React.useEffect(() => {
    setSpinner(true);
    let isMounted = true;
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/quotes/specialistWithout/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}/schedules/${id}`)
    ])
      .then(function (response) {
        if (isMounted) {
          data_final = formatSelectedDate(response[1].data, response[0].data);
          setSpinner(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
   const valid = bloqueHora.some((elem) => elem.select === true) && value;
   setIsValid(!valid);
  }, [value, bloqueHora]);

  


  const handleSubmit = (e) => {
    const data = [];
    bloqueHora.forEach((item) => {
      if (item.select) {
        data.push({
          desde: toDate(item.desde, "h:m"),
          hasta: toDate(item.hasta, "h:m"),
        });
      }
    });
    quantityHours = data.length;
   axios
   .post(`${process.env.REACT_APP_API_URL}/quotes`, {
     idEspecialista: id,
     idUsuario: user.id,
     fecha: value,
     horarios: data,
   })
   .then(function (response) {
        console.log(response)
        notifySuccess();
        let suma = (value.getDate() < 10) ? "0" : "";
        let dateCompare = value.getFullYear()+ '-' + (value.getMonth()+1) + '-' + suma + value.getDate();
        bloqueHora.forEach((elem) => {
          if(elem.select){
            
            data_final = data_final.filter((item) => (item.fecha === dateCompare && item.desde === elem.desde && item.hasta === elem.hasta) ? false : true);
        
          }
        });
        
        setBloqueHora([]);
        setValue(null);
     
   })
   .catch(function (error) {
    console.log(error)
      notifySuccess();
      let suma = (value.getDate() < 10) ? "0" : "";
      let dateCompare = value.getFullYear()+ '-' + (value.getMonth()+1) + '-' + suma + value.getDate();
      bloqueHora.forEach((elem) => {
        if(elem.select){
          
          data_final = data_final.filter((item) => (item.fecha === dateCompare && item.desde === elem.desde && item.hasta === elem.hasta) ? false : true);
      
        }
      });
      
      setBloqueHora([]);
      setValue(null);
   });
  }




  const handleClickOpen = () => {
    handleSubmit();
    axios.post(`${process.env.REACT_APP_API_URL}/transaction/create`,{
        amount: 20000 * quantityHours,
      }).then((response)=>{
        console.log(response)
        setToken(response.data.token)
      }
        ).catch((error)=>{
            console.log(error)
        })
    setOpen(true);
};


  return (
    
    <Container>
      <ToastContainer />
      <Grid sx={{mt: 2}} container spacing={2}>
        {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>) : (<><Grid item md={5} xs={12}>
          <StaticDatePicker
            disablePast={true}
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={handleCalendar}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item md={7} xs={12}>
            <Card sx={{width: "100%", height:"100%"}}>
              <CardContent sx={{ height: "100%"}}>
                
                  {(bloqueHora.length > 0) ? (bloqueHora.map((item, index) => {
                    return (
                      <Button
                      onClick={() => {
                        const horarioCopy = [...bloqueHora];
                        horarioCopy[index].select = !horarioCopy[index].select;
                        setBloqueHora(horarioCopy);
                      }}
                      key={index}
                      sx={
                        item.select
                          ? {
                              backgroundColor: "#D6E4F0",
                              mr: 1,
                              mb: 1,
                              "&:hover": {
                                backgroundColor: "#D6E4F0",
        
                                transition: "0.4s",
                              },
                            }
                          : {
                              backgroundColor: "#163172",
                              color: "white",
                              mr: 1,
                              mb: 1,
                              "&:hover": {
                                backgroundColor: "#D6E4F0",
                                color: "black",
                                transition: "0.4s",
                              },
                            }
                      }
                    >
                      {item.desde} - {item.hasta}
                    </Button>
                    );
                  }))  :(
                    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography
                    variant="h6"
                    sx={{
                      mr: 2,

                      fontFamily: "monospace",
                      fontWeight: 400,
                      fontSize: 16,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    No hay horarios disponibles
                  </Typography>
                </Box>)}
                
              </CardContent>
            </Card>
        </Grid>
          <Grid sx={{display: "flex", justifyContent: "end"}} item md={12} xs={12}>
            <DialogQuote
          open={open}
          isValid={isValid}
          setOpen={setOpen}
          token={token}
          handleClickOpen={handleClickOpen}
          title={"Deseas pagar esta hora?"}
        ></DialogQuote>
          </Grid></>)}
        
      </Grid>
    </Container>

  );
};
