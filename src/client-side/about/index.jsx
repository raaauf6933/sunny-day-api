import React from "react";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { Grid, Card, CardContent } from "@mui/material";
import { resortName } from "./../../config";
import AppContainer from "../components/AppContainer";
import AppLayout from "../components/AppLayout";
import Hero from "../components/Hero";
import bg_1 from "./../../assets/images/bg_1.jpeg";
import { Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const About = () => {
  return (
    <>
      <AppLayout awake={true}>
        {" "}
        <WindowTitle title={resortName("About Us")} />
        {/* <Hero>
          <Box textAlign="center">
            <Typography variant="h1">About Us</Typography>
          </Box>
        </Hero> */}
        <AppContainer>
          <div className="mt-5 mb-5">
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              padding="3em"
            >
              <Typography variant="h2" textAlign="center" fontWeight={600}>
                About Us
              </Typography>
            </Box>{" "}
            {/* <Card>
              <CardContent> */}
            <Grid container alignItems="center" spacing={3}>
              <Grid item md={6} sm={12} xs={12}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  gutterBottom
                  textAlign="center"
                >
                  Welcome to Sunny Day Residences
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    opacity: 0.8,
                  }}
                  lineHeight={1.5}
                >
                  Built in 2011, this hotel is located in Antipolo, Phillipines
                  with easy access to the city’s tourist attractions. It offers
                  tastefully decorated rooms.
                </Typography>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  lineHeight="1.5em"
                  sx={{
                    "& > *": {
                      padding: "5px",
                    },
                  }}
                >
                  <span>
                    <CheckIcon
                      sx={{
                        color: "rgb(247, 177, 47)",
                      }}
                    />{" "}
                    20% Off On Accommodation.{" "}
                  </span>
                  <span>
                    <CheckIcon
                      sx={{
                        color: "rgb(247, 177, 47)",
                      }}
                    />{" "}
                    Complimentary Daily Breakfast
                  </span>
                  <span>
                    <CheckIcon
                      sx={{
                        color: "rgb(247, 177, 47)",
                      }}
                    />{" "}
                    3 Pcs Laundry Per Day{" "}
                  </span>
                  <span>
                    <CheckIcon
                      sx={{
                        color: "rgb(247, 177, 47)",
                      }}
                    />{" "}
                    Free Wifi.{" "}
                  </span>
                  <span>
                    <CheckIcon
                      sx={{
                        color: "rgb(247, 177, 47)",
                      }}
                    />{" "}
                    Discount 20% On F&B
                  </span>
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12} textAlign="center">
                <img
                  src={bg_1}
                  alt="Sunny Day Residences"
                  loading="lazy"
                  style={{
                    boxShadow: "1em",
                    width: " 100%",
                    height: "auto",
                    borderRadius: "5%",
                  }}
                />
              </Grid>
            </Grid>
            {/* </CardContent>
            </Card> */}
          </div>
        </AppContainer>
      </AppLayout>
    </>
  );
};

export default About;
