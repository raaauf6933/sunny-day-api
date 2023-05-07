import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { currencyFormat } from "../../../../../client-side/utils/formatter";
import { VAT_RATE } from "../../../../../config";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles(
  () => {
    return {
      card: {
        overflow: "hidden",
        marginLeft: "1em",
        marginBottom: "1em",
      },
      stickyCard: {
        position: "sticky",
        top: "80px",
        overflow: "hidden",
        marginLeft: "1em",
        marginBottom: "1em",
      },
      title: {
        textAlign: "center",
        borderBottom: "2px solid #7766664f",
      },
      totalSection: {
        backgroundColor: "#ffe024 ",
        color: "#1856e2  !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
      },
    };
  },
  { name: "BookingSummary" }
);

const SummarySideBar = (props) => {
  const { bookingState, disabled, onSubmit, loading } = props;
  const { dates, room_details } = bookingState;

  const classes = useStyles(props);

  const handleGetNoNights = () => {
    const start = moment(dates[0], "YYYY-MM-DD");
    const end = moment(dates[1], "YYYY-MM-DD");
    const nights = Math.abs(moment.duration(start.diff(end)).asDays());

    return isNaN(nights) ? 0 : nights;
  };

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
  

  const handleSubmit = () => {
    const data = {
      ...bookingState,
      check_in: moment(bookingState.dates[0]).format("YYYY-MM-DD"),
      check_out: moment(bookingState.dates[1]).format("YYYY-MM-DD"),
      rooms: bookingState.room_details,
      totalAmount: getTotalAmount(),
    };

    onSubmit(data);
  };

  return (
    <Card className={classes.stickyCard}>
      <CardHeader title={"Booking Summary"} />
      <Divider />
      <CardContent>
        <Typography variant="body1" fontWeight="bold">
          CHECK-IN
        </Typography>
        <Typography variant="body2" gutterBottom>
          {moment(dates[0]).format("D MMMM YYYY")},{" "}
          {moment(dates[0]).format("ddd")} - 2:00PM{" "}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          CHECK-OUT
        </Typography>
        <Typography variant="body2" marginBottom="3px">
          {moment(dates[1]).format("D MMMM YYYY")},{" "}
          {moment(dates[1]).format("ddd")} - 11:00AM ({handleGetNoNights()}{" "}
          Nights)
        </Typography>

        {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          NO. NIGHT(S)
        </Typography>
        <Typography variant="body1">5</Typography>
      </div> */}
        <Table style={{ border: "none" }}>
          <TableHead>
            <TableCell>Room</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableHead>

          {handleGetRooms().map((e) => {
            return (
              <TableRow>
                <TableCell style={{ border: "none" }}>{e.room_name}</TableCell>
                <TableCell style={{ border: "none" }}>{e.qty}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap", border: "none" }}>
                  {currencyFormat(e.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </Table>

        <Typography variant="body1" fontWeight="bold">
          Breakdown
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">Sub-Total</Typography>
          <Typography variant="body2">
            {currencyFormat(getSubTotal())} X {handleGetNoNights()} (Nights)
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">Vatable Sale</Typography>
          <Typography variant="body2">
            {currencyFormat(handleVat().vatable_sales)}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">VAT Amount</Typography>
          <Typography variant="body2">
            {currencyFormat(handleVat().vat)}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "1em",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Total Amount
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {currencyFormat(getTotalAmount())}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <LoadingButton
          fullWidth
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="end"
          color="primary"
          disabled={disabled}
          variant="contained"
        >
          <b>Confirm</b>
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default SummarySideBar;
