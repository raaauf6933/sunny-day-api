import React from "react";
import ContentDetails from "./views/contentDetails";
import { Routes as Switch, Route } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle/WindowTitle";

const Component = () => {
  return (
    <>
      <WindowTitle title={"Content Setting"} />
      <Switch>
        <Route exact path="/" element={<ContentDetails />} />
      </Switch>
    </>
  );
};

export default Component;
