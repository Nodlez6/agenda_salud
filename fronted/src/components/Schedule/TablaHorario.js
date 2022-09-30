import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmPopUp } from "../mui/ConfirmPopUp";
import axios from "axios";
import { AuthContext } from "../../auth/authContext";
import { CircularProgress } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

function Row({
  row,
  openConfirm,
  setOpenConfirm,
  handleConfirm,
  setIdHora,
  setTitleConfirm,
  setTextConfirm,
}) {
  const [open, setOpen] = React.useState(false);

  const deleteHora = (id) => {
    setTitleConfirm("¿Estás seguro de eliminar esta hora?");
    setTextConfirm("Esta acción no se puede deshacer");
    setOpenConfirm(true);
    setIdHora(id);
  };

  const handleReverse = (id) => {
    setTitleConfirm("¿Estás seguro de revertir esta hora?");
    setTextConfirm("Esta acción no se puede deshacer");
    setOpenConfirm(true);
    setIdHora(id);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Horario disponible
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Fecha</TableCell>
                    <TableCell align="center">Desde</TableCell>
                    <TableCell align="center">Hasta</TableCell>
                    <TableCell align="center">Periodicidad</TableCell>
                    <TableCell align="center">Acciones</TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.Horas?.map((HoraRow) => (
                    <TableRow key={HoraRow?.id}>
                      <TableCell align="center">{HoraRow?.fecha}</TableCell>
                      <TableCell align="center">{HoraRow?.desde}</TableCell>
                      <TableCell align="center">{HoraRow?.hasta}</TableCell>
                      <TableCell align="center">
                        {HoraRow?.periodicidad}
                      </TableCell>
                      <TableCell align="center">
                        {HoraRow?.deleted_at ? (
                          <HistoryIcon
                            onClick={() => handleReverse(HoraRow?.id)}
                            sx={{
                              color: "green",
                              ":hover": { cursor: "pointer" },
                            }}
                          />
                        ) : (
                          <DeleteIcon
                            onClick={() => deleteHora(HoraRow?.id)}
                            sx={{
                              color: "red",
                              ":hover": { cursor: "pointer" },
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TablaHorario({ refresh, url }) {
  const { user } = React.useContext(AuthContext);
  const [rowsState, setRowsState] = React.useState([]);
  const [spinnerTabla, setSpinnerTabla] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    setSpinnerTabla(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}${url}${user.id}`)
      .then(function (response) {
        console.log(response);
        setSpinnerTabla(false);
        if (isMounted) {
          setRowsState([
            {
              name: "Lunes",
              Horas: response.data?.lunes,
            },
            {
              name: "Martes",
              Horas: response.data?.martes,
            },
            {
              name: "Miercoles",
              Horas: response.data?.miercoles,
            },
            {
              name: "Jueves",
              Horas: response.data?.jueves,
            },
            {
              name: "Viernes",
              Horas: response.data?.viernes,
            },
            {
              name: "Sabado",
              Horas: response.data?.sabado,
            },
            {
              name: "Domingo",
              Horas: response.data?.domingo,
            },
          ]);
          console.log(rowsState);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [idHora, setIdHora] = React.useState(null);
  const [titleConfirm, setTitleConfirm] = React.useState("");
  const [textConfirm, setTextConfirm] = React.useState("");

  const handleConfirm = () => {
    setOpenConfirm(false);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/schedules/${idHora}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const dataFinal = [];
    rowsState.forEach((row) => {
      const aux = row.Horas.filter((hora) => hora.id !== idHora);
      dataFinal.push({ name: row.name, Horas: aux });
    });
    setRowsState(dataFinal);

    console.log(idHora);
  };

  return (
    <>
      {spinnerTabla ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={"1.5rem"} />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {rowsState.map((row) => (
                <Row
                  openConfirm={openConfirm}
                  setOpenConfirm={setOpenConfirm}
                  key={row.name}
                  row={row}
                  handleConfirm={handleConfirm}
                  setIdHora={setIdHora}
                  setTitleConfirm={setTitleConfirm}
                  setTextConfirm={setTextConfirm}
                />
              ))}
            </TableBody>
          </Table>
          <ConfirmPopUp
            open={openConfirm}
            setOpen={setOpenConfirm}
            title={titleConfirm}
            content={textConfirm}
            handleConfirm={handleConfirm}
          />
        </TableContainer>
      )}
    </>
  );
}
