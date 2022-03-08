import React from "react";
import { TextField, Box, Button } from "@mui/material";
import PageHeader from "./../../../components/PageHeader/PageHeader";
import { makeStyles } from "@mui/styles";
import Form from "./../../../components/Form/Form";
import DatePicker from "./components/DatePicker";
import RoomSection from "./components/RoomSection";
import GuestForm from "./components/GuestForm";
import bookingContext from "../../../context/booking/bookingContext";
import { hasNull } from "./../../../../client-side/utils/validators/guestForm";

const useStyles = makeStyles(
  () => ({
    btnContinue: {
      display: "flex",
      justifyContent: "center",
    },
    root: {
      backgroundColor: "#FFFFFF",
      padding: "1.5em",
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
  const classes = useStyles(props);
  const { rooms, fetchRooms } = props;
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);

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
      bookingDispatch({ type: "RESET" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={"Create Form"}></PageHeader>
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
          <GuestForm guest={bookingState.guest} dispatch={bookingDispatch} />
        </div>

        <div className={classes.btnContinue}>
          <Button variant="contained" disabled={handleDisabled()}>
            {" "}
            Continue
          </Button>
        </div>
      </Box>
    </>
  );
};

export default BookingCreatePage;
