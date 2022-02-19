import React from "react";
import Carousel from "react-material-ui-carousel";
import HeroItem from "./components/HeroItem";
import { heroItems } from "../../utils/heroItems";
import { useLocation } from "react-router-dom";

const Hero = ({ children }) => {
  const location = useLocation();

  return (
    <Carousel indicators={false} autoPlay duration={3} animation="fade">
      {heroItems.map((item, i) => (
        <HeroItem key={i} item={item}>
          {children}
        </HeroItem>
      ))}
    </Carousel>
  );
};

export default Hero;
