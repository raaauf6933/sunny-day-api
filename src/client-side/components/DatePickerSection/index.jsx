import React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import DatePicker from "../DatePicker/index";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { bookingSectionUrl, bookingSelectRooms } from "../../booking/url";
import bookingContext from "../../context/booking/bookingContext";
import classNames from "classnames";

import { hasNull } from "./../../utils/validators/guestForm";

const useStyles = makeStyles(
  () => {
    const cardAvailabilityButton = {
      borderRadius: "0px !important",
      height: "110px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      color: "#FFFFFF !important",
    };
    return {
      card: {
        borderRadius: "0px !important",
        height: "110px",
        padding: "10px !important",
      },
      cardBorderSm: {
        borderBottom: " 2px #f15d30 solid",
        borderTop: " 2px #f15d30 solid",
        borderLeft: "2px #f15d30 solid",
      },
      cardBorderLg: {
        borderRight: " 2px #f15d30 solid",
        borderTop: " 2px #f15d30 solid",
        borderLeft: "2px #f15d30 solid",
      },
      cardButton: {
        ...cardAvailabilityButton,
        cursor: "pointer",
        backgroundColor: "#f15d30 !important",
      },
      cardButtonDisabled: {
        ...cardAvailabilityButton,
        backgroundColor: "#eb8e72 !important",
        cursor: "unset !important",
      },
      cardContent: {
        padding: "15px !important",
        display: "flex",
        flexDirection: "column",
      },
      container: {
        position: "relative",
        top: "-5em;",
        zIndex: 1,
      },
      label: {
        color: "#f15d30",
        fontWeight: 600,
      },
    };
  },
  { name: "DatePickerSection" }
);

const DatePickerSection = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const navigate = useNavigate();
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const [dates, setDates] = React.useState({
    check_in: "" || bookingState.check_in,
    check_out: "" || bookingState.check_out,
  });
  const breakPointSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmitDate = () => {
    if (!hasNull(dates)) {
      bookingDispatch({
        type: "SET_DATES",
        payload: dates,
      });
      navigate(bookingSectionUrl + bookingSelectRooms + "?awakeNavBar=true");
    }
  };

  return (
    <section>
      <Container className={classes.container}>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Card
                className={`${classes.card} ${
                  breakPointSm ? classes.cardBorderLg : classes.cardBorderSm
                }`}
              >
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.label}
                    variant="g5"
                    gutterBottom={true}
                  >
                    CHECK-IN DATE
                  </Typography>
                  <DatePicker
                    name="check_in"
                    dates={dates}
                    setDates={setDates}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                className={`${classes.card} ${
                  breakPointSm ? classes.cardBorderLg : classes.cardBorderSm
                }`}
              >
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.label}
                    variant="g5"
                    gutterBottom={true}
                  >
                    CHECK-OUT DATE
                  </Typography>
                  <DatePicker
                    name="check_out"
                    dates={dates}
                    setDates={setDates}
                    minDate={dates.check_in}
                    disabled={!dates.check_in}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} onClick={() => handleSubmitDate()}>
              <Card
                className={classNames(classes.cardButton, {
                  // [classes.cardButton]: () => !hasNull(dates),
                  [classes.cardButtonDisabled]: hasNull(dates),
                })}
                style={{ height: "110px" }}
              >
                <CardContent>
                  <Typography variant="g5">CHECK AVAILABILITY</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default DatePickerSection;
