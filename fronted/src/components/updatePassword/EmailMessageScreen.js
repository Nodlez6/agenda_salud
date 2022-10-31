import "./EmailMessage.css";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import { EmailMessage } from "./EmailMessage";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

export const EmailMessageScreen = () => {
  const gs = globalUseStyles();
  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const notifyError = () =>
    toast.error("No se ha podido enviar el correo", {
      position: toast.POSITION.TOP_CENTER,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth`, {
        correo: values.correo,
        contrasenia: values.contrasenia,
      })
      .then(function (response) {
        setSpinner(false);
      })
      .catch(function (error) {
        setSpinner(false);
        notifyError();
      });
    reset();
  };

  useEffect(() => {
    const { correo } = values;

    const emailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(correo);
    const valid = emailValid ;

    valid ? setIsValid(false) : setIsValid(true);
  }, [values]);

  return (
    <div className="email_message_container">
      <ToastContainer />
      <EmailMessage
        handleInputChange={handleInputChange}
        values={values}
        isValid={isValid}
        handleSubmit={handleSubmit}
        spinner={spinner}
      />
    </div>
  );
};
