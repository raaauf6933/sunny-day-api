import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const CardLoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default CardLoadingSpinner;
