import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import UserDetails from "./view/UserDetails";
import UserList from "./view/UserList";
import { WindowTitle } from "../components/WindowTitle/WindowTitle";

const Component = () => {
  return (
    <>
      <WindowTitle title={"Users"} />
      <Switch>
        <Route exact path="/" element={<UserList />} />
        <Route exact path=":id" element={<UserDetails />} />
      </Switch>
    </>
  );
};

export default Component;
