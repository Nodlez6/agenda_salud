import React, { useEffect } from "react";
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
import { Link,useParams,useLocation, useNavigate } from "react-router-dom";




export const Comprobante = () => {
    const { ides } = useParams();
    const [showComprobante, setShowComprobante] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    console.log(ides)
    //spearete ides
    const idesArray = ides.split(",");
    console.log(idesArray)
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token_ws");
    const TBK_TOKEN = query.get("TBK_TOKEN");
    const TBK_ORDEN_COMPRA = query.get("TBK_ORDEN_COMPRA");
    const TBK_ID_SESION = query.get("TBK_ID_SESION");

    useEffect(() => {
        let isMounted = true;
        if (token) {
            axios.post(`${process.env.REACT_APP_API_URL}/transaction/confirmation`, { token_ws: token })
            .then(function (response) {
                console.log(response.data)
                setShowComprobante(true)
                if(response.data.status === "AUTHORIZED"){
                    setTitle(`El numero de tu transaccióm es ${response.data.buy_order}`)
                    setContent("El pago previo de la cita se ha realizado con éxito")//Res
                }
                else{
                    setTitle("OPS!")//Respuesta con los datos de la transaccion
                    setContent("No se ha podido realizar el pago previo de la cita")
                    for(let i = 0; i < idesArray.length - 1 ; i++){
                        axios
                        .delete(`${process.env.REACT_APP_API_URL}/quotes/${idesArray[i]}`)
                        .then(function (response) {
                            console.log(response);
                        }
                        )
                        .catch(function (error) {
                            console.log(error);
                        }
                        );
                    }
                    
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        }
        else if(TBK_TOKEN || TBK_ORDEN_COMPRA || TBK_ID_SESION) {
            setShowComprobante(true)
            setTitle("OPS!")//Respuesta con los datos de la transaccion
            setContent("No se ha podido realizar el pago previo de la cita")
            //Delete quote

            for(let i = 0; i < idesArray.length - 1 ; i++){
                axios
                .delete(`${process.env.REACT_APP_API_URL}/quotes/${idesArray[i]}`)
                .then(function (response) {
                    console.log(response);
                }
                )
                .catch(function (error) {
                    console.log(error);
                }
                );
            }
            

        }
        return () => {
            isMounted = false;
        };
    }, [token,TBK_TOKEN,TBK_ORDEN_COMPRA,TBK_ID_SESION]);
    


  return (
    <Container>
        {showComprobante && 
        (<Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
            <Card sx={{ width: 600, padding: 1, mt: 3 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                         {content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>)}
    </Container>
  )
}
