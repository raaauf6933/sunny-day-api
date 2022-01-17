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
  const { guest_details, room_details } = bookingState;
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    street_address,
    city,
    province,
    no_guest,
  } = guest_details;

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
      totalAmount: getTotalAmount(),
    };
    const result = await createBooking(data);

    if (result?.data) {
      if (result?.data?.booking === "success") {
        bookingDispatch({
          type: "SET_BOOKING_SUCCESS",
          payload: result?.data?.booking_reference,
        });
        navigate(bookingUrl(params, bookingSuccess));
      } else {
        setOnFetchError("Booking Error");
      }
      setOnFetch(false);
    } else {
      setOnFetchError("Internal Server Error");
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
              <Grid container>
                <Grid container xs={12} sm={6} justifyContent="space-between">
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Guest Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>Name: </b>
                    </span>
                    <Typography variant="body1">
                      {first_name} {last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>Mobile Number: </b>
                    </span>
                    <Typography variant="body1">{mobile_number}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>Email: </b>
                    </span>
                    <Typography variant="body1">{email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>Address: </b>
                    </span>
                    <Typography variant="body1" textAlign="right">
                      {street_address} {city} {province}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container xs={12} sm={6} justifyContent="space-between">
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Booking Details</Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <b>Check-In: </b>
                    </span>
                    <Typography variant="body1" noWrap>
                      {moment(bookingState.check_in).format("ll")} 02:00PM
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <b>Check-Out: </b>
                    </span>
                    <Typography variant="body1" noWrap>
                      {moment(bookingState.check_out).format("ll")} 12:00PM
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>No. Night(s) </b>
                    </span>
                    <Typography variant="body1">
                      {handleGetNoNights()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.sectionField}>
                    <span>
                      <b>No. Guest</b>
                    </span>
                    <Typography variant="body1">{no_guest}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <AvailedRoomTable rooms={handleGetRooms()} />
              <div className={classes.breakdownSection}>
                <Grid container justifyContent="end" textAlign="right">
                  <Grid item xs={6} sm={8}>
                    <span>
                      <b>Sub-total</b>
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body1">
                      {currencyFormat(getSubTotal())} X {handleGetNoNights()}{" "}
                      (Nights)
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <span>
                      <b>Vatable Sale</b>
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body1" noWrap>
                      {currencyFormat(handleVat().vatable_sales)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <span>
                      <b>VAT Amount</b>
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body1" noWrap>
                      {currencyFormat(handleVat().vat)}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
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
