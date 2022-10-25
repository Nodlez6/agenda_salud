import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { ConfirmPopUp } from '../mui/ConfirmPopUp';


export default function TableQuotes() {
    const { user } = React.useContext(AuthContext);
    const [quotes, setQuotes] = React.useState([]);
    const [spinner, setSpinner] = React.useState(true);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [titleConfirm, setTitleConfirm] = React.useState("");
    const [textConfirm, setTextConfirm] = React.useState("");
    const [idQuote, setIdQuote] = React.useState("");

    React.useEffect(() => {
        let isMounted = true;
        axios
        .get(`${process.env.REACT_APP_API_URL}/specialists/pacientes/${user.id}`)
        .then(function (response) {
          if(isMounted){
            setQuotes(response.data);
            setSpinner(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

        return () => {
          isMounted = false;
        }
      }, [])

      const deleteQuote = (id) => {
        setTitleConfirm("¿Estás seguro de eliminar esta cita?");
        setTextConfirm("Esta acción no se puede deshacer");
        setOpenConfirm(true);
        setIdQuote(id);
      };

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
      
        const aux = quotes.filter((quote) => quote.id !== idQuote);
        setQuotes(aux);
      };

  return (
    <>
    {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>)
    : (<TableContainer sx={{mt: 3}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Desde</TableCell>
            <TableCell align="center">Hasta</TableCell>
            <TableCell align="center">Paciente</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
                {row.fecha.slice(0,10)}
              </TableCell>
              <TableCell align="center">{row.desde}</TableCell>
              <TableCell align="center">{row.hasta}</TableCell>
                <TableCell align="center">{row.usuarios.nombre} {row.usuarios.apellido}</TableCell>
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
    </TableContainer>)}
    <ConfirmPopUp
      open={openConfirm}
      setOpen={setOpenConfirm}
      title={titleConfirm}
      content={textConfirm}
      handleConfirm={handleConfirm}
    />
    </> 
    );
}
