import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { keyframes } from "@mui/system";

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
            return (
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
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
