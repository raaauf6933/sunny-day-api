import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(
  () => ({
    icon: {
      fontSize: "6em",
      color: "#5eca5e",
    },
    content: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
    },
  }),
  {
    name: "SuccessDialog",
  }
);

const SuccessDialog = (props) => {
  const { bookingDispatch, bookingState } = props;
  const classes = useStyles(props);
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      bookingDispatch({ type: "RESET" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dialog open={bookingState.isBookingSuccess} maxWidth="sm" fullWidth>
        <DialogContent>
          <div className={classes.content}>
            <CheckCircleIcon className={classes.icon} />
            <div className={classes.content}>
              <h2>Thank you for Booking with Us!</h2>
              <h4>
                {" "}
                BOOKING REFERENCE:{" "}
                <b>
                  <u>{bookingState.bookingReference}</u>
                </b>
              </h4>
              <span>Check your email for more details</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            color="success"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
          <Button
            fullWidth
            color="info"
            variant="contained"
            onClick={() => navigate("/my-booking?awakeNavBar=true")}
          >
            My Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuccessDialog;
