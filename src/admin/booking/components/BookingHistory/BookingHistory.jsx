import React from "react";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Timeline from "@mui/lab/Timeline";

import TimelineEvents from "../../../components/Timeline/TimelineEvents";
import TimelineImage from "../../../components/Timeline/TimelineImage";
import TimelineEventsMessage from "../../../components/Timeline/TimelineEventsMessage";
import TimelinePayment from "../../../components/Timeline/TimelinePayment";
import TimelineAdditionals from "../../../components/Timeline/TimelineAdditionals";

const useStyles = makeStyles(
  () => ({
    cardHeader: {
      background: "#007bff",
      color: "white",
      padding: "5px 2px 5px 1em",
    },
    timelineIcon: {
      fontSize: "1em",
    },
    timelineContent: {
      display: "flex",
      justifyContent: "space-between",
    },
    tableCellBold: {
      fontWeight: "600",
    },
    root: {
      display: "flex",
    },
    timeLineRoot: {
      "&.MuiTimeline-root .MuiTimelineItem-root:before": {
        content: "none",
      },
    },
  }),
  {
    name: "BookingHistory",
  }
);

const BookingHistory = (props) => {
  const classes = useStyles(props);
  const { events, showReceipt } = props;

  const eventType = (event) => {
    switch (event.type) {
      case "BOOKING_CREATED":
        return <TimelineEvents title="Booking Created" date={event.created} />;
      case "GUEST_IMAGE_UPLOAD":
        return (
          <TimelineImage
            title="Booking Created"
            date={event.created}
            image={event?.images}
            showImage={showReceipt}
          />
        );
      case "UPDATE_STATUS":
        return <TimelineEventsMessage event={event} date={event.created} />;
      case "PAYMENT_CAPTURED":
        return <TimelinePayment event={event} date={event.created} />;
      case "ADD_AMENITY":
        return <TimelineAdditionals event={event} date={event.created} />;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Booking History" />
      <div className={classes.root}>
        <Timeline className={classes.timeLineRoot} position="right">
          {events ? (
            events
              .slice()
              .reverse()
              .map((event) => {
                return eventType(event);
              })
          ) : (
            <Skeleton />
          )}

          {/* <TimelineItem>
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
                <Typography fontWeight={600}>Juan Dela Cruz</Typography>
                <div
                  style={{
                    marginLeft: "1em",
                  }}
                >
                  - Guest Paid <b>PHP 3,000.00</b> <br />- Update Booking Status
                  from <b>CONFIRMED</b> to <b>CHECK-IN</b>
                </div>
              </div>
              <span>3 days</span>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <CheckCircle className={classes.timelineIcon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent
              className={classes.timelineContent}
              sx={{ py: "21px", px: 2 }}
            >
              <div>
                <Typography fontWeight={600}>Juan Dela Cruz</Typography>
                <div
                  style={{
                    marginLeft: "1em",
                  }}
                >
                  - Update Booking Status from <b>PENDING</b> to{" "}
                  <b>CONFIRMED</b>
                </div>
              </div>
              <span>3 days</span>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <AddCircle className={classes.timelineIcon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent
              className={classes.timelineContent}
              sx={{ py: "21px", px: 2 }}
            >
              <div>
                <Typography fontWeight={600}>Juan Dela Cruz</Typography>
                <div
                  style={{
                    marginLeft: "1em",
                  }}
                >
                  - Added 3 <b>EXTRA BED</b>
                </div>
              </div>
              <span>3 days</span>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <ImageOutlined className={classes.timelineIcon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent
              className={classes.timelineContent}
              sx={{ py: "21px", px: 2 }}
            >
              <Typography>Guest Uploaded an Image</Typography>

              <span>3 days</span>
            </TimelineContent>
          </TimelineItem> */}
        </Timeline>
      </div>
    </Card>
  );
};

export default BookingHistory;
