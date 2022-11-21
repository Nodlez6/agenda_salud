import React from "react";
// or
import { CircularProgress, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link,useParams,useLocation } from "react-router-dom";




export const Comprobante = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token_ws");
    const TBK_TOKEN = query.get("TBK_TOKEN");
    if (token) {
        axios.post(`${process.env.REACT_APP_API_URL}/transaction/confirmation`, { token_ws: token })
        .then(function (response) {
            console.log(response.data)//Respuesta con los datos de la transaccion
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    if (TBK_TOKEN) {
        axios.post(`${process.env.REACT_APP_API_URL}/transaction/confirmation`, { token_ws: TBK_TOKEN })
        .then(function (response) {
            console.log(response.data)//Respuesta con los datos de la transaccion
        })
        .catch(function (error) {
            console.log(error)
        });

    }
    
    console.log(token)


  return (
    <div>Comprobante</div>
  )
}
