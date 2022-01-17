import React from "react";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { Facebook, Twitter, Instagram } from "@mui/icons-material/";
import { Box } from "@mui/material";

const useStyles = makeStyles(
  () => ({
    avatar: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    footer: {
      padding: "7em",
      fontSize: "16px",
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      background: "#FFF",
    },
  }),
  {
    name: "Footer",
  }
);

const Footer = (props) => {
  const classes = useStyles(props);

  return (
    <footer
      className={classes.footer}
      style={{
        color: "#0000009c !important",
        fontWeight: 600,
      }}
    >
      <div class="container">
        {/* <Grid container>
          <Grid item>
            {/* <div class="ftco-footer-widget pt-md-5 mb-4"> */}
        {/* <h2 class="ftco-heading-2">About</h2> */}
        {/* <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p> */}
        {/* <ul class="ftco-footer-social list-unstyled float-md-left float-lft">
                <li class="ftco-animate fadeInUp ftco-animated">
                  <a href="javascript:void(0);" target="_blank">
                    <span class="fa fa-facebook"></span>
                  </a>
                </li>
                <li class="ftco-animate fadeInUp ftco-animated">
                  <Link to="https://facebook.com">
                    <span class="fa fa-facebook"></span>
                  </Link>
                </li>
                <li class="ftco-animate fadeInUp ftco-animated">
                  <Link to="https://facebook.com"  >
                    <span class="fa fa-facebook"></span>
                  </Link>
                </li>
              </ul> */}
        {/* </div> */}
        {/* </Grid>
        </Grid>  */}
        {/* <div class="row mb-4">
          <div class="col-md pt-5">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">About</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft">
                <li class="ftco-animate fadeInUp ftco-animated">
                  <a href="javascript:void(0);" target="_blank">
                    <span class="fa fa-facebook"></span>
                  </a>
                </li>
                <li class="ftco-animate fadeInUp ftco-animated">
                  <Link to="https://facebook.com">
                    <span class="fa fa-facebook"></span>
                  </Link>
                </li>
                <li class="ftco-animate fadeInUp ftco-animated">
                  <Link to="https://facebook.com">
                    <span class="fa fa-facebook"></span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4 ml-md-5">
              <h2 class="ftco-heading-2">Infromation</h2>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="py-2 d-block">
                    Online Enquiry
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    General Enquiries
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Booking Conditions
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Privacy and Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Call Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">Experience</h2>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="py-2 d-block">
                    Adventure
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Hotel and Restaurant
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Beach
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Nature
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Camping
                  </a>
                </li>
                <li>
                  <a href="#" class="py-2 d-block">
                    Party
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li>
                    <span class="icon fa fa-map-marker"></span>
                    <span class="text">
                      203 Fake St. Mountain View, San Francisco, California, USA
                    </span>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon fa fa-phone"></span>
                      <span class="text">+2 392 3929 210</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon fa fa-paper-plane"></span>
                      <span class="text">info@yourdomain.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div class="row"> */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            marginBottom={"1em"}
          >
            <Avatar className={classes.avatar}>
              <Facebook />
            </Avatar>
            <Avatar className={classes.avatar}>
              <Instagram />
            </Avatar>
            <Avatar className={classes.avatar}>
              <Twitter />
            </Avatar>
          </Box>
          <p>Copyright © 2021 All rights reserved | Hotel Reservation</p>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
