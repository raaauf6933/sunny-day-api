import React from "react";
import { Card, CardHeader, Table, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { currencyFormat, getNoNights } from "./../../../../misc";

const useStyles = makeStyles(
  () => ({
    cardHeader: {
      background: "#28a745",
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
  {
    name: "BookingPayment",
  }
);

const BookingPayment = (props) => {
  const classes = useStyles(props);
  const { billing, booking } = props;

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Payment Details" />
      <div
        style={{
          padding: "5px",
          marginBottom: "1em",
        }}
      >
        <Table className={classes.tableRoot}>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Sub-Total: </TableCell>
            <TableCell>
              <span>
                {currencyFormat(billing?.sub_total)} X{" "}
                {getNoNights(booking.check_in, booking.check_out)} night(s)
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>
              Discount:{" "}
              {billing?.discount ? (
                <span>({billing?.discount.type})</span>
              ) : null}
            </TableCell>
            <TableCell>
              {billing?.discount
                ? currencyFormat(billing.discount.amount)
                : currencyFormat(0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>
              Total Amount:{" "}
            </TableCell>
            <TableCell>{currencyFormat(billing?.total_amount)}</TableCell>
          </TableRow>
        </Table>
      </div>
    </Card>
  );
};

export default BookingPayment;
