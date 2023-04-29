import React, { useEffect, useState } from "react";
// import mainLogo from "../components/Navbar/bg_5.jpg";
// import service1 from "../assets/images/services-1.jpg";
// import service2 from "../assets/images/services-2.jpg";
// import service3 from "../assets/images/services-3.jpg";
// import service4 from "../assets/images/services-4.jpg";
import DatePickerSectionV2 from "../components/DatePickerSection2";
import ServiceSection from "../components/ServiceSection";
// import RoomSection from "../components/RoomSection";
import AppContainer from "../components/AppContainer";
import Hero from "../components/Hero";
// import { Typography } from "@mui/material";
// import SectionLabel from "../components/SectionLabel";
// import { Link } from "react-router-dom";
import navbarContext from "../context/navBar/navBarContext";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { resortName } from "./../../config";
import bookingContext from "../context/booking/bookingContext";
import AppLayout from "../components/AppLayout";
import { GET_CONTENT_SETTINGS } from "./api";
import apiAxios from "../../apiAxios";

const Home = () => {
  const { navbarDispatch } = React.useContext(navbarContext);
  const { bookingDispatch } = React.useContext(bookingContext);

  const [contentSettings, setContentSettings] = useState();
  React.useEffect(() => {
    navbarDispatch({ type: "SET_ALLWAYS_AWAKE", payload: false });
    bookingDispatch({
      type: "RESET_ROOMS",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContentSettings = async () => {
    setContentSettings();
    try {
      const result = await apiAxios({
        url: GET_CONTENT_SETTINGS,
        // method: "GET",
      });
      setContentSettings(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchContentSettings();
  }, []);

  console.log(contentSettings);

  return (
    <>
      <AppLayout>
        <WindowTitle title={resortName("Home")} />
        <Hero contentSettings={contentSettings}></Hero>
        <AppContainer>
          {/* <CheckAvailabilityCard /> */}

          {/* <DatePickerSectionV2 /> */}
          <div
            style={{
              fontSize: "2em",
              padding: "2em",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, Times, "Times New Roman", serif',
              }}
            >
              Welcome to our page! With just a few clicks, you can easily book
              your dream vacation. We offer a wide variety of rooms and suites
              to fit any budget or preference. Start planning your next getaway
              with us today!
            </span>
          </div>
          <ServiceSection contentSettings={contentSettings} />

          {/* <SectionLabel title="Best of Our Rooms" />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/rooms">
            <Typography variant="h4" gutterBottom>
              See more...
            </Typography>
          </Link>
        </div> */}
        </AppContainer>
      </AppLayout>
    </>
  );
};

export default Home;
