import React from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Paid } from "@mui/icons-material/";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { currencyFormat } from "./../../../misc";
import DateAgo from "../../components/DateAgo/DateAgo";

const useStyles = makeStyles(
  () => ({
    timelineIcon: {
      fontSize: "1em",
    },
    timelineContent: {
      display: "flex",
      justifyContent: "space-between",
    },
  }),
  {
    name: "BookingHistory",
  }
);

const TimelinePayment = (props) => {
  const classes = useStyles(props);
  const { event, date } = props;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="primary">
          <Paid className={classes.timelineIcon} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent
        className={classes.timelineContent}
        sx={{ py: "21px", px: 2 }}
      >
        <div>
          <Typography fontWeight={600}>{event?.user}</Typography>
          <div
            style={{
              marginLeft: "1em",
            }}
          >
            - Guest Paid <b>{currencyFormat(event?.amount)}</b>
            {/* <br />- Update
            Booking Status from <b>CONFIRMED</b> to <b>CHECK-IN</b> */}
          </div>
        </div>
        <span>
          {" "}
          <DateAgo date={date} />
        </span>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelinePayment;
