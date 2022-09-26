import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import {
  DateTimePicker,
  StaticDatePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { Fragment, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Container } from "@mui/material";
import { format } from "date-fns";
import "./ScheduleScreen.css";
import { Data } from "../../Horarios.js";

export const ScheduleScreen = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <Container>
        <div className="contenedor_bloques">
          <div className="calendario_bloque">
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              disablePast={true}
              onChange={(newValue) => {
                console.log(typeof newValue);
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div className="tarjeta_bloque">
            <Card sx={{ height: "100%" }}>
              <CardContent>
                {Data.Mañana.map((item) => {
                  return (
                    <Button>
                      {item.desde} - {item.hasta}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
