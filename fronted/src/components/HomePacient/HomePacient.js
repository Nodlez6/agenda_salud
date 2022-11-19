import React from "react";
// or
import { CircularProgress, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

export const HomePacient = () => {
  const [especialidad, setEspecialidad] = React.useState("");
  const [specialists, setEspecialists] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [ShowButton, setShowButton] = React.useState(false);
  const [token, setToken] = React.useState("");

  const handleChange = (event) => {
    setSpinner(true);
    setEspecialidad(event.target.value);
    let isMounted = true;
    axios
    .get(`${process.env.REACT_APP_API_URL}/specialists/especialidad/${event.target.value}`)
      .then(function (response) {
        if (isMounted) {
          setSpinner(false);
          //notifySuccess();
          setEspecialists(response.data);
        }
      })
      .catch(function (error) {
        //notifyError();
      });
    return () => {
      isMounted = false;
    };
  };
  return (
    <Container>
      <Box
        sx={{
          mt: 3,
          mb: 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ width: "40%" }}>
          <InputLabel id="demo-simple-select-label">Especialidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={especialidad}
            label="Especialidad"
            onChange={handleChange}
          >
            <MenuItem value={"Terapeuta ocupacional"}>
              Terapia ocupacional
            </MenuItem>
            <MenuItem value={"Psicologo"}>Psicología</MenuItem>
            <MenuItem value={3}>Fonoaudiología</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {spinner ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>
      ) : (
        <Grid container columnSpacing={2} rowSpacing={2}>
          {specialists.map((specialist) => {
            
            return (
              <Grid  key={specialist.id} item xs={9}  md={3}>
                <Card sx={{ maxWidth: 300, padding: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {specialist.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {specialist.especialidad}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/homepacient/specialist/${specialist.id}`}>Ver Horario</Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      {/* <Button variant="contained" onClick={()=>{axios.post(`${process.env.REACT_APP_API_URL}/transaction/create`,{
        id: 1,
        amount: 1000
      }).then((response)=>{
        console.log(response)
        setToken(response.data.token)
        setShowButton(true)
      })
      }}></Button>
      {ShowButton && <form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST">
   <input type="hidden" name="token_ws" value={token}/>
   <input type="submit" value="Pagar"/>
</form>}  */}

    </Container>
  );
};
