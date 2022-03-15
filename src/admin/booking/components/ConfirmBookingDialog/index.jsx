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
import numeral from "numeral";
import Form from "./../../../components/Form/Form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getInvoice } from "./../../invoiceTemplate";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ConfirmBookingDialog = (props) => {
  const { open, onClose, onSubmit, fetchBooking } = props;
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async ({ payment_amount, generate_invoice }) => {
    setLoading(true);
    const result = await onSubmit(numeral(payment_amount)._value);
    if (result?.status === "failed") {
      setLoading(false);
      return false;
    }

    if (generate_invoice) {
      const result = await fetchBooking();
      pdfMake.createPdf(getInvoice(result)).open();
    }
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <Form
          initial={{
            payment_amount: 0.0,
            generate_invoice: true,
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
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="generate_invoice"
                          checked={data.generate_invoice}
                          onChange={(e) =>
                            change({
                              target: {
                                name: "generate_invoice",
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                      }
                      label="Generate Invoice"
                    />
                  </FormGroup>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={() => onClose()}>
                    Cancel
                  </Button>
                  <LoadingButton
                    variant="contained"
                    onClick={submit}
                    loading={loading}
                    loadingPosition="end"
                  >
                    Confirm
                  </LoadingButton>
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
