import React from "react";
import moment from "moment";
import { Tooltip } from "@mui/material";

const DateAgo = ({ date }) => {
  return (
    <div
      style={{
        // width: "13%",
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      <Tooltip title={moment(date).format("lll")}>
        <span>{moment(date).fromNow()}</span>
      </Tooltip>
    </div>
  );
};

export default DateAgo;
