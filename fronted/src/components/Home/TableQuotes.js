import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead, TextField } from '@mui/material';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { ConfirmPopUp } from '../mui/ConfirmPopUp';
import DeleteIcon from "@mui/icons-material/Delete";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { user } = React.useContext(AuthContext);
    const [quotes, setQuotes] = React.useState([]);
    const [spinner, setSpinner] = React.useState(true);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [titleConfirm, setTitleConfirm] = React.useState("");
    const [textConfirm, setTextConfirm] = React.useState("");
    const [idQuote, setIdQuote] = React.useState("");
    const [search, setSearch] = React.useState("");


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
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quotes.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
     <TextField
     onChange={(e) => setSearch(e.target.value)}
      id="outlined-basic" label="Filtrar por fecha o paciente" variant="outlined"
      sx={{
        mt: 4,
        width: "100%",
        marginBottom: 1,

        "& label.Mui-focused": {
          color: "#1E56A0",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#1E56A0",
        },
      }} />
       {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.5rem"} />
        </Box>) : (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
              <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Desde</TableCell>
                <TableCell align="center">Hasta</TableCell>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">Accion</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? quotes.filter(value => value.fecha.includes(search
                ) || value.usuarios.nombre.includes(search) || value.usuarios.apellido.includes(search)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : quotes
            ).map((row) => (
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

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={quotes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <ConfirmPopUp
        open={openConfirm}
        setOpen={setOpenConfirm}
        title={titleConfirm}
        content={textConfirm}
        handleConfirm={handleConfirm}
      />
      </TableContainer>)}	
    </>
  );
}