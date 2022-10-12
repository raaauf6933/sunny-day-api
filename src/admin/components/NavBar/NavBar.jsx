import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Hidden, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import Box from "@mui/material/Box";
import { navbarStructure } from "./navBarStructure";
import MobileDrawer from "./MobileDrawer";
import DesktopDrawer from "./DesktopDrawer";
import { useLocation } from "react-router-dom";
import AppStateProgress from "../../components/AppStateProgress/AppStateProgress";
import AppStateContext from "../../context/AppState/context";
import ErrorPage from "../ErrorPage/";
import { useAuth } from "../../context/auth/context";

export default function NavBar({ children }) {
  const [open, setOpen] = React.useState(true);
  const [openMobileDrawer, setOpenMobileDrawer] = React.useState(false);
  const drawerWidth = open ? 240 : 80;
  const location = useLocation();
  const { appState } = React.useContext(AppStateContext);
  const { logout } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#f7b12f",
        }}
      >
        <Toolbar>
          <Hidden smUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpenMobileDrawer(!openMobileDrawer)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            fontWeight={600}
          >
            Sunny Day Residencess
          </Typography>
          <Button color="inherit" style={{ outline: "none" }} onClick={logout}>
            Log-Out
          </Button>
        </Toolbar>
        <AppStateProgress />
      </AppBar>

      <Hidden smDown>
        <DesktopDrawer
          drawerWidth={drawerWidth}
          navbarStructure={navbarStructure}
          open={open}
          setOpen={setOpen}
          location={location.pathname}
        ></DesktopDrawer>
      </Hidden>
      <Hidden smUp>
        <MobileDrawer
          navbarStructure={navbarStructure}
          openMobileDrawer={openMobileDrawer}
          setOpenMobileDrawer={setOpenMobileDrawer}
        ></MobileDrawer>
      </Hidden>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {appState.error ? <ErrorPage /> : children}
      </Box>
    </Box>
  );
}
