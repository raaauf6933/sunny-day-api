import React from "react";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { getBookingStatusFormat } from "../../../misc";

const useStyles = makeStyles(
  () => ({
    cancelled: {
      backgroundColor: "#ff7370",
      borderRadius: "25px",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      color: "white",
      padding: "6px",
      "& svg": {
        color: "#ef0000",
      },
    },
    pendingStatus: {
      backgroundColor: "#f1c232",
      borderRadius: "25px",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      color: "white",
      padding: "6px",
      "& svg": {
        color: "#d39e00",
      },
    },
    defaultStatus1: {
      backgroundColor: "#C6DDFF",
      borderRadius: "25px",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      color: "#000000a3",
      padding: "6px",
      "& svg": {
        color: "#74A5E7",
      },
    },
    successStatus: {
      backgroundColor: "#28a745cc",
      borderRadius: "25px",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      color: "#ffffff",
      padding: "6px",
      "& svg": {
        color: "#26933f",
      },
    },
    defaultStatus2: {
      backgroundColor: "#6c757d7d",
      borderRadius: "25px",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      color: "#000000a3",
      padding: "6px",
      "& svg": {
        color: "#6c757d",
      },
    },
    orderStatuslabel: {
      fontWeight: 600,
      paddingRight: "11px",
      whiteSpace: "nowrap",
    },
  }),
  {
    name: "BookingStatus",
  }
);

const BookingStatus = (props) => {
  const { status } = props;
  const classes = useStyles(props);

  if (status) {
    return (
      <div
        className={classNames(null, {
          [classes.pendingStatus]: status === "PENDING",
          [classes.defaultStatus1]: ["RESERVED", "CHECK_IN"].includes(status),
          [classes.successStatus]: status === "CHECK_OUT",
        })}
      >
        <FiberManualRecordIcon />
        <span className={classes.orderStatuslabel}>
          {getBookingStatusFormat(status)}
        </span>
      </div>
    );
  } else {
    return <Skeleton height="3.5em" width="6.5em" />;
  }
};

export default BookingStatus;
