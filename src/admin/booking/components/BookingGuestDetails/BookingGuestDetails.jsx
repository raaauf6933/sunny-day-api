import React from "react";
import {
  Card,
  CardHeader,
  Table,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles(
  () => ({
    CardHeader: {
      background: "#17a2b8",
      color: "white",
      padding: "5px 2px 5px 1em",
    },
    tableCellBold: {
      fontWeight: "600",
    },
    tableRoot: {
      "&.MuiTable-root .MuiTableCell-root": {
        border: "none",
        padding: "8px 0px 1px 1em",
      },
    },
  }),
  { name: "BookingGuestDetails" }
);

const BookingGuestDetails = (props) => {
  const classes = useStyles(props);
  const { booking } = props;
  const { guest, reservation } = booking
    ? booking
    : {
        guest: {},
        reservation: {},
      };

  return (
    <Card>
      <CardHeader className={classes.CardHeader} title="Guest Details" />
      <div
        style={{
          padding: "5px",
          marginBottom: "1em",
        }}
      >
        <Table className={classes.tableRoot}>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Name: </TableCell>
            <TableCell>
              {guest?.first_name} {guest?.last_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>
              Contact Number:{" "}
            </TableCell>
            <TableCell>{guest?.contact_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Email: </TableCell>
            <TableCell>{guest?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>No. Guest: </TableCell>
            <TableCell>{guest?.no_guest}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Address: </TableCell>
            <TableCell>{guest?.street_address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>City: </TableCell>
            <TableCell>{guest?.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Province: </TableCell>
            <TableCell>{guest?.province}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Check-In: </TableCell>
            <TableCell className={classes.tableCellBold}>
              {moment(reservation?.check_in).format("ll")} (
              {moment(reservation?.check_in).format("ddd")})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Check-Out: </TableCell>
            <TableCell className={classes.tableCellBold}>
              {moment(reservation?.check_out).format("ll")} (
              {moment(reservation?.check_out).format("ddd")})
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </Card>
  );
};

export default BookingGuestDetails;
