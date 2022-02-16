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
  Skeleton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { currencyFormat, renderCollection } from "../../../../misc";

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
  const { rooms } = props;

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
          {renderCollection(
            rooms,
            (room) => (
              <TableRow>
                <TableCell>{room?.room_num}</TableCell>
                <TableCell>{currencyFormat(room?.room_amount)}</TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell className={classes.tableHeader}>
                  <Skeleton />
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BookingRoomDetails;
