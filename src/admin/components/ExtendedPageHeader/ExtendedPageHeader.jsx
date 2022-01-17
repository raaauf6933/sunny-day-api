import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import React from "react";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(
  () => ({
    action: {
      flex: "0 0 auto",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(),
      },
    },
    block: {
      [theme.breakpoints.down("sm")]: {
        "&&": {
          display: "block",
        },
      },
    },
    grid: {
      padding: theme.spacing(2),
    },
    menuButton: {
      flex: "0 0 auto",
      marginLeft: -theme.spacing(2),
      marginRight: theme.spacing(3),
      marginTop: -theme.spacing(2),
    },
    root: {
      alignItems: "center",
      display: "flex",
      marginBottom: theme.spacing(3),
    },
    subtitle: {
      alignItems: "center",
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    title: {
      flex: 1,
      paddingBottom: theme.spacing(2),
    },
  }),
  {
    name: "ExtendedPageHeader",
  }
);

const ExtendedPageHeader = (props) => {
  const { children, className, inline, title } = props;

  const classes = useStyles(props);

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.block]: !inline,
      })}
    >
      {title}
      <div className={classes.action}>{children}</div>
    </div>
  );
};
ExtendedPageHeader.displayName = "ExtendedPageHeader";
export default ExtendedPageHeader;
