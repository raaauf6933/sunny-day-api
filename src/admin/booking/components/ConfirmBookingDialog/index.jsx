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
  // TextField,
} from "@mui/material";
import Select from "./../../../../client-side/components/Select";
import numeral from "numeral";
import Form from "./../../../components/Form/Form";

const ConfirmBookingDialog = (props) => {
  const { open, onClose, onSubmit, status } = props;

  const handleSubmit = async ({ payment_amount }) => {
    onSubmit(numeral(payment_amount)._value);
    onClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <Form
          initial={{
            payment_amount: 0.0,
          }}
          onSubmit={handleSubmit}
        >
          {({ data, change, submit }) => {
            return (
              <>
                <DialogContent dividers>
                  <FormControl fullWidth margin="normal">
                    <InputLabel required htmlFor="outlined-adornment-amount">
                      Enter Payment Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      // type="number"
                      name="payment_amount"
                      value={data.payment_amount}
                      onChange={(e) =>
                        change({
                          target: {
                            name: "payment_amount",
                            value: numeral(e.target.value).format("0,0.00"),
                          },
                        })
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
                    // disabled={!data.discount_type}
                    variant="contained"
                    onClick={submit}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </>
            );
          }}
        </Form>
      </Dialog>
    </>
  );
};

export default ConfirmBookingDialog;
