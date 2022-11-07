import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/authContext";
import { BloquesHorario } from "./BloquesHorario";
import { SelectHorario } from "./SelectHorario";
import TablaHorario from "./TablaHorario";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./ScheduleScreen.css";
import { toast, ToastContainer } from "react-toastify";

const axios = require("axios").default;

export const Semanal = ({
  horarioMañana,
  horarioTarde,
  horarioNoche,
  setHorarioMañana,
  setHorarioTarde,
  setHorarioNoche,
  toDate,
}) => {
  const [dia, setDia] = useState("");
  const [periodicidad, setPeriodicidad] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const notifyError = () =>
    toast.error("No se ha guardado el horario", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifySuccess = () =>
    toast.success("Se ha guardado el horario", {
      position: toast.POSITION.TOP_CENTER,
    });
  useEffect(() => {
    const validSelect = dia !== "" && periodicidad !== "";

    const someSchedules =
      horarioMañana.some((item) => item.select) ||
      horarioTarde.some((item) => item.select) ||
      horarioNoche.some((item) => item.select);
    setIsValid(!(validSelect && someSchedules));
  }, [dia, periodicidad, horarioMañana, horarioTarde, horarioNoche]);

  const handleSaveQuote = () => {
    const actual_date = new Date();
    const actual_day = actual_date.getDay();
    const day_quote = actual_date.setDate(
      actual_date.getDate() + (dia - actual_day)
    );


    const data = [];
    horarioMañana.forEach((item) => {
      if (item.select) {

        data.push({
          desde: toDate(item.desde, "h:m"),
          hasta: toDate(item.hasta, "h:m"),
        });
      }
    });
    horarioTarde.forEach((item) => {
      if (item.select) {
        data.push({
          desde: toDate(item.desde, "h:m"),
          hasta: toDate(item.hasta, "h:m"),
        });
      }
    });
    horarioNoche.forEach((item) => {
      if (item.select) {
        data.push({
          desde: toDate(item.desde, "h:m"),
          hasta: toDate(item.hasta, "h:m"),
        });
      }
    });

    let isMounted = true;
    axios
      .post(`${process.env.REACT_APP_API_URL}/schedules`, {
        idEspecialista: user.id,
        fecha: new Date(day_quote),
        periodicidad: periodicidad,
        horarios: data,
      })
      .then(function (response) {
        if (isMounted) {
          notifySuccess();
          setPeriodicidad("");
          setDia("");
        }
      })
      .catch(function (error) {
        //setSpinner(false);
        notifyError();
      });
    return () => {
      isMounted = false;
    };
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <SelectHorario
            dia={dia}
            handleChangeDia={(e) => setDia(e.target.value)}
            periodicidad={periodicidad}
            handleChangePeriodicidad={(e) => setPeriodicidad(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <div>
                <BloquesHorario
                  horarioMañana={horarioMañana}
                  horarioTarde={horarioTarde}
                  horarioNoche={horarioNoche}
                  setHorarioMañana={setHorarioMañana}
                  setHorarioTarde={setHorarioTarde}
                  setHorarioNoche={setHorarioNoche}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button
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
          onClick={handleSaveQuote}
          disabled={isValid}
        >
          Guardar
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
        <Button
          onClick={() => setRefresh(!refresh)}
          variant="contained"
          sx={{
            backgroundColor: "#163172",
            "&:hover": {
              backgroundColor: "#1d4197",
              transition: "0.4s",
            },
          }}
        >
          <RefreshIcon />
        </Button>
      </Box>
      <Box sx={{ mt: 2, mb: 5 }}>
        <TablaHorario refresh={refresh} url={"/schedules/with/"} />
      </Box>
    </>
  );
};
