import React from "react";
import Carousel from "react-material-ui-carousel";
import HeroItem from "./components/HeroItem";
import { heroItems } from "../../utils/heroItems";
// import { useLocation } from "react-router-dom";

const Hero = ({ children, contentSettings }) => {
  // const location = useLocation();

  return (
    // <Carousel
    // indicators={false} stopAutoPlayOnHover animation="fade"

    // >
    // {heroItems.map((item, i) => (
    <HeroItem
      // key={i}
      // item={item}
      contentSettings={contentSettings}
    >
      {children}
    </HeroItem>
    // ))}
    // </Carousel>
  );
};

export default Hero;
