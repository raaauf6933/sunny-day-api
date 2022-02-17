import React from "react";
// import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Hero from "../Hero";
import { WindowTitle } from "../../../admin/components/WindowTitle/WindowTitle";
import { resortName } from "./../../../config";

// const useStyles = makeStyles(
//   (theme) => ({
//     container: {
//       display: "grid",
//       gridTemplateColumns: "1fr 487px",
//       margin: "0 auto",
//       width: 830,
//     },
//     header: {
//       fontWeight: 600,
//     },
//     innerContainer: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//     },
//     notFoundImage: {
//       "& svg": {
//         width: "100%",
//       },
//     },
//     root: {
//       alignItems: "center",
//       display: "flex",
//       height: "calc(100vh - 180px)",
//     },
//   }),
//   { name: "NotFoundPage" }
// );

const NotFound = (props) => {
  // const classes = useStyles(props);
  return (
    <>
      <WindowTitle title={resortName("404 ")} />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" gutterBottom style={{ fontSize: "7vw" }}>
          <span>404 | Page Not Found</span>
        </Typography>
        <Typography variant="h4" fontWeight={600}>
          <NavLink to="/">Go to home page </NavLink>
        </Typography>
      </div>
    </>
  );
};

export default NotFound;
