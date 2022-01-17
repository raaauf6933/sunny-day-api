import React from "react";
import BackgroundImage from "../assets/images/bg_1.jpg";
import BackgroundImage1 from "../assets/images/bg_2.jpg";
import BackgroundImage2 from "../assets/images/bg_5.jpg";
import { Typography } from "@mui/material";
export const heroItems = [
  {
    id: 1,
    image: BackgroundImage,
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
          ENJOY YOUR WONDERFUL HOLIDAYS WITH A GREAT LUXURY EXPERIENCE!
        </Typography>{" "}
      </>
    ),
  },
  {
    id: 2,
    image: BackgroundImage1,
    component: null,
  },
  {
    id: 3,
    image: BackgroundImage2,
    component: null,
  },
];
