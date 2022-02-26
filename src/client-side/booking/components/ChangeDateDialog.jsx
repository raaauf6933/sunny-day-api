import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { hasNull } from "../../utils/validators/guestForm";
import bookingContext from "../../context/booking/bookingContext";
import moment from "moment";

const ChangeDateDialog = (props) => {
  const { isOpenModal, closeModal, setRooms } = props;
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const [value, setValue] = React.useState([
    bookingState?.check_in ? bookingState.check_in : null,
    bookingState?.check_out ? bookingState?.check_out : null,
  ]);

  const handleSave = () => {
    bookingDispatch({
      type: "SET_DATES",
      payload: {
        check_in: value[0],
        check_out: value[1],
      },
    });
    bookingDispatch({
      type: "RESET_ROOMS",
    });
    setRooms([]);
    closeModal();
  };

  return (
    <Dialog open={isOpenModal} maxWidth="md" onClose={closeModal}>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateRangePicker
            disablePast
            minDate={new Date(moment(new Date()).add(1, "days").format())}
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <Typography color="gray">
          *Note: Changing dates will reset the selected rooms
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="warning" variant="outlined" onClick={() => closeModal()}>
          {" "}
          Close
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSave()}
          disabled={hasNull(value)}
        >
          {" "}
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeDateDialog;
