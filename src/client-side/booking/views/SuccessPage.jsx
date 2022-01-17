import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Table,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import bookingContext from "../../context/booking/bookingContext";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!bookingState.bookingReference) {
      navigate("/");
    }
  });

  React.useEffect(() => {
    return () => {
      bookingDispatch({ type: "RESET" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        margin="2em"
      >
        <Card>
          <CardContent>
            <Typography variant="h4" textAlign="center" color="#008000a6">
              Booking Successfully Created!
            </Typography>
            <Table>
              <TableRow>
                <TableCell style={{ fontSize: "16px" }} align="left">
                  Booking Reference :
                </TableCell>
                <TableCell style={{ fontSize: "16px", fontWeight: 600 }}>
                  {bookingState.bookingReference}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "16px" }}>Status :</TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#ff000096",
                  }}
                >
                  Pending
                </TableCell>
              </TableRow>
            </Table>
            <Box marginTop={2}>
              <Typography variant="h6">HOW TO PAY?</Typography>
              <Typography variant="subtitle1">
                - Payment is available only for Bank Deposit
              </Typography>
              <Typography variant="subtitle1">
                - After Confirming, You will receive an Email w/ Booking
                Reference
              </Typography>
              <Typography variant="subtitle1">
                - Deposit your 50% Downpayment to bank, and upload your bank
                receipt
              </Typography>
              <Typography variant="subtitle1">
                - Wait your booking status to be confirmed.
              </Typography>
              <Typography variant="h6">POLICY CONDITIONS</Typography>
              <Typography variant="subtitle1">
                - You need to pay your 50% downpayment before 24hours or the
                reservation will be voided
              </Typography>
              <Typography variant="subtitle1">- No refund</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
              fullWidth
            >
              Go to Home Page
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                navigate("/my-booking");
              }}
            >
              Go to My Booking
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default SuccessPage;
