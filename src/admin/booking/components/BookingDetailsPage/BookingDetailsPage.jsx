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
  const { booking, onUpdateStatus } = props;
  const classes = useStyles(props);

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
            title={booking?.reservation?.booking_reference}
          />
          <span className={classes.statusHolder}>
            {/* { booking?.reservation?.status ? ( */}
            <BookingStatus status={booking?.reservation?.status} />
            {/* ) : (
            <Skeleton />
          )} */}
          </span>
        </div>
        <DateAgo date={booking?.reservation?.created} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <div className={classes.section}>
              <BookingRoomDetails />
            </div>
            <div className={classes.section}>
              <BookingPayment />
            </div>
            <div className={classes.section}>
              <BookingHistory />
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
          save: "CONFIRMED",
        }}
        onClickSave={() =>
          onUpdateStatus(booking?.reservation?.id, booking?.reservation?.status)
        }
      />
    </>
  );
};

export default BookingDetailsPage;
