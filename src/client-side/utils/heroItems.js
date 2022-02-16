import React from "react";
import image2 from "../assets/images/resort_image_2.jpg";
import image3 from "../assets/images/home_img1.png";
import image4 from "../assets/images/home_img2.png";
import { Typography } from "@mui/material";
export const heroItems = [
  {
    id: 1,
    image: image3,
    component: (
      <>
        {" "}
        <Typography
          variant="h1"
          gutterBottom
          style={{
            fontFamily: "Flaticon",
          }}
        >
          <span>Stay With Us & Relax</span>
        </Typography>
        <Typography color={"white"} variant="caption" fontWeight={600}>
          ENJOY YOUR WONDERFUL HOLIDAYS WITH A GREAT EXPERIENCE!
        </Typography>{" "}
      </>
    ),
  },
  {
    id: 2,
    image: image4,
    component: (
      <>
        {" "}
        <Typography
          variant="h1"
          gutterBottom
          style={{
            fontFamily: "Flaticon",
          }}
        >
          <span>Experience the Greatest for your Holidays</span>
        </Typography>
      </>
    ),
  },
  {
    id: 3,
    image: image2,
    component: (
      <>
        {" "}
        <Typography
          variant="h1"
          gutterBottom
          style={{
            fontFamily: "Flaticon",
          }}
        >
          <span>Once a year go someplace you've never been before</span>
        </Typography>
      </>
    ),
  },
];
