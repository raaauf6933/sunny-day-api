import React from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Edit } from "@mui/icons-material/";
import Typography from "@mui/material/Typography";

import DateAgo from "../../components/DateAgo/DateAgo";

const TimelineEvents = (props) => {
  const { title, date } = props;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>
          <Edit style={{ fontSize: "1em" }} />
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
        <Typography>{title}</Typography>
        <span>
          <DateAgo date={date} />
        </span>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineEvents;
