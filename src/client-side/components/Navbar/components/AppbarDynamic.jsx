import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppContainer from "../../AppContainer";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import logo from "./../../../assets/images/logo.png";

const useStyles = makeStyles(
  () => {
    return {
      appBarSleep: {
        background: "transparent !important",
        boxShadow: "none !important",
      },
      appBarAwake: {
        background: "#FFFFFF !important",
        color: "black !important",
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important",
      },
      welcomeTitle: {
        fontSize: "1em",
        fontFamily: "Volkhov",
        color: "#f15d30",
      },
    };
  },
  { name: "AppbarDynamic" }
);

const AppbarDynamic = (props) => {
  const { trigger, handleOpenDrawer, navBarStructure, location } = props;
  const classes = useStyles(props);

  return (
    <AppBar className={trigger ? classes.appBarAwake : classes.appBarSleep}>
      <AppContainer>
        <Toolbar>
          <Hidden smUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleOpenDrawer()}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography
            className={classes.welcomeTitle}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {/* {trigger ? "Villa Gregoria Resort" : ""} */}
          </Typography>

          <Hidden smDown>
            {navBarStructure.map((e, index) => {
              // if (e.name === "mybooking") {
              //   return (
              //     <Button variant="contained" href={e.url}>
              //       <NavLink
              //         key={index}
              //         to={e.url}
              //         style={{
              //           color: "white",
              //           fontWeight: 600,
              //         }}
              //       >
              //         {e.label}
              //       </NavLink>
              //     </Button>
              //   );
              // } else {
              return (
                <NavLink
                  key={index}
                  to={e.url}
                  style={{
                    color:
                      location.pathname === e.url
                        ? "#f15d30"
                        : trigger
                        ? "#000000a6"
                        : "white",
                    fontWeight: 600,
                    marginRight: "2em",
                  }}
                >
                  {e.label}
                </NavLink>
              );
              // }
            })}
          </Hidden>
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
};

export default AppbarDynamic;
