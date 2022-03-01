import React from "react";
import { Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const useStyles = makeStyles(
  () => ({
    tabsRoot: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(3),
    },
  }),
  {
    name: "FilterTabs",
  }
);

const FilterTabs = ({ currentTab, children }) => {
  const classes = useStyles({});
  return (
    <Tabs
      className={classes.tabsRoot}
      value={currentTab}
      indicatorColor={"primary"}
      scrollButtons="on"
      variant="scrollable"
    >
      {children}
    </Tabs>
  );
};

export default FilterTabs;
