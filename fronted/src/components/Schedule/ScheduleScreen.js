import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DateTimePicker,
  StaticDatePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { Fragment, useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Container } from "@mui/material";
import { format } from "date-fns";
import "./ScheduleScreen.css";
import { Data } from "../../Horarios.js";

export const ScheduleScreen = () => {
  const [value, setValue] = useState();
  const [horarioMañana, setHorarioMañana] = useState(Data.Mañana);
  const [dia, setDia] = useState("");
  const [periodicidad, setPeriodicidad] = useState("");

  useEffect(() => {
    console.log(horarioMañana);
  }, [horarioMañana]);

  const handleChangeDia = (event) => {
    setDia(event.target.value);
  };

  const handleChangePeriodicidad = (event) => {
    setPeriodicidad(event.target.value);
  };

  return (
    <div>
      <Container>
        <div className="contenedor_bloques">
          <div className="calendario_bloque">
            {/*<StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              disablePast={true}
              onChange={(newValue) => {
                //console.log(new Date(newValue).toLocaleDateString());
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />*/}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Día</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dia}
                  label="Día"
                  onChange={handleChangeDia}
                  sx={{ mb: 5 }}
                >
                  <MenuItem value={1}>Lunes</MenuItem>
                  <MenuItem value={2}>Martes</MenuItem>
                  <MenuItem value={3}>Miércoles</MenuItem>
                  <MenuItem value={4}>Jueves</MenuItem>
                  <MenuItem value={5}>Viernes</MenuItem>
                  <MenuItem value={6}>Sábado</MenuItem>
                  <MenuItem value={0}>Domingo</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Periodicidad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={periodicidad}
                  label="Periodicidad"
                  onChange={handleChangePeriodicidad}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="tarjeta_bloque">
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <div>
                  {horarioMañana.map((item, key) => {
                    return (
                      <Button
                        onClick={() => {
                          const horarioMañanaCopy = [...horarioMañana];
                          horarioMañanaCopy[key].select =
                            !horarioMañanaCopy[key].select;
                          setHorarioMañana(horarioMañanaCopy);
                        }}
                        key={key}
                        sx={
                          item.select
                            ? {
                                backgroundColor: "#D6E4F0",
                                mr: 1,
                                "&:hover": {
                                  backgroundColor: "#D6E4F0",

                                  transition: "0.4s",
                                },
                              }
                            : {
                                backgroundColor: "#163172",
                                color: "white",
                                mr: 1,
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
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
