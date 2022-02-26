import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppContainer from "../../AppContainer";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => {
    return {
      appBarAllwaysAwake: {
        background: "#FFFFFF !important",
        color: "black !important",
        borderBottom: "2px #00000026 solid",
      },
    };
  },
  { name: "AppbarAwake" }
);

const AppbarAwake = (props) => {
  const { navBarStructure, handleOpenDrawer, location } = props;
  const classes = useStyles(props);

  console.log(location);

  return (
    <AppBar className={classes.appBarAllwaysAwake}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Villa Gregoria Resort */}
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
                      location.pathname + location.search === e.url
                        ? "#f15d30"
                        : "#000000a6",
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

export default AppbarAwake;
