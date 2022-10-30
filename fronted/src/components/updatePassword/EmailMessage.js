import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
  } from "@mui/material";
  
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import { Box } from "@mui/system";
  import { Link } from "react-router-dom";
  import StyleCard from "./StyleCard";
  import LockIcon from "@mui/icons-material/Lock";
  import CircularProgress from "@mui/material/CircularProgress";
  import { useState } from "react";
  import Typography from "@mui/material/Typography";
  import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
  
  export const EmailMessage = ({
    handleInputChange,
    values,
    isValid,
    handleSubmit,
    spinner,
  }) => {
    const sl = StyleCard();
  
    return (
      <Card
        className={sl.cardLogin}
        sx={{ backgroundColor: "#F6F6F6", borderRadius: 3 }}
      >
         
        <CardContent className="card__container">
        <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontFamily: "monospace",
                fontWeight: 600,
                fontSize: "1.8rem",
                color: "#1E56A0",
                textDecoration: "none",
              }}
            >
              AGENDA SALUD
            </Typography>
  
          
            <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <AccountCircleIcon
            sx={{ fontSize: 35, color: "#1E56A0", mr: 0.5, mb: 0.5 }}
          />
          <TextField
            id="correo"
            label="Correo"
            variant="standard"
            name="correo"
            onChange={handleInputChange}
            value={values.correo || ""}
            type="email"
            sx={{
              width: "100%",
              marginBottom: 1,

              "& label.Mui-focused": {
                color: "#1E56A0",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#1E56A0",
              },
            }}
          />
        </Box>
        </CardContent>
  
        <CardActions>
        <div className="Card__actions">
        <Link to="/login" className="register_link">
            Iniciar sesión
          </Link>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Button
                sx={{
                  backgroundColor: "#163172",
                  "&:hover": {
                    backgroundColor: "#1d4197",
                    transition: "0.4s",
                  },
                }}
                type="submit"
                variant="contained"
                disabled={isValid}
                fullWidth
              >
                {spinner ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={"1.5rem"} />
                  </Box>
                ) : (
                  "Enviar Correo"
                )}
              </Button>
            </form>
            </div>
        </CardActions>
      </Card>
    );
  };
  