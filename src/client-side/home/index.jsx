import React from "react";
// import mainLogo from "../components/Navbar/bg_5.jpg";
// import service1 from "../assets/images/services-1.jpg";
// import service2 from "../assets/images/services-2.jpg";
// import service3 from "../assets/images/services-3.jpg";
// import service4 from "../assets/images/services-4.jpg";
import DatePickerSection from "../components/DatePickerSection";
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

const Home = () => {
  const { navbarDispatch } = React.useContext(navbarContext);
  const { bookingDispatch } = React.useContext(bookingContext);
  React.useEffect(() => {
    navbarDispatch({ type: "SET_ALLWAYS_AWAKE", payload: false });
    bookingDispatch({
      type: "RESET_ROOMS",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WindowTitle title={resortName("Home")} />
      <Hero></Hero>
      <AppContainer>
        {/* <CheckAvailabilityCard /> */}

        <DatePickerSection />
        <ServiceSection />

        {/* <SectionLabel title="Best of Our Rooms" />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/rooms">
            <Typography variant="h4" gutterBottom>
              See more...
            </Typography>
          </Link>
        </div> */}
      </AppContainer>
    </>
  );
};

export default Home;
