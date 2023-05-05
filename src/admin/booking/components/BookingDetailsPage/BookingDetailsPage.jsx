import React from "react";
import { Grid, Button } from "@mui/material";
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { getInvoice } from "./../../invoiceTemplate";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    test: {
      color: "purple",
    },
  }),
  {
    name: "BookingDetailsPage",
  }
);

const BookingDetailsPage = (props) => {
  const {
    booking,
    onUpdateStatus,
    showReceipt,
    onConfirmBooking,
    onAddAmenity,
    onAddDiscount,
    onBack,
  } = props;
  const classes = useStyles(props);

  const saveButtonLabel = () => {
    switch (booking?.status) {
      case "PENDING":
        return "RESERVED";
      case "RESERVED":
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
      case "RESERVED":
        onConfirmBooking();
        break;
      case "CHECK_IN":
        onConfirmBooking();
        break;
      default:
        onUpdateStatus(booking?.reservation?.id, booking?.reservation?.status);
        break;
    }
  };

  const handlePrintInvoice = () => {
    pdfMake.createPdf(getInvoice(booking)).open();
  };

  return (
    <>
      <div
        style={{
          marginBottom: "5em",
        }}
      >
        <div className={classes.pageHeader}>
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
          <Button
            variant="outlined"
            color="warning"
            style={{
              outline: "none",
            }}
            onClick={() => handlePrintInvoice()}
          >
            <b>Print Invoice</b>
          </Button>
        </div>

        <DateAgo date={booking?.createdAt} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <div className={classes.section}>
              <BookingRoomDetails
                rooms={booking?.rooms}
                onAddDiscount={onAddDiscount}
                booking={booking}
              />
            </div>
            <div className={classes.section}>
              <BookingPayment
                booking={booking}
                billing={booking?.billing}
                onAddDiscount={onAddDiscount}
              />
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
              <BookingGuest
                booking={booking}
                onUpdateStatus={() => onUpdateStatus("CANCEL")}
              />
            </div>
            <div className={classes.section}>
              <BookingAdditional
                booking={booking}
                onAddAmenity={onAddAmenity}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <SaveButtonBar
        labels={{
          save: saveButtonLabel(),
        }}
        onBack={onBack}
        hideSaveButton={["CHECK_OUT", "EXPIRED", "CANCELLED"].includes(
          booking?.status
        )}
        onClickSave={() => submitHandlers()}
      />
    </>
  );
};

export default BookingDetailsPage;
