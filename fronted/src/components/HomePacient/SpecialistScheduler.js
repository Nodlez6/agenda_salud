import { TextField } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export const SpecialistScheduler = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState();
  console.log(id);

  React.useEffect(() => {
    let isMounted = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedules/${id}`)
      .then(function (response) {
        if (isMounted) {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <StaticDatePicker
        disablePast={true}
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};
