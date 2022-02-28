import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import AmenitiesList from "./view/AmenitiesList";
import { WindowTitle } from "../components/WindowTitle/WindowTitle";

const Component = () => {
  return (
    <>
      <WindowTitle title={"Amenities"} />
      <Switch>
        <Route exact path="/" element={<AmenitiesList />} />
      </Switch>
    </>
  );
};

export default Component;
