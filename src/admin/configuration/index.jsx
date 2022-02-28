import React from "react";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { createConfigurationMenu } from "./configurationMenu";
import { Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles(
  () => ({
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);",
      },
      cursor: "pointer",
      marginBottom: theme.spacing(3),
      transition: theme.transitions.duration.standard + "ms",
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 0,
      },
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "48px 1fr",
    },
    cardDisabled: {
      "& $icon, & $sectionTitle, & $sectionDescription": {
        color: theme.palette.text.disabled,
      },
      marginBottom: theme.spacing(3),
    },
    configurationCategory: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      borderTop: `solid 1px ${theme.palette.divider}`,
      display: "grid",
      gridColumnGap: theme.spacing(4) + "px",
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing(3),
    },
    configurationItem: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "1fr",
    },
    configurationLabel: {
      paddingBottom: 20,
    },
    header: {
      margin: 0,
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main,
      },
      fontSize: 78,
    },
    sectionDescription: {},
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600,
    },
  }),
  { name: "Configuration" }
);

const Configuration = (props) => {
  const classes = useStyles(props);

  const navigate = useNavigate();
  return (
    <>
      <div className={classes.configurationCategory}>
        <div className={classes.configurationItem}>
          {createConfigurationMenu().map((item) => {
            return (
              <>
                <Card
                  className={classes.card}
                  onClick={() => navigate(item.url)}
                  key={2}
                  data-test="settingsSubsection"
                >
                  <CardContent className={classes.cardContent}>
                    <div className={classes.icon}>{item.icon}</div>
                    <div>
                      <Typography
                        className={classes.sectionTitle}
                        color="primary"
                      >
                        {item.title}
                      </Typography>
                      <Typography className={classes.sectionDescription}>
                        {item.description}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Configuration;
