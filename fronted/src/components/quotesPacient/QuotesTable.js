import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmPopUp } from '../mui/ConfirmPopUp';
import axios from "axios";
import { AuthContext } from '../../auth/authContext';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function QuotesTable() {
  const { user } = React.useContext(AuthContext);
  const [spinner, setSpinner] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [titleConfirm, setTitleConfirm] = React.useState("");
  const [textConfirm, setTextConfirm] = React.useState("");
  const [idQuote, setIdQuote] = React.useState("");
  const [quotesState, setQuotes] = React.useState([]);

  React.useEffect(() => {
  setSpinner(true);
  let isMounted = true;
  axios
  .get(`${process.env.REACT_APP_API_URL}/quotes/pacient/${user.id}`)
    .then(function (response) {
      if (isMounted) {
         setSpinner(false);
        //notifySuccess();
        console.log(response.data);
        const dataAux = [];
        response.data.forEach((quote) => {
          console.log("tre")
          dataAux.push({
            id: quote.id,
            fecha: quote.fecha,
            desde: quote.desde,
            hasta: quote.hasta,
            nombre: quote.especialistas.nombre + " " + quote.especialistas.apellido,
            especialidad: quote.especialistas.especialidad,
          });
        }
        );
        console.log(dataAux);
        setQuotes(dataAux);
        console.log(quotesState);
        
      }
    })
    .catch(function (error) {
      //notifyError();
    });
  return () => {
    isMounted = false;
  };
  }, [])  
  
  const handleConfirm = () => {
    setOpenConfirm(false);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/quotes/${idQuote}`)
      .then(function (response) {
        console.log(response);
      }
      )
      .catch(function (error) {
        console.log(error);
      }
      );
  
    const aux = quotesState.filter((quote) => quote.id !== idQuote);
    setQuotes(aux);
  };
 const rows = []


  const deleteQuote = (id) => {
    setTitleConfirm("¿Estás seguro de eliminar esta cita?");
    setTextConfirm("Esta acción no se puede deshacer");
    setOpenConfirm(true);
    setIdQuote(id);
  };
  console.log(quotesState)

  return (
    <>
    {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>) : ( <Box sx={{mt: 3}}><TableContainer  component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Desde</TableCell>
              <TableCell align="center">Hasta</TableCell>
              <TableCell align="center">Profesional</TableCell>
              <TableCell align="center">Especialidad</TableCell>
              <TableCell align="center">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotesState.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  {row.fecha.slice(0,10)}
                </TableCell>
                <TableCell align="center">{row.desde}</TableCell>
                <TableCell align="center">{row.hasta}</TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.especialidad}</TableCell>
                <TableCell align="center">{<DeleteIcon
                              onClick={() => deleteQuote(row.id)}
                              sx={{
                                color: "red",
                                ":hover": { cursor: "pointer" },
                              }}
                            />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmPopUp
      open={openConfirm}
      setOpen={setOpenConfirm}
      title={titleConfirm}
      content={textConfirm}
      handleConfirm={handleConfirm}
    />
    </Box>)}
      
  </>
  );
}
