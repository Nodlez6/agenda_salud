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
import StyleLogin from "./StyleLogin";
import LockIcon from "@mui/icons-material/Lock";

export const CardLogin = ({
  handleInputChange,
  values,
  isValid,
  handleSubmit,
}) => {
  const sl = StyleLogin();

  return (
    <Card
      className={sl.cardLogin}
      sx={{ backgroundColor: "#E9DAC1", borderRadius: 4 }}
    >
      <CardContent className="card__container">
        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <AccountCircleIcon
            sx={{ fontSize: 35, color: "#54BAB9", mr: 0.5, mb: 0.5 }}
          />
          <TextField
            id="correo"
            label="Correo"
            variant="standard"
            name="Correo"
            onChange={handleInputChange}
            value={values.Correo || ""}
            type="email"
            sx={{
              width: "100%",
              marginBottom: 1,

              "& label.Mui-focused": {
                color: "green",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "red",
              },

              "&:hover .MuiInput-underline": {
                borderBottomColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
              "& fieldset": {
                borderColor: "red",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <LockIcon sx={{ fontSize: 35, color: "#54BAB9", mr: 0.5 }} />
          <TextField
            id="contraseña"
            sx={{ mt: 6 }}
            className={sl.inputLogin}
            label="Contraseña"
            variant="standard"
            name="Contraseña"
            onChange={handleInputChange}
            value={values.Contraseña || ""}
            type="password"
          />
        </Box>
      </CardContent>

      <CardActions>
        <div className="Card__actions">
          <Link to="/register">Registrarse</Link>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Button
              style={{
                backgroundColor: !isValid ? "#54BAB9" : "#EBEBE4",
                color: "white",
              }}
              type="submit"
              variant="contained"
              disabled={isValid}
              fullWidth
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </CardActions>
    </Card>
  );
};
