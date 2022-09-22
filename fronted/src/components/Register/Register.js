import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Register.css";
import StyleRegister from "./StyleRegister";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const sr = StyleRegister();
  const gs = globalUseStyles();

  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const [sameEmails, setSameEmails] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);

  const notifySuccess = () =>
    toast.success("Usuario registrado", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

  useEffect(() => {
    const { Nombre, Apellido, Correo, Correo_2, Contraseña, Contraseña_2 } =
      values;

    const emailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(Correo);

    const valid =
      Correo === Correo_2 &&
      Contraseña === Contraseña_2 &&
      emailValid &&
      Nombre &&
      Apellido;

    valid && Contraseña !== undefined && Contraseña_2 !== undefined
      ? setIsValid(false)
      : setIsValid(true);

    Correo !== Correo_2 && Correo !== undefined && Correo !== ""
      ? setSameEmails(true)
      : setSameEmails(false);

    Contraseña !== Contraseña_2 && Contraseña !== undefined && Contraseña !== ""
      ? setSamePasswords(true)
      : setSamePasswords(false);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Backend, Registra usuario
    if (true) {
      notifySuccess();
      console.log("Usuario registrado");
    } else {
      console.log("Error al registrar usuario");
    }
  };

  return (
    <div className="login__container">
      <Card
        className={sr.cardRegister}
        style={{ backgroundColor: gs.secondaryColor.backgroundColor }}
      >
        <CardContent className="card__container">
          <TextField
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
        </CardContent>

        <CardActions>
          <div className="Card__actions">
            <Link to="/login">Iniciar sesión</Link>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Button
                disabled={isValid}
                type="submit"
                variant="contained"
                fullWidth
              >
                Registrarse
              </Button>
            </form>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
