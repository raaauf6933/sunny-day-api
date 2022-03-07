import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import moment from "moment";
import { TextField, Box } from "@mui/material";

const DatePicker = ({ data, change }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        minDate={new Date(moment(new Date()).format())}
        startText="Check-in"
        endText="Check-out"
        value={data.dates}
        onChange={(newValue) => {
          change({
            target: {
              name: "dates",
              value: newValue,
            },
          });
        }}
        // InputProps={{
        //   name: "dates",
        // }}
        name="dates"
        renderInput={(startProps, endProps) => {
          return (
            <React.Fragment>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                {...startProps}
              />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                {...endProps}
              />
            </React.Fragment>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
