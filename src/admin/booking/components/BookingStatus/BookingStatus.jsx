import React from "react";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";

const useStyles = makeStyles(
  () => ({
    pendingStatus: {
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
    defaultStatus: {
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
    orderStatuslabel: {
      fontWeight: 600,
      paddingRight: "11px",
    },
  }),
  {
    name: "BookingStatus",
  }
);

const BookingStatus = (props) => {
  const { status } = props;
  const classes = useStyles(props);
  return (
    <div
      className={classNames(null, {
        [classes.pendingStatus]: status === "PENDING",
        [classes.defaultStatus]: status === "CONFIRMED",
      })}
    >
      <FiberManualRecordIcon />
      <span className={classes.orderStatuslabel}>{status}</span>
    </div>
  );
};

export default BookingStatus;
