import React from "react";
import { Button, CardHeader, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import DatePickerV2 from "../DatePickerV2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { bookingSectionUrl, bookingSelectRooms } from "../../booking/url";
import bookingContext from "../../context/booking/bookingContext";
import classNames from "classnames";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
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
        // position: "relative",
        top: "5em;",
        left: "35em",
        zIndex: 1,
        height: "100%",
      },
      label: {
        color: "#f15d30",
        fontWeight: 600,
      },
    };
  },
  { name: "DatePickerSection" }
);

const DatePickerSectionV2 = (props) => {
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
      navigate(bookingSectionUrl + bookingSelectRooms);
    }
  };

  return (
    <section>
      <Container className={classes.container}>
        <Card
        // sx={{
        //   maxWidth: "340px",
        // }}
        >
          <CardHeader
            title={
              <Box textAlign="right">
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#2276d2",
                    cursor: "pointer",
                  }}
                  onClick={props.toggleCard}
                >
                  My Booking <ArrowCircleRightOutlinedIcon />
                </Typography>
              </Box>
            }
          />
          <CardContent
            sx={{
              paddingTop: "0em",
              paddingX: "2.5em",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4">Book Your Stay</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <label
                  for="date-in"
                  style={{
                    fontSize: "14px",
                    color: "#707079",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Check In:
                </label>
                <DatePickerV2
                  name="check_in"
                  dates={dates}
                  setDates={setDates}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <label
                  for="date-in"
                  style={{
                    fontSize: "14px",
                    color: "#707079",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Check Out:
                </label>
                <DatePickerV2
                  name="check_out"
                  dates={dates}
                  setDates={setDates}
                  minDate={dates.check_in}
                  disabled={!dates.check_in}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSubmitDate()}
                  sx={{
                    padding: "1em",
                  }}
                >
                  <Typography fontWeight={500}>Check Availability</Typography>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default DatePickerSectionV2;
