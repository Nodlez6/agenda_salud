import { Button, Card, CardContent } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import "./ScheduleScreen.css";
import { Data } from "../../Horarios.js";
import { Semanal } from "./Semanal";
import { Diario } from "./Diario";
import { Box } from "@mui/system";

function toDate(dStr, format) {
  var now = new Date();
  if (format === "h:m") {
    now.setHours(dStr.substr(0, dStr.indexOf(":")));
    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
    now.setSeconds(0);
    return now;
  } else return "Invalid Format";
}

export const ScheduleScreen = () => {
  const [horarioMañana, setHorarioMañana] = useState(Data.Mañana);
  const [horarioTarde, setHorarioTarde] = useState(Data.Tarde);
  const [horarioNoche, setHorarioNoche] = useState(Data.Noche);
  const [showSemanal, setShowSemanal] = useState(true);
  const [showDiario, setShowDiario] = useState(false);

  return (
    <div>
      <Container>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Button
            onClick={() => {
              setShowSemanal(true);
              setShowDiario(false);
            }}
          >
            Semanal
          </Button>
          <Button
            onClick={() => {
              setShowDiario(true);
              setShowSemanal(false);
            }}
          >
            Diario
          </Button>
        </Box>
        {showSemanal && (
          <Semanal
            toDate={toDate}
            horarioMañana={horarioMañana}
            horarioTarde={horarioTarde}
            horarioNoche={horarioNoche}
            setHorarioMañana={setHorarioMañana}
            setHorarioTarde={setHorarioTarde}
            setHorarioNoche={setHorarioNoche}
          />
        )}
        {showDiario && (
          <Diario
            toDate={toDate}
            horarioMañana={horarioMañana}
            horarioTarde={horarioTarde}
            horarioNoche={horarioNoche}
            setHorarioMañana={setHorarioMañana}
            setHorarioTarde={setHorarioTarde}
            setHorarioNoche={setHorarioNoche}
          />
        )}
      </Container>
    </div>
  );
};
