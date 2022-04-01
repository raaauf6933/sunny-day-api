import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  IconButton,
  Divider,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import DatePicker from "./components/DatePicker";
import { makeStyles } from "@mui/styles";
import RoomSection from "./components/RoomSection";
import { GET_AVAILABLE_ROOMTYPE } from "./../../../booking/api";
import apiAxios from "./../../../../apiAxios";
import { VAT_RATE } from "./../../../../config";
import { currencyFormat } from "../../../utils/formatter";

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
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }),
  { name: "" }
);

const ModifyBookingModal = (props) => {
  const { open, onClose, formData, change, hasChanged } = props;
  const classes = useStyles(props);
  const [rooms, setRooms] = React.useState([]);

  const getRooms = async (dates) => {
    try {
      const result = await apiAxios({
        url: GET_AVAILABLE_ROOMTYPE,
        method: "POST",
        data: dates,
      });

      setRooms(result.data);

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRooms({
      checkIn: formData.date[0],
      checkOut: formData.date[1],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date[0], formData.date[1]]);

  const getNoQuantity = (roomtype_id) => {
    return formData.room_details.filter(
      (obj) => obj.roomtype_id === roomtype_id
    ).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = formData.room_details.filter(
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
    const start = moment(formData.date[0], "YYYY-MM-DD");
    const end = moment(formData.date[1], "YYYY-MM-DD");
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

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle className={classes.dialogTitle}>
          <h2>Modify Booking</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className={classes.root}>
                <div className={classes.section}>
                  <h3>1. Choose Date</h3>
                  <DatePicker
                    data={formData.date}
                    change={change}
                    // dispatch={bookingDispatch}
                    // fetchRooms={fetchRooms}
                  />
                </div>
                <div className={classes.section}>
                  <h3>2. Choose Rooms</h3>
                  <Grid container item xs={12} sm={12} spacing={2}>
                    {rooms.map((room, index) => (
                      <RoomSection
                        key={index}
                        room={room}
                        change={change}
                        room_data={formData.room_details}
                        // openModal={openModal}
                      />
                    ))}
                  </Grid>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              {/* <BookingSummary
      bookingState={bookingState}
      disabled={handleDisabled()}
      onSubmit={onSubmit}
      loading={loading}
    /> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display="flex" width="100%" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="body2">Sub-Total</Typography>
              <Typography variant="body2">
                {currencyFormat(getSubTotal())} X {handleGetNoNights()} Day(s)
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="body2">Vatable Sale </Typography>
              <Typography variant="body2">
                {currencyFormat(handleVat().vatable_sales)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="body2">VAT </Typography>
              <Typography variant="body2">
                {currencyFormat(handleVat().vat)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="body1" fontWeight={600}>
                TOTAL AMOUNT
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {currencyFormat(getTotalAmount())}
              </Typography>
            </Box>
          </Box>
        </DialogActions>
        <DialogActions>
          <Button variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button variant="contained" fullWidth disabled={!hasChanged}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModifyBookingModal;
