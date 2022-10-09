import { Card, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import { StaticDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const formatSelectedDate = (data) => {
  const data_final = [];
  data.forEach((elem) => {
    const data_aux = {
      fecha: elem.ti tle,
      desde: new Date(elem.start),
      hasta: new Date(elem.end),
    };
    data_final.push(data_aux);
  });
}

export const SpecialistScheduler = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState();
  console.log(id);

  React.useEffect(() => {
    let isMounted = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedules/${id}`)
      .then(function (response) {
        if (isMounted) {
          console.log(response);
          formatSelectedDate(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    
    <Container>
      <Grid sx={{mt: 2}} container spacing={2}>
        <Grid item md={5} xs={12}>
          <StaticDatePicker
            disablePast={true}
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item md={7} xs={12}>
            <Card sx={{width: "100%", height:"100%"}}>
              <CardContent sx={{ height: "100%"}}>
                <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Typography
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
                </Box>
                
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Container>

  );
};
