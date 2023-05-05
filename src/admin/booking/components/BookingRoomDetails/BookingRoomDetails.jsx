import React from "react";
import {
  Card,
  CardHeader,
  // CardContent,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Discount } from "@mui/icons-material";
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
  const { rooms, onAddDiscount, booking } = props;
  console.log(rooms);
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Room Details" />
      <Table className={classes.tableRoot}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Room</TableCell>
            <TableCell className={classes.tableHeader}>Room Rate</TableCell>
            <TableCell className={classes.tableHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            rooms,
            (room) => (
              <TableRow>
                <TableCell>{room?.room_num}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                 
                    {room?.discounted_amount ? (
                      <>
                        <s>{currencyFormat(room?.room_amount)}</s>
                        <span>{currencyFormat(room?.discounted_amount)}</span>
                      </>
                    ) : (
                      <span>{currencyFormat(room?.room_amount)}</span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => onAddDiscount(room.room_id)}
                    disabled={
                      room.discounted_amount || booking.status !== "RESERVED"
                    }
                  >
                    <Discount fontSize="inherit" />
                  </IconButton>
                </TableCell>
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
