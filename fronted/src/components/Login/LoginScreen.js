import "./Login.css";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import { CardLogin } from "./CardLogin";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const gs = globalUseStyles();
  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const notifyError = () =>
    toast.error("Correo o contraseña incorrectos", {
      position: toast.POSITION.TOP_CENTER,
    });

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
      notifyError();
      console.log("usuario o contraseña incorrectos");
    }

    reset();
  };

  useEffect(() => {
    const { Correo, Contraseña } = values;

    const emailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(Correo);
    const valid = emailValid && Contraseña;

    valid ? setIsValid(false) : setIsValid(true);
  }, [values]);

  return (
    <div className="login__container">
      <ToastContainer />
      <CardLogin
        handleInputChange={handleInputChange}
        values={values}
        isValid={isValid}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
