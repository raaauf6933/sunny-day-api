import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {
  Edit,
  ImageOutlined,
  CheckCircle,
  AddCircle,
  Paid,
} from "@mui/icons-material/";
import Typography from "@mui/material/Typography";

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

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Booking History" />
      <div className={classes.root}>
        {/* <Timeline className={classes.timeLineRoot}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Booking Created</TimelineContent>
          </TimelineItem>
        </Timeline> */}

        <Timeline className={classes.timeLineRoot} position="right">
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
          {/* <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <LaptopMacIcon className={classes.timelineIcon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              className={classes.timelineContent}
              sx={{ py: "21px", px: 2 }}
            >
              <Typography>
                Guest Paid <b>PHP 3,000.00</b>
              </Typography>

              <span>3 days</span>
            </TimelineContent>
          </TimelineItem> */}
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
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Edit className={classes.timelineIcon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              className={classes.timelineContent}
              sx={{ py: "21px", px: 2 }}
            >
              <Typography>Booking Created</Typography>
              <span>3 days</span>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </Card>
  );
};

export default BookingHistory;
