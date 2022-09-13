import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import "./Login.css";
import StyleLogin from "./StyleLogin";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const Login = () => {
  const sl = StyleLogin();
  const gs = globalUseStyles();
  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Backend, Devuelve USER
    if (true) {
      const action = {
        type: types.login,
        payload: {
          nombre: "Sebastian",
          apellido: "Gallardo",
          admin: true,
        },
      };

      dispatch(action);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } else {
      console.log("usuario o contraseña incorrectos");
    }

    reset();
  };

  useEffect(() => {
    const { Correo, Contraseña } = values;

    const valid = Correo && Contraseña;
    const emailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(Correo);

    valid && emailValid ? setIsValid(false) : setIsValid(true);
  }, [values]);

  return (
    <div className="login__container">
      <Card
        className={sl.cardLogin}
        style={{ backgroundColor: gs.secondaryColor.backgroundColor }}
      >
        <CardContent className="card__container">
          <TextField
            className={sl.inputLogin}
            id="correo"
            label="Correo"
            variant="standard"
            name="Correo"
            onChange={handleInputChange}
            value={values.Correo || ""}
            type="email"
          />
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
        </CardContent>

        <CardActions>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Button
              style={{
                backgroundColor: !isValid
                  ? gs.terciaryColor.backgroundColor
                  : "grey",
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
        </CardActions>
      </Card>
    </div>
  );
};
