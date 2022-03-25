import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import navbarContext from "../../context/navBar/navBarContext";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { navBarStructure } from "../../utils/navBarStructure";
import AppbarAwake from "./components/AppbarAwake";
import AppbarDynamic from "./components/AppbarDynamic";

const ElevationScroll = (props) => {
  const { children: childrenFunct, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  const children = childrenFunct({
    trigger,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    trigger,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = (props) => {
  const { awake } = props;
  const location = useLocation();
  const { navbarState, navbarDispatch } = React.useContext(navbarContext);

  const handleOpenDrawer = () => {
    navbarDispatch({ type: "SET_DRAWER", payload: !navbarState.showDrawer });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        {({ trigger }) => {
          return awake ? (
            <AppbarAwake
              navBarStructure={navBarStructure}
              handleOpenDrawer={handleOpenDrawer}
              location={location}
            />
          ) : (
            <AppbarDynamic
              trigger={trigger}
              handleOpenDrawer={handleOpenDrawer}
              navBarStructure={navBarStructure}
              location={location}
            />
          );
        }}
      </ElevationScroll>
    </Box>
  );
};

export default Navbar;
