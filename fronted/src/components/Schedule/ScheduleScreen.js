import { Box, TextField } from "@mui/material";
import {
  DateTimePicker,
  StaticDatePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { Fragment, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Container } from "@mui/material";
import { format } from "date-fns";

export const ScheduleScreen = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <Container>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          format="dd-MMM-yyyy"
          views={[`year`, `month`, `day`]}
          onChange={(newValue) => {
            console.log(typeof newValue);
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Container>
    </div>
  );
};
