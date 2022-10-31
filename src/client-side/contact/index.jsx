/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { Grid, Button, CardContent, Card } from "@mui/material";
import { resortName } from "./../../config";
import AppContainer from "../components/AppContainer";
import AppLayout from "../components/AppLayout";
import Hero from "../components/Hero";
import { Typography, Box, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { makeStyles } from "@mui/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const useStyles = makeStyles(
  () => ({
    infoSection: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "1em",
    },
    table: {
      "& td": {
        padding: "5px",
      },
    },
    co: {
      fontWeight: 600,
    },
  }),
  {
    name: "Contact",
  }
);

const Contact = (props) => {
  const classes = useStyles(props);
  return (
    <AppLayout awake={true}>
      {" "}
      <WindowTitle title={resortName("Contact")} />
      {/* <Hero>
        <Box textAlign="center">
          <Typography variant="h1">Contact Us</Typography>
        </Box>
      </Hero> */}
      <AppContainer>
        <div
          className="mt-5 mb-5"
          style={{
            paddingTop: "5em",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <Typography variant="h4" style={{ marginBottom: "1em" }}>
                  Contact Us Using the Information Provided Below
                </Typography>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.co}>Address:</td>
                      <td>Blue Mountains Commercial and Residential Estate</td>
                    </tr>
                    <tr>
                      <td className={classes.co}>Phone:</td>
                      <td>(63) 977 034 0569</td>
                    </tr>
                    <tr>
                      <td className={classes.co}>Email:</td>
                      <td>sunnydayresidencesofficial@gmail.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div
                class="mapouter"
                style={{
                  position: "relative",
                  // textAlign: "right",
                  height: "389px",
                  width: "100%",
                }}
              >
                <div
                  class="gmap_canvas"
                  style={{
                    overflow: "hidden",
                    background: "none!important",
                    height: "389px",
                    width: "100%",
                  }}
                >
                  <iframe
                    width="100%"
                    height="389"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=sunny%20day%20residences%20antipolo&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                  ></iframe>
                  <a href="https://fmovies-online.net"></a>
                  <br />
                  <a href="https://www.embedgooglemap.net">
                    embed code google map
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </AppContainer>
    </AppLayout>
  );
};

export default Contact;
