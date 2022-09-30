import { Button, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box } from "@mui/system";

export const BloquesHorario = ({
  horarioMañana,
  horarioTarde,
  horarioNoche,
  setHorarioMañana,
  setHorarioTarde,
  setHorarioNoche,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WbSunnyIcon sx={{ fontSize: 45, color: "yellow", mt: 1, mb: 1 }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {horarioMañana.map((item, key) => {
          return (
            <Button
              onClick={() => {
                const horarioMañanaCopy = [...horarioMañana];
                horarioMañanaCopy[key].select = !horarioMañanaCopy[key].select;
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
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WbTwilightIcon sx={{ fontSize: 45, color: "orange", mt: 1, mb: 1 }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {horarioTarde.map((item, key) => {
          return (
            <Button
              onClick={() => {
                const horarioTardeCopy = [...horarioTarde];
                horarioTardeCopy[key].select = !horarioTardeCopy[key].select;
                setHorarioTarde(horarioTardeCopy);
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
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DarkModeIcon sx={{ fontSize: 45, color: "#e3e3d0", mt: 1, mb: 1 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {horarioNoche.map((item, key) => {
          return (
            <Button
              onClick={() => {
                const horarioNocheCopy = [...horarioNoche];
                horarioNocheCopy[key].select = !horarioNocheCopy[key].select;
                setHorarioNoche(horarioNocheCopy);
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
      </Box>
    </Box>
  );
};
