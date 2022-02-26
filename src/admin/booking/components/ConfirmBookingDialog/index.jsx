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

  const handleSubmit = async ({ discount_type, payment_amount }) => {
    console.log(numeral(payment_amount)._value);
    onSubmit(numeral(payment_amount)._value);
    onClose();
  };

  const discountChoices = [
    { value: "none", label: "none" },
    {
      value: "PWD_SENIOR_20%",
      label: "SENIOR/PWD 20%",
    },
  ];

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <Form
          initial={{
            payment_amount: 0.0,
            discount_type: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ data, change, submit }) => {
            return (
              <>
                <DialogContent dividers>
                  {status === "CONFIRMED" ? (
                    <Select
                      label="Discount"
                      value={data.discount_type}
                      name="discount_type"
                      choices={discountChoices}
                      onChange={change}
                    />
                  ) : null}

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
                    // disabled={data.payment_amount < 1}
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
