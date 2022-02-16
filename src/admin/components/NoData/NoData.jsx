import React from "react";
import LayersClearOutlinedIcon from "@mui/icons-material/LayersClearOutlined";

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#0000005c",
      }}
    >
      <LayersClearOutlinedIcon
        style={{
          fontSize: "5em",
        }}
      />
      <div>
        <span>No Data</span>
      </div>
    </div>
  );
};

export default NoData;
