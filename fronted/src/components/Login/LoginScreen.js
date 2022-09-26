import "./Login.css";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import { CardLogin } from "./CardLogin";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

export const LoginScreen = () => {
  const gs = globalUseStyles();
  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const notifyError = () =>
    toast.error("Correo o contraseña incorrectos", {
      position: toast.POSITION.TOP_CENTER,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth`, {
        correo: "cote.palma.16@gmail.com",
        contrasenia: "Sury2019",
      })
      .then(function (response) {
        setSpinner(false);
        const action = {
          type: types.login,
          payload: {
            ...response.data,
          },
        };

        dispatch(action);
        navigate("/home");
      })
      .catch(function (error) {
        setSpinner(false);
        notifyError();
      });
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
        spinner={spinner}
      />
    </div>
  );
};
