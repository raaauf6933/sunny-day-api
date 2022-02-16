import React from "react";
import notFoundImage from "./what.svg";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SVG from "react-inlinesvg";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const useStyles = makeStyles(
  () => ({
    bottomHeader: {
      fontWeight: 600,
      textTransform: "uppercase",
    },
    button: {
      marginTop: theme.spacing(2),
      padding: 20,
    },
    container: {
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        padding: theme.spacing(3),
        width: "100%",
      },
      display: "grid",
      gridTemplateColumns: "1fr 487px",
      margin: "0 auto",
      width: 830,
    },
    innerContainer: {
      [theme.breakpoints.down("sm")]: {
        order: 1,
        textAlign: "center",
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    notFoundImage: {
      "& svg": {
        width: "100%",
      },
    },
    root: {
      alignItems: "center",
      display: "flex",
      height: "calc(100vh - 180px)",
    },
    upperHeader: {
      fontWeight: 600,
    },
  }),
  { name: "ErrorPage" }
);

const ErrorPage = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div>
            <Typography className={classes.upperHeader} variant="h4">
              <span>Ooops!...</span>
            </Typography>
            <Typography className={classes.bottomHeader} variant="h3">
              <span>Error</span>
            </Typography>
            <Typography>
              <span>We've encountered a problem...</span>
            </Typography>
            <Typography>
              <span>Don't worry, everything is gonna be fine</span>
            </Typography>
          </div>
          <div>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={() => alert("back")}
            >
              <span>Back to home</span>
            </Button>
          </div>
        </div>
        <div>
          <SVG className={classes.notFoundImage} src={notFoundImage} />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
