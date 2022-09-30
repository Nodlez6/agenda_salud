import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

export const SelectHorario = ({
  dia,
  handleChangeDia,
  periodicidad,
  handleChangePeriodicidad,
}) => {
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Día</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dia}
            label="Día"
            onChange={handleChangeDia}
            sx={{ mb: 5 }}
          >
            <MenuItem value={1}>Lunes</MenuItem>
            <MenuItem value={2}>Martes</MenuItem>
            <MenuItem value={3}>Miércoles</MenuItem>
            <MenuItem value={4}>Jueves</MenuItem>
            <MenuItem value={5}>Viernes</MenuItem>
            <MenuItem value={6}>Sábado</MenuItem>
            <MenuItem value={7}>Domingo</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Periodicidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={periodicidad}
            label="Periodicidad"
            onChange={handleChangePeriodicidad}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
