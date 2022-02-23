import React from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { ImageOutlined } from "@mui/icons-material/";
import Typography from "@mui/material/Typography";
import DateAgo from "../../components/DateAgo/DateAgo";

const TimelineImage = (props) => {
  const { date, image, showImage } = props;

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="primary">
          <ImageOutlined style={{ fontSize: "1em" }} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        sx={{ py: "21px", px: 2 }}
      >
        <Typography>
          Guest Uploaded an Image{" "}
          <span
            style={{
              cursor: "pointer",
              color: "blue",
            }}
            onClick={() => showImage(image.src)}
          >
            <u>(Show)</u>
          </span>
        </Typography>

        <span>
          {" "}
          <DateAgo date={date} />
        </span>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineImage;
