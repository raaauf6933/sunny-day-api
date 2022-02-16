import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AvailedRoomTable from "./AvailedRoomTable";
import moment from "moment";
import { currencyFormat } from "../../utils/formatter";

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

const BookingSummary = ({ booking_details }) => {
  const {
    first_name,
    last_name,
    contact_number,
    email,
    street_address,
    city,
    province,
    no_guest,
    check_in,
    check_out,
    no_nights,
    rooms,
    sub_total,
    vat,
    total_amount,
  } = booking_details;

  const classes = useStyles({});

  return (
    <>
      <Grid container>
        <Grid container xs={12} sm={6} justifyContent="space-between">
          <Grid item marginLeft={1} xs={12} sm={12}>
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
            <Typography variant="body1">{contact_number}</Typography>
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
            <Typography marginLeft={1} variant="h5">
              Booking Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} className={classes.sectionField}>
            <span style={{ whiteSpace: "nowrap" }}>
              <b>Check-In: </b>
            </span>
            <Typography variant="body1" noWrap>
              {moment(check_in).format("ll")} 02:00PM
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.sectionField}>
            <span style={{ whiteSpace: "nowrap" }}>
              <b>Check-Out: </b>
            </span>
            <Typography variant="body1" noWrap>
              {moment(check_out).format("ll")} 12:00PM
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.sectionField}>
            <span>
              <b>No. Night(s) </b>
            </span>
            <Typography variant="body1">{no_nights}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.sectionField}>
            <span>
              <b>No. Guest</b>
            </span>
            <Typography variant="body1">{no_guest}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <AvailedRoomTable rooms={rooms} />
      <div className={classes.breakdownSection}>
        <Grid container justifyContent="end" textAlign="right">
          <Grid item xs={6} sm={8}>
            <span>
              <b>Sub-total</b>
            </span>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1">
              {currencyFormat(sub_total)} X {no_nights} (Nights)
            </Typography>
          </Grid>
          <Grid item xs={6} sm={8}>
            <span>
              <b>Vatable Sale</b>
            </span>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" noWrap>
              {currencyFormat(vat?.vatable_sales)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={8}>
            <span>
              <b>VAT Amount</b>
            </span>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" noWrap>
              {currencyFormat(vat?.vat)}
            </Typography>
          </Grid>
          {total_amount ? (
            <>
              <Grid item xs={6} sm={8}>
                <span>
                  <b>Total</b>
                </span>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body1" noWrap>
                  {currencyFormat(total_amount)}
                </Typography>
              </Grid>
            </>
          ) : null}
        </Grid>
      </div>
    </>
  );
};

export default BookingSummary;
