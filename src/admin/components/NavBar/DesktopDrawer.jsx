import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Hidden, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import menuArrowIcon from "../../../assets/images/menu-arrow-icon.svg";
import classNames from "classnames";
import { keyframes } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { createHref } from "../../../misc";
import SVG from "react-inlinesvg";
import { NavLink, useMatch as patchMatch } from "react-router-dom";
import { matchPath } from "react-router";

const spin = keyframes`
0% {
  opacity: 0;
}
100% {
  color: green;
}
`;

const theme = createTheme();

const useStyles = makeStyles(
  () => {
    return {
      isMenuSmall: {
        "& path": {
          fill: theme.palette.primary.main,
        },
        "& span": {
          margin: "0 8px",
        },
        "& svg": {
          marginTop: 8,
          transform: "rotate(180deg)",
        },
        "&:hover": {
          background: "#E6F3F3",
        },
        background: theme.palette.background.paper,
        border: `solid 1px #EAEAEA`,
        borderRadius: "50%",
        cursor: "pointer",
        height: 32,
        position: "absolute",
        right: -16,
        top: 100,
        transition: `background ${theme.transitions.duration.shorter}ms`,
        width: 32,
        zIndex: 99,
      },
      isMenuSmallHide: {
        "& svg": {
          marginLeft: "3px",
          transform: "rotate(0deg)",
        },
      },
      menuListItem: {
        color: "rgba(0, 0, 0, 0.87)",
      },
      menuListActiveItem: {
        color: "#1976d2",
        fontWeight: 600,
      },
    };
  },
  {
    name: "NavBar",
  }
);

const DesktopDrawer = ({
  drawerWidth,
  navbarStructure,
  open,
  setOpen,
  location,
  ...rest
}) => {
  const classes = useStyles(rest);

  const isActive = (menuItem) => {
    if (
      menuItem.key === "dashboard" &&
      (location === "/admin" || location === "/admina/")
    ) {
      return true;
    } else {
      return location.includes(menuItem.key);
    }
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        // style={{
        //   transition: "width 1s, height 4s",
        // }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 500ms, height 4s",
            overflow: "visible",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Toolbar />
          <Hidden smDown>
            <div
              className={classNames(classes.isMenuSmall, {
                [classes.isMenuSmallHide]: !open,
              })}
              onClick={() => setOpen(!open)}
            >
              <div
                style={{
                  margin: "0 8px",
                }}
              >
                <SVG src={menuArrowIcon} />
              </div>
            </div>
          </Hidden>
          <List>
            {navbarStructure().map((e) => {
              return (
                <>
                  <NavLink
                    to={e.url}
                    style={{
                      animation: `${spin}`,
                    }}
                  >
                    <ListItem
                      button
                      key={e.label}
                      className={classNames(null, {
                        [classes.menuListActiveItem]: isActive(e),
                      })}
                    >
                      <ListItemIcon
                        className={classNames(null, {
                          [classes.menuListActiveItem]: isActive(e),
                        })}
                      >
                        {e.icon}
                      </ListItemIcon>
                      <Box display={open ? "block" : "none"}>
                        <span
                          className={classNames(classes.menuListItem, {
                            [classes.menuListActiveItem]: isActive(e),
                          })}
                        >
                          {e.label}
                        </span>
                      </Box>
                    </ListItem>
                  </NavLink>
                </>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default DesktopDrawer;
