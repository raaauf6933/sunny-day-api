import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

const component = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" element={<h1>Rooms List</h1>} />
        <Route exact path=":id" element={<h1>Room Details</h1>} />
      </Switch>
    </>
  );
};

export default component;
