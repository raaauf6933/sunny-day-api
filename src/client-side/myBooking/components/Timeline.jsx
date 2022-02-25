import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DateAgo from "../../../admin/components/DateAgo/DateAgo";

const useStyles = makeStyles(
  () => ({
    root: {
      marginBottom: "0px",
      width: "100%",
      "& .MuiTimelineItem-missingOppositeContent:before ": {
        content: "none",
      },
    },
  }),
  {
    name: "bookingTimeline",
  }
);

export default function ColorsTimeline(props) {
  const { events } = props;
  const classes = useStyles(props);

  const eventType = (event) => {
    switch (event.type) {
      case "BOOKING_CREATED":
        return "Booking Created";
      case "GUEST_IMAGE_UPLOAD":
        return "You Upload an Image";
      case "UPDATE_STATUS":
        return "Booking Confirmed";
      case "PAYMENT_CAPTURED":
        return "Your Payment has been Acknowledged";
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader title="Booking Timeline" />
      <Divider />
      <CardContent>
        <Timeline
          className={classes.root}
          style={{ flex: 0.1 }}
          align="left"
          position="right"
        >
          {events &&
            events
              .slice()
              .reverse()
              .map((e, index) => {
                if (index === 0) {
                  return (
                    <TimelineItem
                      style={{
                        width: "100%",

                        paddingLeft: "0px",
                        paddingRight: "0px",
                      }}
                    >
                      <TimelineSeparator>
                        <TimelineDot color="grey" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        whiteSpace="nowrap"
                        display="flex"
                        alignContent="space-between"
                        justifyContent="space-between"
                      >
                        <span>{eventType(e)}</span>

                        <span>
                          <DateAgo date={e.created} />
                        </span>
                      </TimelineContent>
                    </TimelineItem>
                  );
                } else {
                  return (
                    <TimelineItem
                      style={{
                        width: "100%",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                      }}
                    >
                      <TimelineSeparator>
                        <TimelineDot color="grey" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        whiteSpace="nowrap"
                        display="flex"
                        alignContent="space-between"
                        justifyContent="space-between"
                      >
                        <span>{eventType(e)}</span>

                        <span>
                          <DateAgo date={e.created} />
                        </span>
                      </TimelineContent>
                    </TimelineItem>
                  );
                }
              })}
        </Timeline>
      </CardContent>
    </Card>
  );
}
