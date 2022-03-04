import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { createTheme } from "@mui/material/styles";
// const theme = createTheme();
const useStyles = makeStyles(
  () => ({
    backButton: {
      "& span": {
        color: "#002972",
      },
      "&:focus": {
        outline: "none",
      },
      border: "1px solid #d7d7d7",
      marginRight: "16px",
      color: "#000000",
      backgroundColor: "#ffffff",
    },
    container: {
      bottom: 0,
      zIndex: 10,
      position: "sticky",
      gridColumn: 2,
      marginTop: "-60px",
      marginBottom: "-50px",
    },
    content: {
      // "&:last-child": {
      //   paddingBottom: theme.spacing(2),
      // },
      display: "flex",
      justifyContent: "space-between",
      // paddingBottom: theme.spacing(2),
      // paddingTop: theme.spacing(2),
      // [theme.breakpoints.down("sm")]: {
      //   marginTop: theme.spacing(1),
      // },
    },
    paper: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    saveButton: {
      outline: "none",
      // "&:active": {
      //   "& span": {
      //     "& span": {
      //       color: "#002972",
      //     },
      //   },
      //   backgroundColor: "#FFCE22",
      //   boxShadow: "inset 0px 0px 0px 2px #D0A73E",
      // },
      // "&:disabled": {
      //   "& span": {
      //     "& span": {
      //       color: "#BAC8FF",
      //     },
      //   },
      //   backgroundColor: "#FFEDBE",
      // },
      // "&:hover": {
      //   backgroundColor: "#FFD15C",
      //   boxShadow: "inset 0px 0px 0px 1px #D0A73E",
      // },
      "&:focus": {
        outline: "none",
      },
      //   backgroundColor: "#FFD15C",
    },
    root: {
      height: 70,
    },
  }),
  {
    name: "SaveButtonBar",
  }
);

const SaveButtonBar = (props) => {
  const classes = useStyles(props);
  const { labels, onClickSave, disabled, hideSaveButton, onBack } = props;

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Card className={classes.paper} elevation={16}>
          <CardContent className={classes.content}>
            <Button
              onClick={onBack}
              className={classes.backButton}
              variant="text"
            >
              Back
            </Button>
            {hideSaveButton ? null : (
              <Button
                className={classes.saveButton}
                color="primary"
                variant="contained"
                onClick={onClickSave}
                disabled={disabled}
              >
                {labels?.save || "Save"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SaveButtonBar;
