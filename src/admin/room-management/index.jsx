import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";

import RoomTypeList from "./views/RoomTypeList";
import RoomTypeDetails from "./views/RoomTypeDetails";
import RoomTypeCreate from "./views/RoomTypeCreate";

const Component = () => {
  return (
    <Switch>
      <Route exact path="/" element={<RoomTypeList />} />
      <Route exact path="/add" element={<RoomTypeCreate />} />
      <Route exact path=":id" element={<RoomTypeDetails />} />
      <Route exact path="*" element={<Navigate from="*" to="/admin" />} />
    </Switch>
  );
};

export default Component;
