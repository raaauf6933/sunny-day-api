/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Grid, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import image_1 from "../../../assets/images/image_1.jpeg";
import image_2 from "../../../assets/images/image_2.jpeg";
import image_3 from "../../../assets/images/image_3.jpeg";
import { Typography } from "@mui/material";
import Fade from "react-reveal/Fade";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Carousel from "react-material-ui-carousel";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const useStyles = makeStyles(
  () => {
    return {
      // contentBackground: {
      //   backgroundImage: `url(${Services1}) !important`,
      // },
      icons: {
        marginRight: "1em",
        color: "#f7b12f",
      },
      welcomeTitle: {
        fontSize: "3em",
        fontFamily: "Volkhov",
        color: "#f15d30",
        textAlign: "center",
      },
    };
  },
  {
    name: "ServiceSection",
  }
);

function Item({ item }) {
  return (
    <Paper
      style={{
        borderRadius: "5%",
      }}
    >
      <img src={item?.img} style={{ width: "100%", borderRadius: "5%" }}></img>
    </Paper>
  );
}

const ServiceSection = (props) => {
  const { contentSettings } = props;
  const classes = useStyles(props);
  const videoElement = React.useRef(null);

  let items = [
    {
      img: image_1,
      description: "Probably the most random thing you have ever seen!",
    },
    {
      img: image_2,
      description: "Hello World!",
    },
    {
      img: image_3,
      description: "Probably the most random thing you have ever seen!",
    },
  ];

  return (
    <div
      style={{
        paddingTop: "4em",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Carousel>
            {contentSettings?.promo_pictures?.map((e) => (
              <Item key={e.src} item={{ img: e.src }} />
            ))}
            {/* {items.map((item, i) => (
             
            ))} */}
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            padding="60px"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            height="100%"
          >
            <div
              style={{
                fontFamily: 'Georgia, Times, "Times New Roman", serif',
                fontSize: "1.5em",

                textAlign: "center",
                paddingBottom: "2.6em",
              }}
            >
              <span>
                Ready to escape the hustle and bustle of everyday life? Our
                place has everything you need to plan your next getaway. From
                cozy rooms to deluxe suites, we have something for everyone.
                Book your stay today and start planning your perfect vacation
              </span>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: contentSettings?.home_description2,
              }}
              style={{
                fontWeight: "100",
              }}
            ></div>
            {/* <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Sunrise Cafe
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Sunset Bar
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              KTV Rooms
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              24 Hour Room Service
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Wireless Interne Access
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              24/7 Kitchen
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              24 Hrs. Security
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Car Parking
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Laundry Service
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Room Service
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              Disable rooms
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "7px" }}
            >
              <WbSunnyIcon className={classes.icons} />
              40 seating capacity Overlooking Events Place
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceSection;
