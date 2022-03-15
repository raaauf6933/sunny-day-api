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
            <div>
              <h4>BOOKING REFERENCE:</h4>
              <h4> {bookingState.bookingReference}</h4>
            </div>
            <Table>
              <TableRow>
                <TableCell style={{ fontSize: "16px" }} align="left">
                  Booking Reference :
                </TableCell>
                <TableCell style={{ fontSize: "16px", fontWeight: 600 }}>
                  {bookingState.bookingReference}
                </TableCell>
              </TableRow>
              {/* <TableRow>
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
              </TableRow> */}
            </Table>
            <Box marginTop={2}>
              <div>
                <h5>
                  <b>How to Pay?</b>
                </h5>
                <ul>
                  <li>
                    Kindly deposit your payment to our selected bank account or
                    Gcash
                  </li>
                  <li>
                    Upload your Bank/Gcash Receipt and wait for Email
                    confirmation
                  </li>
                </ul>
                <h5>
                  <b>Mode of Payment</b>
                </h5>
                <ul>
                  <li>Gcash - 09352335202 | Villa Gregoria Resort</li>
                  <li>BPI - 75544452 | Villa Gregoria Resort</li>
                  <li>BDO - 23564343 43112 | Villa Gregoria Resort</li>
                </ul>
                <h5>
                  <b>Cancellation & Rebooking</b>
                </h5>
                <ul>
                  <li>
                    Cancellation of booking is not allowed if the booking is
                    confirmed
                  </li>
                  <li>
                    Rebooking/Modifying of booking is not allowed if the booking
                    is confirmed
                  </li>
                  <li>No Refund</li>
                </ul>
              </div>
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
