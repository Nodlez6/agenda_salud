import "./Register.css";
import StyleRegister from "./StyleRegister";
import globalUseStyles from "../../GlobalUseStyles";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CardRegister } from "./CardRegister";
const axios = require("axios").default;

export const RegisterScreen = () => {
  const sr = StyleRegister();
  const gs = globalUseStyles();

  const [values, handleInputChange, reset] = useForm({});
  const [isValid, setIsValid] = useState(true);
  const [sameEmails, setSameEmails] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const notifySuccess = () =>
    toast.success("Usuario registrado", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifyError = () =>
    toast.error("Ha ocurrido algún error", {
      position: toast.POSITION.TOP_CENTER,
    });

  useEffect(() => {
    const {
      Nombre,
      Apellido,
      Correo,
      Correo_2,
      Contraseña,
      Contraseña_2,
      celular,
    } = values;

    const emailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(Correo);

    const valid =
      Correo === Correo_2 &&
      Contraseña === Contraseña_2 &&
      emailValid &&
      Nombre &&
      Apellido &&
      celular;

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
    setSpinner(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, {
        nombre: values.Nombre,
        apellido: values.Apellido,
        correo: values.Correo,
        contrasenia: values.Contraseña,
        celular: values.celular,
      })
      .then(function (response) {
        notifySuccess();
        setSpinner(false);
      })
      .catch(function (error) {
        notifyError();
        setSpinner(false);
      });
    reset();
  };

  return (
    <div className="login__container">
      <ToastContainer />
      <CardRegister
        sr={sr}
        gs={gs}
        values={values}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
        sameEmails={sameEmails}
        samePasswords={samePasswords}
        spinner={spinner}
      />
    </div>
  );
};
