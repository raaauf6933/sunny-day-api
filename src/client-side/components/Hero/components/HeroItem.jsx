import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePickerSectionV2 from "../../DatePickerSection2";
import image from "../../../../assets/images/bg_1.jpeg";
import { Box, Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MyBookingCard from "../../MyBookingCard";

const HeroItem = (props) => {
  const { contentSettings } = props;
  // const {
  //   item: { component, image },
  //   children,
  // } = props;
  const location = useLocation();
  const theme = useTheme();
  // const media_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const media_md = useMediaQuery(theme.breakpoints.between("xs", "xl"));
  const [isBooking, setIsBooking] = useState(true);
  return (
    <div
      className="hero-wrap hero-wrap-2 js-fullheight"
      style={{
        backgroundImage: `url(${contentSettings?.home_background[0]?.src})`,
        height: "70em",
        // height:
        //   location.pathname === "/404" || location.pathname === "/my-booking"
        //     ? "30em"
        //     : "25em",
      }}
    >
      <div
        className="overlay"
        style={{
          // height: media_sm ? "54.5em" : "29em",
          height: "inherit",
        }}
      ></div>
      {/* <div
        className="container"
        style={{
          height: "100%",
          // position: "relative",
        }}
      > */}
      <Box
        display="flex"
        sx={{
          height: "100%",
        }}
        alignItems="center"
        position="relative"
        padding={media_md ? "2em" : "6em"}
        paddingX={media_md ? "2em" : "20em"}
        paddingTop="6em"
      >
        <Grid
          container
          sx={{
            height: "100%",
          }}
          spacing={5}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} alignSelf="center">
            <div>
              {/* <Typography variant="h4" color="white" textAlign="center" >
                Sunny Day Residences
              </Typography> */}
              <div class="hero-text">
                <h1
                  style={{
                    fontSize: "9vh",
                    lineHeight: "90px",
                    color: "#ffffff",
                    marginBottom: "16px",
                  }}
                >
                  {contentSettings?.home_heading}
                  {/* Sunny Day Residences */}
                </h1>
                {/* <p
                  style={{
                    fontSize: "18px",
                    color: "#ffffff",
                    lineHeight: "28px",
                    marginBottom: "35px",
                  }}
                >
                  Experience the Greatest for your Holidays.
                </p> */}
                <div
                  style={{
                    // fontSize: "18px",
                    color: "#ffffff",
                    // lineHeight: "28px",
                    marginBottom: "35px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: contentSettings?.home_description,
                  }}
                >
                  {/* Once a year go someplace you've never been before, Here are
                  the best hotel booking sites, including recommendations for
                  finding low-priced hotel rooms. */}
                </div>
                {/* <a href="#" class="primary-btn">Discover Now</a> */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} alignSelf="center">
            {isBooking ? (
              <DatePickerSectionV2 toggleCard={() => setIsBooking(false)} />
            ) : (
              <MyBookingCard toggleCard={() => setIsBooking(true)} />
            )}
          </Grid>
        </Grid>
      </Box>
      {/* </div> */}
      {/* {(component || children) && (
        <div className="container">
          <div
            className="row no-gutters slider-text js-fullheight align-items-end justify-content-center"
            style={{
              height: "286px",
            }}
          >
            <div className="col-md-9 ftco-animate pb-5 text-center fadeInUp ftco-animated">
              {children ? children : component}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default HeroItem;
