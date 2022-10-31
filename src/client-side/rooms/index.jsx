import React from "react";
import AppContainer from "../components/AppContainer";
import Hero from "../components/Hero";
import { Typography, Box } from "@mui/material";
import RoomSection from "../components/RoomSection";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { resortName } from "./../../config";
import AppLayout from "../components/AppLayout";
import useFetch from "../../hooks/useFetch";
import { GET_ROOMTYPES } from "./api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import createDialogActionHandlers from "../utils/dialogActionHandlers";
import { roomsHomeUrl } from "./url";

const Rooms = () => {
  const { response } = useFetch({
    url: GET_ROOMTYPES,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    null,
    roomsHomeUrl,
    {}
  );

  const rooms = response?.data ? response?.data : [];

  return (
    <>
      <AppLayout awake={true}>
        <WindowTitle title={resortName("Gallery")} />
        {/* <Hero>
          <Box textAlign="center">
            <Typography variant="h1">Our Rooms</Typography>
          </Box>
        </Hero> */}
        <AppContainer>
          <Box paddingBottom={5}>
            <div className="mt-5"></div>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              width="100%"
              padding="3em"
            >
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                sx={{
                  color: "rgb(247, 177, 47)",
                }}
              >
                Our Rooms
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                }}
                variant="h2"
              >
                Discover Our Place
              </Typography>
            </Box>
            <RoomSection
              showAll={true}
              rooms={rooms}
              openModal={openModal}
              closeModal={closeModal}
              searchParams={searchParams}
            />
            {/* <Grid container spacing={3}>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid> */}
          </Box>
        </AppContainer>
      </AppLayout>
    </>
  );
};

export default Rooms;
