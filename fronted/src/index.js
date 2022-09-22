import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from "date-fns/locale";
ReactDOM.render(
  <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
    <App />
  </LocalizationProvider>,
  document.getElementById("root")
);
