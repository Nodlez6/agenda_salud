import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Register.css";

export const CardRegister = ({
  sr,
  gs,
  handleInputChange,
  handleSubmit,
  isValid,
  values,
  sameEmails,
  samePasswords,
  spinner,
}) => {
  return (
    <Card
      className={sr.cardRegister}
      sx={{ backgroundColor: "#F6F6F6", borderRadius: 3 }}
    >
      <CardContent className="card__container_register">

        <TextField
          placeholder="John"
          className={sr.inputRegister}
          id="nombre"
          sx={{ mb: 3, mt: 3 }}
          label="Nombre"
          variant="standard"
          name="Nombre"
          onChange={handleInputChange}
          value={values.Nombre || ""}
          type="text"
        />
        <TextField
          placeholder="Doe"
          className={sr.inputRegister}
          id="apellido"
          sx={{ mb: 3 }}
          label="Apellido"
          variant="standard"
          name="Apellido"
          onChange={handleInputChange}
          value={values.Apellido || ""}
          type="text"
        />
        <TextField
          placeholder="JohnDoe@gmail.com"
          className={sr.inputRegister}
          id="correo"
          sx={{ mb: 3 }}
          label="Correo"
          variant="standard"
          name="Correo"
          onChange={handleInputChange}
          value={values.Correo || ""}
          type="email"
        />
        <TextField
          placeholder="JohnDoe@gmail.com"
          className={sr.inputRegister}
          id="correo_2"
          sx={{ mb: 3 }}
          label="Repita correo"
          variant="standard"
          name="Correo_2"
          onChange={handleInputChange}
          value={values.Correo_2 || ""}
          error={sameEmails}
          helperText={sameEmails && "Los correos no coinciden"}
          type="email"
        />
        <TextField
          id="contraseña"
          sx={{ mb: 3 }}
          className={sr.inputRegister}
          label="Contraseña"
          variant="standard"
          name="Contraseña"
          onChange={handleInputChange}
          value={values.Contraseña || ""}
          type="password"
        />
        <TextField
          id="contraseña_2"
          sx={{ mb: 3 }}
          className={sr.inputRegister}
          label="Repita contraseña"
          variant="standard"
          name="Contraseña_2"
          onChange={handleInputChange}
          value={values.Contraseña_2 || ""}
          error={samePasswords}
          helperText={samePasswords && "Las contraseñas no coinciden"}
          type="password"
        />
        <TextField
          id="celular"
          sx={{ mb: 3 }}
          className={sr.inputRegister}
          label="Celular"
          variant="standard"
          name="celular"
          onChange={handleInputChange}
          value={values.celular || ""}
          type="text"
        />
      </CardContent>

      <CardActions>
        <div className="Card__actions_register">
          <Link to="/login" className="login_link ">
            Iniciar sesión
          </Link>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Button
              disabled={isValid}
              type="submit"
              variant="contained"
              fullWidth
            >
              {spinner ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size={"1.5rem"} />
                </Box>
              ) : (
                "Registrarse"
              )}
            </Button>
          </form>
        </div>
      </CardActions>
    </Card>
  );
};
