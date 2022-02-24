import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PageHeader from "../../../components/PageHeader/PageHeader";
import BookingRoomDetails from "../../components/BookingRoomDetails/BookingRoomDetails";
import BookingPayment from "../../components/BookingPayment/BookingPayment";
import BookingHistory from "../../components/BookingHistory/BookingHistory";
import BookingGuest from "../../components/BookingGuestDetails/BookingGuestDetails";
import BookingAdditional from "../../components/BookingAdditional/BookingAdditional";
import BookingStatus from "../BookingStatus/BookingStatus";
import SaveButtonBar from "../../../components/SaveButtonBar/SaveButtonBar";
import DateAgo from "../../../components/DateAgo/DateAgo";

const useStyles = makeStyles(
  () => ({
    header: {
      display: "flex",
      marginBottom: 0,
    },
    headerHolder: {
      display: "flex",
      alignItems: "center",
    },
    section: {
      margin: "1em 0 0 0",
    },
    statusHolder: {
      display: "flex",
      marginLeft: "10px",
    },
  }),
  {
    name: "BookingDetailsPage",
  }
);

const BookingDetailsPage = (props) => {
  const { booking, onUpdateStatus, showReceipt, onConfirmBooking } = props;
  const classes = useStyles(props);

  const saveButtonLabel = () => {
    switch (booking?.status) {
      case "PENDING":
        return "CONFIRMED";
      case "CONFIRMED":
        return "CHECK-IN";
      case "CHECK_IN":
        return "CHECK-OUT";
      default:
        break;
    }
  };

  const submitHandlers = () => {
    switch (booking?.status) {
      case "PENDING":
        onConfirmBooking();
        break;
      default:
        onUpdateStatus(booking?.reservation?.id, booking?.reservation?.status);
        break;
    }
  };

  return (
    <>
      <div
        style={{
          marginBottom: "5em",
        }}
      >
        <div className={classes.headerHolder}>
          <PageHeader
            className={classes.header}
            inline
            title={booking?.booking_reference}
          />
          <span className={classes.statusHolder}>
            {/* { booking?.reservation?.status ? ( */}
            <BookingStatus status={booking?.status} />
            {/* ) : (
            <Skeleton />
          )} */}
          </span>
        </div>
        <DateAgo date={booking?.createdAt} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <div className={classes.section}>
              <BookingRoomDetails rooms={booking?.rooms} />
            </div>
            <div className={classes.section}>
              <BookingPayment booking={booking} billing={booking?.billing} />
            </div>
            <div className={classes.section}>
              <BookingHistory
                events={booking?.events}
                showReceipt={showReceipt}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <div className={classes.section}>
              <BookingGuest booking={booking} />
            </div>
            <div className={classes.section}>
              <BookingAdditional />
            </div>
          </Grid>
        </Grid>
      </div>
      <SaveButtonBar
        labels={{
          save: saveButtonLabel(),
        }}
        hideSaveButton={booking?.status === "CHECK_OUT"}
        onClickSave={() => submitHandlers()}
      />
    </>
  );
};

export default BookingDetailsPage;
