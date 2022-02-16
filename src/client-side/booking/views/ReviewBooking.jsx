import React from "react";
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AvailedRoomTable from "../components/AvailedRoomTable";
import SaveButton from "../components/SaveButton";
import { buttonMessage } from "../../utils/intl";
import bookingContext from "../../context/booking/bookingContext";
import { createBooking } from "../api/booking";
import { bookingUrl, bookingGuestDetails, bookingSuccess } from "../url";
import moment from "moment";
import { currencyFormat } from "../../utils/formatter";
import { VAT_RATE } from "../../../config";

import Alert from "./../../components/Alert";

import BookingSummary from "../../components/BookingSummary/BookingSummary";

const useStyles = makeStyles(
  () => ({
    sectionField: {
      display: "flex",
      flexDirection: "row",

      justifyContent: "space-between",
      "& > *": {
        margin: "10px 10px 0px 10px",
      },
    },
    breakdownSection: {
      marginTop: "1em",
    },
    totalSection: {
      backgroundColor: "#ffe024 ",
      color: "#1856e2  !important",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
      border: "2px solid #fffffff5",
      fontWeight: "600",
    },
  }),
  { name: "ReviewBooking" }
);

const ReviewBooking = (props) => {
  const { params, navigate } = props;
  const classes = useStyles(props);
  const [onFetch, setOnFetch] = React.useState(false);
  const [onFetchError, setOnFetchError] = React.useState(false);
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const { guest, room_details } = bookingState;

  const getNoQuantity = (roomtype_id) => {
    return room_details.filter((obj) => obj.roomtype_id === roomtype_id).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = room_details.filter(
      (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i
    );

    const countRooms = removeDuplicates.map((e) => {
      return {
        room_name: e.roomtype_name,
        rate: e.room_amount,
        qty: getNoQuantity(e.roomtype_id),
        amount: getRoomAmount(e.roomtype_id, e.room_amount),
      };
    });

    return countRooms;
  };

  const handleGetNoNights = () => {
    const start = moment(bookingState.check_in, "YYYY-MM-DD");
    const end = moment(bookingState.check_out, "YYYY-MM-DD");
    const nights = Math.abs(moment.duration(start.diff(end)).asDays());
    return nights;
  };

  const getSubTotal = () => {
    let total = 0;
    handleGetRooms().map((e) => (total += e.amount));
    return total;
  };

  const getTotalAmount = () => {
    return getSubTotal() * handleGetNoNights();
  };

  const handleVat = () => {
    const vatable_sales = getTotalAmount() / VAT_RATE;
    const vat = getTotalAmount() - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  const handleSave = async () => {
    setOnFetch(true);
    const data = {
      ...bookingState,
      check_in: moment(bookingState.check_in).format("YYYY-MM-DD"),
      check_out: moment(bookingState.check_out).format("YYYY-MM-DD"),
      rooms: bookingState.room_details,
      totalAmount: getTotalAmount(),
    };

    try {
      const result = await createBooking(data);
      bookingDispatch({
        type: "SET_BOOKING_SUCCESS",
        payload: result?.data?.booking_reference,
      });

      navigate(bookingUrl(params, bookingSuccess));
      setOnFetch(false);
    } catch (error) {
      setOnFetch(false);
      setOnFetchError("Booking Error");
    }
  };

  const handleBack = () => {
    navigate(bookingUrl(params, bookingGuestDetails));
  };

  return (
    <>
      <Box margin="2em">
        <div>
          <Card style={{ width: "100%" }}>
            {/* <CardHeader title="Review Booking" />
            <Divider variant="fullWidth" /> */}
            <CardContent>
              <BookingSummary
                booking_details={{
                  ...guest,
                  check_in: bookingState.check_in,
                  check_out: bookingState.check_out,
                  no_nights: handleGetNoNights(),
                  rooms: handleGetRooms(),
                  sub_total: getSubTotal(),
                  vat: handleVat(),
                }}
              />
            </CardContent>
            <div>
              <Grid container textAlign="center">
                <Grid item xs={12} sm={6} className={classes.totalSection}>
                  <span>DOWNPAYMENT</span>
                  <Typography variant="h4" noWrap>
                    {currencyFormat(getTotalAmount() / 2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.totalSection}>
                  <span>TOTAL AMOUNT</span>
                  <Typography variant="h4" noWrap>
                    {currencyFormat(getTotalAmount())}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={onFetch}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={onFetchError}
        onClose={() => setOnFetchError(false)}
        autoHideDuration={4000}
      >
        <Alert
          onClose={() => setOnFetchError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {onFetchError}
        </Alert>
      </Snackbar>
      <SaveButton
        onSubmit={handleSave}
        onBack={handleBack}
        saveLabel={buttonMessage.confirm}
      />
    </>
  );
};

export default ReviewBooking;
