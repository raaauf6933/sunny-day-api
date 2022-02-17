import React from "react";
import AppContainer from "../components/AppContainer";
import Hero from "../components/Hero";
import { Typography, Box } from "@mui/material";
import RoomSection from "../components/RoomSection";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { resortName } from "./../../config";

const Rooms = () => {
  return (
    <>
      <WindowTitle title={resortName("Gallery")} />
      <Hero>
        <Box textAlign="center">
          <Typography variant="h1">Our Rooms</Typography>
        </Box>
      </Hero>
      <AppContainer>
        <div className="mt-5"></div>
        <RoomSection showAll={true} />
        {/* <Grid container spacing={3}>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid> */}
      </AppContainer>
    </>
  );
};

export default Rooms;
