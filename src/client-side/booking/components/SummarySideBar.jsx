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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { currencyFormat } from "../../utils/formatter";
import { VAT_RATE } from "../../../config";

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

const BookingSummary = (props) => {
  const { openModal, bookingState } = props;
  const { check_in, check_out, room_details } = bookingState;
  const classes = useStyles(props);

  const handleGetNoNights = () => {
    const start = moment(check_in, "YYYY-MM-DD");
    const end = moment(check_out, "YYYY-MM-DD");
    const nights = Math.abs(moment.duration(start.diff(end)).asDays());
    return nights;
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

  return (
    <div style={{ width: "inherit", overflow: "inherit" }}>
      <Card className={classes.stickyCard}>
        <CardHeader className={classes.title} title={"Booking Summary"} />
        <CardContent>
          <Typography variant="body1" fontWeight="bold">
            CHECK-IN
          </Typography>
          <Typography variant="body2" gutterBottom>
            {moment(check_in).format("D MMMM YYYY")},{" "}
            {moment(check_in).format("ddd")} - 2:00PM{" "}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            CHECK-OUT
          </Typography>
          <Typography variant="body2" marginBottom="3px">
            {moment(check_out).format("D MMMM YYYY")},{" "}
            {moment(check_out).format("ddd")} - 11:00AM ({handleGetNoNights()}{" "}
            Nights)
          </Typography>
          <Typography
            variant="body2"
            color="#1976d2"
            style={{ cursor: "pointer" }}
            onClick={() => openModal("onChangeDate")}
          >
            Change Date
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
                  <TableCell style={{ border: "none" }}>
                    {e.room_name}
                  </TableCell>
                  <TableCell style={{ border: "none" }}>{e.qty}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", border: "none" }}>
                    {currencyFormat(e.amount)}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* <TableRow>
              <TableCell style={{ border: "none" }}>
                Deluxe Room Familtysdf
              </TableCell>
              <TableCell style={{ border: "none" }}>3</TableCell>
              <TableCell style={{ whiteSpace: "nowrap", border: "none" }}>
                PHP 3,000.00
              </TableCell>
            </TableRow> */}
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
        </CardContent>
        <div className={classes.totalSection}>
          <Typography variant="subtitle2" fontWeight="bold">
            BOOKING TOTAL
          </Typography>
          <Typography variant="h5">
            {currencyFormat(getTotalAmount())}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default BookingSummary;
