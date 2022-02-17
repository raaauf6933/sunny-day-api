import React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import navbarContext from "../../context/navBar/navBarContext";
import { navBarStructure } from "../../utils/navBarStructure";
import { NavLink } from "react-router-dom";

const DrawerComponent = () => {
  const { navbarState, navbarDispatch } = React.useContext(navbarContext);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    navbarDispatch({ type: "SET_DRAWER", payload: false });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navBarStructure.map((e) => (
          <>
            <NavLink to={e.url} style={{ color: "#6c6a6a" }}>
              <ListItem button key={e.name}>
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography fontWeight={600}>{e.label}</Typography>}
                />
              </ListItem>
            </NavLink>
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment key={"left"}>
      <Drawer
        anchor={"left"}
        open={navbarState.showDrawer}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComponent;
