import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  CardHeader,
  Table,
  Grid,
} from "@mui/material";
import BookingStatus from "./../../components/BookingStatus/BookingStatus";
import { makeStyles } from "@mui/styles";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import BookingSummary from "../../components/BookingSummary/BookingSummary";
import { VAT_RATE } from "../../../config";
import { getNoNights } from "./../../../misc";

const useStyles = makeStyles(
  () => ({
    card: {},
    root: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      alignItems: "center",
      margin: "3em",
    },
  }),
  {
    name: "MyBookingDetails",
  }
);

const MyBookingDetails = (props) => {
  const { id } = useParams();
  const classes = useStyles(props);
  const booking = jwt_decode(id);
  const { guest, check_in, check_out, billing, rooms, status } = booking;

  const getNoQuantity = (roomtype_id) => {
    return rooms.filter((obj) => obj.roomtype_id === roomtype_id).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = rooms.filter(
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

  const handleVat = () => {
    const vatable_sales = billing?.total_amount / VAT_RATE;
    const vat = billing?.total_amount - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  return (
    <div className={classes.root}>
      <Box sx={{ boxShadow: 3 }}>
        <Card className={classes.card}>
          <CardHeader
            title={
              <Box display="flex" justifyContent="space-between">
                <h4>Booking Summary</h4>
                <BookingStatus status={status} />
              </Box>
            }
          />
          <Divider variant="fullWidth" />
          <CardContent>
            <BookingSummary
              booking_details={{
                ...guest,
                check_in,
                check_out,
                no_nights: getNoNights(check_in, check_out),
                rooms: handleGetRooms(),
                sub_total: billing?.sub_total,
                vat: handleVat(),
                total_amount: billing?.total_amount,
              }}
            />
          </CardContent>
        </Card>{" "}
      </Box>
    </div>
  );
};

export default MyBookingDetails;
