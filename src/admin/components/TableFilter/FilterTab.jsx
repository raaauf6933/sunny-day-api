import React from "react";
import { Tab } from "@mui/material";
import classNames from "classnames";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const useStyles = makeStyles(
  () => ({
    selectedTabLabel: {
      "& .tabLabel": {
        color: theme.typography.body1.color,
        fontWeight: "600 !important",
      },
    },
    tabLabel: {
      "&:hover": {
        color: theme.typography.body1.color,
      },
      color: theme.typography.caption.color,
      fontSize: "1rem",
      fontWeight: "600 !important",
    },
    tabRoot: {
      minWidth: "80px",
      opacity: 1,
      paddingTop: theme.spacing(1),
      textTransform: "initial",
    },
  }),
  {
    name: "FilterTabs",
  }
);

const Filtertab = (props) => {
  const { onClick, label, selected, value, disabled } = props;
  const classes = useStyles(props);

  return (
    <Tab
      disableRipple
      label={label}
      classes={{
        root: classes.tabRoot,
        wrapper: classNames(classes.tabLabel, {
          [classes.selectedTabLabel]: selected,
        }),
      }}
      disabled={disabled}
      onClick={onClick}
      value={value}
    />
  );
};

export default Filtertab;
