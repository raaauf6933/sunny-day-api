import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import DiscountList from "./view/DiscountList";
import { WindowTitle } from "../components/WindowTitle/WindowTitle";

const Component = () => {
  return (
    <>
      <WindowTitle title={"Discount"} />
      <Switch>
        <Route exact path="/" element={<DiscountList />} />
      </Switch>
    </>
  );
};

export default Component;
