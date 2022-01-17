import React from "react";
import { useLocation } from "react-router-dom";

const HeroItem = (props) => {
  const {
    item: { component, image },
    children,
  } = props;
  const location = useLocation();

  return (
    <div
      className="hero-wrap hero-wrap-2 js-fullheight"
      style={{
        backgroundImage: `url(${image})`,
        height:
          location.pathname === "/404" || location.pathname === "/my-booking"
            ? "30em"
            : "25em",
      }}
    >
      <div
        className="overlay"
        style={{
          height:
            location.pathname === "/404" || location.pathname === "/my-booking"
              ? "30em"
              : "25em",
        }}
      ></div>
      {(component || children) && (
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
      )}
    </div>
  );
};

export default HeroItem;
