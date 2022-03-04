import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    active: {
      color: "green",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      whiteSpace: "nowrap",
      "& > *": {
        margin: "2px",
      },
    },
    disabled: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      whiteSpace: "nowrap",
      color: "#d32f2f",
      "& > *": {
        margin: "2px",
      },
    },
    icon: {
      fontSize: "15px",
    },
  }),
  {
    name: "Status",
  }
);

const Status = ({ status }) => {
  const classes = useStyles({});

  switch (status) {
    case "ACT":
      return (
        <div className={classes.active}>
          <FiberManualRecordIcon className={classes.icon} />
          <span>Active</span>
        </div>
      );
    case "DEACT":
      return (
        <div className={classes.disabled}>
          <FiberManualRecordIcon className={classes.icon} />
          <span>Disabled</span>
        </div>
      );
    default:
      return <span>{status}</span>;
  }
};

export default Status;
