import React from "react";
import { Helmet } from "react-helmet";

export const WindowTitle = ({ title }) => {
  return !title ? null : <Helmet title={`${title} `} />;
};
