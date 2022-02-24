import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@mui/material";
import numeral from "numeral";

const ConfirmBookingDialog = (props) => {
  const { open, onClose, onSubmit } = props;
  const [amount, setAmount] = React.useState(0.0);

  const handleSubmit = async () => {
    onSubmit(numeral(amount)._value);
    onClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <InputLabel required htmlFor="outlined-adornment-amount">
              Enter Payment Amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              // type="number"
              value={amount}
              onChange={(e) =>
                setAmount(numeral(e.target.value).format("0,0.00"))
              }
              startAdornment={
                <InputAdornment position="start">PHP</InputAdornment>
              }
              label="Enter payment amount *"
              inputProps={{
                inputComponent: <h1>Test</h1>,
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            disabled={amount < 1}
            variant="contained"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmBookingDialog;
