import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { keyframes } from "@mui/system";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink } from "react-router-dom";

const spin = keyframes`
0% {
  opacity: 0;
}
100% {
  color: green;
}
`;

export default function MobileDrawer({
  navbarStructure,
  openMobileDrawer,
  setOpenMobileDrawer,
}) {
  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenMobileDrawer(false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={openMobileDrawer}
        onClose={toggleDrawer()}
        style={{
          zIndex: "3000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <List>
          {navbarStructure().map((e) => {
            if (e.children) {
              return (
                <>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>{e.icon}</ListItemIcon>
                    <ListItemText primary={e.label} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {e.children.map((e) => {
                        return (
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary={e.label} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            } else {
              return (
                <NavLink to={e.url} style={{ color: "#6c6a6a" }}>
                  <ListItem button key={e.label}>
                    <ListItemIcon>{e.icon}</ListItemIcon>
                    <Box>
                      <ListItemText
                        primary={e.label}
                        style={{
                          animation: `${spin}`,
                        }}
                      />
                    </Box>
                  </ListItem>
                </NavLink>
              );
            }
          })}
        </List>
      </Drawer>
    </div>
  );
}
