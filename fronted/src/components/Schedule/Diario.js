import { Button, Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BloquesHorario } from "./BloquesHorario";
import TablaHorario from "./TablaHorario";
import RefreshIcon from "@mui/icons-material/Refresh";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import axios from "axios";
import { AuthContext } from "../../auth/authContext";
import { Data } from "../../Horarios";

export const Diario = ({
  toDate,
  horarioMañana,
  horarioTarde,
  horarioNoche,
  setHorarioMañana,
  setHorarioTarde,
  setHorarioNoche,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = React.useState();
  const [isValid, setIsValid] = useState(true);
  const { user } = useContext(AuthContext);

  const notifyError = () =>
    toast.error("No se ha guardado el horario", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifySuccess = () =>
    toast.success("Se ha guardado el horario", {
      position: toast.POSITION.TOP_CENTER,
    });

  const getFormatDate = () => {
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
    return data;
  };

  const handleDeleteQuote = () => {
    let isMounted = true;
    axios
      .post(`${process.env.REACT_APP_API_URL}/schedules`, {
        idEspecialista: user.id,
        fecha: new Date(value),
        periodicidad: 0,
        horarios: getFormatDate(),
        deleted_at: new Date(),
      })
      .then(function (response) {
        if (isMounted) {
          notifySuccess();
        }
      })
      .catch(function (error) {
        notifyError();
      });
    return () => {
      isMounted = false;
    };
  };

  const handleSaveQuote = () => {
    const data = getFormatDate();
    let isMounted = true;
    axios
      .post(`${process.env.REACT_APP_API_URL}/schedules`, {
        idEspecialista: user.id,
        fecha: new Date(value),
        periodicidad: 0,
        horarios: getFormatDate(),
      })
      .then(function (response) {
        if (isMounted) {
          notifySuccess();
        }
      })
      .catch(function (error) {
        notifyError();
      });
    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    const someSchedules =
      horarioMañana.some((item) => item.select) ||
      horarioTarde.some((item) => item.select) ||
      horarioNoche.some((item) => item.select);
    setIsValid(!(value && someSchedules));
  }, [value, horarioMañana, horarioTarde, horarioNoche]);
  return (
    <>
      <ToastContainer />
      <Grid container spacing={4}>
        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          item
          xs={12}
          md={6}
        >
          <Box sx={{ width: "22rem" }}>
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
          </Box>
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
          disabled={isValid}
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
        >
          Guardar
        </Button>
        <Button
          disabled={isValid}
          color="warning"
          variant="contained"
          sx={{
            ml: 2,
            "&:hover": {
              backgroundColor: "#1d4197",
              transition: "0.4s",
            },
            "&:disabled": {
              background: "#cfcfcf",
            },
          }}
          onClick={handleDeleteQuote}
        >
          Deshabilitar
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
        <TablaHorario refresh={refresh} url={"/schedules/without/"} />
      </Box>
    </>
  );
};
