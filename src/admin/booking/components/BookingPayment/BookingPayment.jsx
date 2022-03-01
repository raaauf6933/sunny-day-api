import React from "react";
import { Card, CardContent, CardHeader, Divider, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { currencyFormat, getNoNights } from "./../../../../misc";
// import PaymentsIcon from "@mui/icons-material/Payments";
import { createAddDiscountBtn } from "./handlers";

const useStyles = makeStyles(
  () => ({
    cardHeader: {
      background: "#28a745",
      color: "white",
      // padding: "5px 2px 5px 1em",
    },
    tableCellBold: {
      fontWeight: "600",
    },
    flexGrid: {
      display: "flex",
      justifyContent: "space-between",
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
  const { billing, booking, onAddDiscount } = props;

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Payment Details"
        action={createAddDiscountBtn(
          booking?.status,
          billing?.discount?.amount,
          onAddDiscount
        )}
      />
      <CardContent>
        <div className={classes.flexGrid}>
          <span>Sub-Total (Rooms)</span>
          <span>
            {currencyFormat(billing?.sub_total)} X{" "}
            {getNoNights(booking.check_in, booking.check_out)} night(s)
          </span>
        </div>
        <div className={classes.flexGrid}>
          <span>Additional Amount</span>
          <span>{currencyFormat(billing?.additional_total)}</span>
        </div>
        <div className={classes.flexGrid}>
          <span>
            Discount{" "}
            {billing?.discount?.amount ? (
              <span>
                (
                <b>
                  {" "}
                  <i>{billing?.discount.type}</i>{" "}
                </b>
                )
              </span>
            ) : null}
          </span>
          <span>
            ({" "}
            {billing?.discount
              ? currencyFormat(billing.discount.amount)
              : currencyFormat(0)}{" "}
            )
          </span>
        </div>
        <div className={classes.flexGrid}>
          <span>
            <b>Total Amount</b>
          </span>
          <span>{currencyFormat(billing?.total_amount)}</span>
        </div>
        <Divider sx={{ margin: "10px 0px 10px 0px" }} />
        <div className={classes.flexGrid}>
          <span>Captured amount</span>
          <span>{currencyFormat(booking?.payment_amount)}</span>
        </div>
        <div className={classes.flexGrid}>
          <span>
            <b>Outstanding Balance</b>
          </span>
          <span>{currencyFormat(booking?.total_balance)}</span>
        </div>
        {/* <Divider sx={{ margin: "10px 0px 10px 0px" }} />
        <Button
          variant="contained"
          color="info"
          size="small"
          sx={{ marginRight: "1em" }}
          startIcon={<PaymentsIcon />}
        >
          Add Payment
        </Button>
        <Button
          startIcon={<LocalOfferIcon />}
          variant="contained"
          color="info"
          size="small"
        >
          Add Discount
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default BookingPayment;
