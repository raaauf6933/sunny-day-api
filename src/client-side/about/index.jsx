import React from "react";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { Grid, Card, CardContent } from "@mui/material";
import { resortName } from "./../../config";
import AppContainer from "../components/AppContainer";
import AppLayout from "../components/AppLayout";
import Hero from "../components/Hero";
import { Typography, Box } from "@mui/material";

const About = () => {
  return (
    <>
      <AppLayout>
        {" "}
        <WindowTitle title={resortName("About Us")} />
        <Hero>
          <Box textAlign="center">
            <Typography variant="h1">About Us</Typography>
          </Box>
        </Hero>
        <AppContainer>
          <div className="mt-5 mb-5">
            {" "}
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item md={6} sm={12} xs={12} textAlign="center">
                    <img
                      src={`https://res.cloudinary.com/dlqsqlkws/image/upload/v1645010234/GALLERY/17_jfqbss.jpg?w=600&h=700&fit=crop&auto=format`}
                      srcSet={`https://res.cloudinary.com/dlqsqlkws/image/upload/v1645010234/GALLERY/17_jfqbss.jpg?w=600&h=700&fit=crop&auto=format&dpr=2 2x`}
                      alt="Villa Gregoria Resort"
                      loading="lazy"
                      style={{
                        boxShadow: "1em",
                        width: " 100%",
                        height: "auto",
                        borderRadius: "5%",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      gutterBottom
                      textAlign="center"
                    >
                      Make Your Tour Memorable and Safe With Us
                    </Typography>
                    <Typography variant="h6" lineHeight={1.5}>
                      <b>Villa Gregoria Resort</b> is an accredited resort by
                      the Department of Tourism, located at Brgy. Buboy
                      Nagcarlan, Laguna (a two to three-hour drive from Metro
                      Manila). It provides cool, relaxing and refreshing
                      environment for everyone who wants to escape the hustle
                      and bustle of the modern city. Day swimming and overnight
                      stay are offered for guests who want to have relaxing
                      moments as they experience the resort's cool water, and
                      enjoy the resort's sophisticated and architectural
                      cottages, rooms, pools and pavilion. Private pool,
                      mini-Olympic pool, water slides, cold spring / batis, are
                      some of the facilities that every member of the family can
                      surely enjoy.
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </AppContainer>
      </AppLayout>
    </>
  );
};

export default About;
