import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

import ExtendedPageHeader from "../ExtendedPageHeader/ExtendedPageHeader";

const theme = createTheme();

const useStyles = makeStyles(
  () => ({
    root: {
      display: "flex",
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        // marginTop: theme.spacing(2),
        padding: 0,
      },
      alignSelf: "flex-start",
      flex: 1,
      fontSize: 24,
    },
  }),
  { name: "PageHeader" }
);

const PageHeader = (props) => {
  const { children, className, inline, title } = props;

  const classes = useStyles(props);

  return (
    <ExtendedPageHeader
      className={className}
      inline={inline}
      title={
        <Typography className={classes.title} variant="h5">
          {title !== undefined ? title : ""}
        </Typography>
      }
    >
      <div className={classes.root}>{children}</div>
    </ExtendedPageHeader>
  );
};

PageHeader.displayName = "PageHeader";
export default PageHeader;
