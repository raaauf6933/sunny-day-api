import React from "react";
import Container from "@mui/material/Container";

const AppContainer = (props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default AppContainer;
