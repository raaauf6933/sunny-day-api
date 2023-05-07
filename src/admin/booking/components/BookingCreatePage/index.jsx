import React from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import PageHeader from "./../../../components/PageHeader/PageHeader";
import { makeStyles } from "@mui/styles";
import DatePicker from "./components/DatePicker";
import RoomSection from "./components/RoomSection";
import GuestForm from "./components/GuestForm";
import bookingContext from "../../../context/booking/bookingContext";
import { hasNull } from "./../../../../client-side/utils/validators/guestForm";
import BookingSummary from "./components/SummarySideBar";
import moment from "moment";

const useStyles = makeStyles(
  () => ({
    btnContinue: {
      display: "flex",
      justifyContent: "center",
    },
    root: {
      backgroundColor: "#FFFFFF",
      padding: "1.5em",
      borderRadius: "2%",
      //   display: "flex",
      //   justifyContent: "center",
    },
    section: {
      marginBottom: "1em",
    },
  }),
  { name: "" }
);

const BookingCreatePage = (props) => {
  const { createBooking, loading } = props;
  const classes = useStyles(props);
  const { rooms, fetchRooms } = props;
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);

  const onSubmit = (data) => {
    createBooking(data);
  };

  const handleDisabled = () => {
    if (
      hasNull(bookingState) ||
      hasNull(bookingState.guest) ||
      bookingState.room_details.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    return () => {
      console.log("reset")
      bookingDispatch({ type: "RESET" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(bookingState.dates)

  return (
    <>
      <PageHeader title={"Create Form"}></PageHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Box className={classes.root}>
            <div className={classes.section}>
              <h3>1. Choose Date</h3>
              <DatePicker
                data={bookingState.dates}
                dispatch={bookingDispatch}
                fetchRooms={fetchRooms}
              />
            </div>
            <div className={classes.section}>
              <h3>2. Choose Rooms</h3>
              <RoomSection
                rooms={rooms}
                dispatch={bookingDispatch}
                room_details={bookingState.room_details}
              />
            </div>
            <div className={classes.section}>
              <h3>3. Guest Information</h3>
              <GuestForm
                guest={bookingState.guest}
                dispatch={bookingDispatch}
                bookingState={bookingState}
              />
            </div>

            {/* <div className={classes.btnContinue}>
              <Button variant="contained" >
                {" "}
                Continue
              </Button>
            </div> */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <BookingSummary
            bookingState={bookingState}
            disabled={handleDisabled()}
            onSubmit={onSubmit}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BookingCreatePage;
