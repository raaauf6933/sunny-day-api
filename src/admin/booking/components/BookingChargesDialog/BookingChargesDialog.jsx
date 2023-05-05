import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import numeral from "numeral";
import Form from "./../../../components/Form/Form";

const BookingChargesDialog = ({ open, onClose, addCharges }) => {
  const handleSubmit = (formData) => {
    addCharges(formData);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle>Add Charges</DialogTitle>
      <Form
        initial={{
          name: "",
          qty: 1,
          amount: 1,
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, submit }) => {
          const maxQty = 10;
          // ? JSON.parse(data?.amenity_id)?.name === "Extra Bed"
          //   ? 5
          //   : undefined
          // : undefined;

          // console.log(JSON.parse(data.amenity_id));

          return (
            <>
              <DialogContent dividers>
                <TextField
                  label="Type"
                  name="name"
                  value={data.name}
                  onChange={change}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Quantity"
                  type="number"
                  inputProps={{
                    min: 1,
                    max: maxQty,
                  }}
                  name="qty"
                  value={data.qty}
                  helperText={`${maxQty} (maximum)`}
                  onChange={(e) =>
                    change({
                      target: {
                        name: "qty",
                        value:
                          parseInt(
                            e.target.value.replace(/\D/g, "").replace(/^0+/, "")
                          ) > maxQty
                            ? maxQty
                            : parseInt(
                                e.target.value
                                  .replace(/\D/g, "")
                                  .replace(/^0+/, "")
                              ),
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel required htmlFor="outlined-adornment-amount">
                    Enter Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    // type="number"
                    name="amount"
                    value={data.amount}
                    onChange={(e) =>
                      change({
                        target: {
                          name: "amount",
                          value: numeral(e.target.value).format("0,0.00"),
                        },
                      })
                    }
                    startAdornment={
                      <InputAdornment position="start">PHP</InputAdornment>
                    }
                    label="Enter amount *"
                    inputProps={{
                      inputComponent: <h1>Test</h1>,
                    }}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button fullWidth variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  disabled={!data.name || !data.qty}
                  onClick={submit}
                  fullWidth
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};

export default BookingChargesDialog;
