import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { currencyFormat } from "../../../../misc";

const useStyles = makeStyles(
  () => ({
    cardHeader: {
      background: "#28a745",
      color: "white",
      padding: "5px 2px 5px 1em",
    },
    tableHeader: {
      borderTop: "1px solid rgb(193 193 193)",
      fontWeight: "600 !important",
    },
    tableRoot: {
      // "&.MuiTable-root .MuiTableCell-root": {
      //   borderTop: "1px solid rgb(193 193 193)",
      // },
    },
  }),
  {
    name: "BookingRoomDetails",
  }
);

const BookingRoomDetails = (props) => {
  const classes = useStyles(props);
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Room Details" />
      <Table className={classes.tableRoot}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Room</TableCell>
            <TableCell className={classes.tableHeader}>Room Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Deluxe Room (A1)</TableCell>
            <TableCell>{currencyFormat(3000)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Family Room (A2)</TableCell>
            <TableCell>{currencyFormat(5000)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default BookingRoomDetails;
