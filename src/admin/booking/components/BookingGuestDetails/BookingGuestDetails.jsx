import React from "react";
import {
  Card,
  CardHeader,
  Table,
  TableRow,
  TableCell,
  // Grid,
  Skeleton,
  Button,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles(
  () => ({
    CardHeader: {
      // background: "#17a2b8",
      // color: "white",
      // padding: "5px 2px 5px 1em",
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
  const { booking, onUpdateStatus } = props;
  const { guest } = booking
    ? booking
    : {
        guest: {},
        reservation: {},
      };

  return (
    <Card>
      <CardHeader
        className={classes.CardHeader}
        title="Guest Details"
        action={
          <>
            {booking.status === "PENDING" ? (
              <Button
                variant="outlined"
                color="error"
                style={{ outline: "none" }}
                onClick={onUpdateStatus}
              >
                CANCEL
              </Button>
            ) : null}
          </>
        }
      />
      <Divider />
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
              {booking ? (
                <span>
                  {" "}
                  {guest?.first_name} {guest?.last_name}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>
              Contact Number:{" "}
            </TableCell>
            <TableCell>
              {guest ? guest?.contact_number : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Email: </TableCell>
            <TableCell>
              {guest ? guest?.email : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>No. Guest: </TableCell>
            <TableCell>
              {guest ? guest?.no_guest : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Address: </TableCell>
            <TableCell>
              {guest ? guest?.street_address : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>City: </TableCell>
            <TableCell>
              {guest ? guest?.city : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Province: </TableCell>
            <TableCell>
              {guest ? guest?.province : <Skeleton width={100} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Check-In: </TableCell>
            <TableCell className={classes.tableCellBold}>
              {guest ? (
                <span>
                  {moment(booking?.check_in).format("ll")} (
                  {moment(booking?.check_in).format("ddd")})
                </span>
              ) : (
                <Skeleton width={100} />
              )}{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCellBold}>Check-Out: </TableCell>
            <TableCell className={classes.tableCellBold}>
              {guest ? (
                <span>
                  {moment(booking?.check_out).format("ll")} (
                  {moment(booking?.check_out).format("ddd")}){" "}
                </span>
              ) : (
                <Skeleton />
              )}
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </Card>
  );
};

export default BookingGuestDetails;
