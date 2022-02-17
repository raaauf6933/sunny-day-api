import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ServicesMedia from "../ServicesMedia";
import funImage from "../../assets/images/activity_1.jpg";
import activityImage from "../../assets/images/activity_2.jpg";
import eventsImage from "../../assets/images/events_1.jpg";
import accommodationImage from "../../assets/images/accommodation_1.jpg";
import { Typography } from "@mui/material";
import Fade from "react-reveal/Fade";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles(
  () => {
    return {
      // contentBackground: {
      //   backgroundImage: `url(${Services1}) !important`,
      // },
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

const ServiceSection = (props) => {
  const classes = useStyles(props);
  const videoElement = React.useRef(null);
  const theme = useTheme();
  const media_xs = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (videoElement.current.play) {
      videoElement.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div>
      <Grid
        container
        spacing={6}
        style={{
          flexDirection: media_xs ? "column-reverse" : "unset",
        }}
      >
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={100}>
              <ServicesMedia
                image={activityImage}
                title="Activities"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-1"
                icon="flaticon-sun-umbrella"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={200}>
              <ServicesMedia
                image={accommodationImage}
                title="Accommodation"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-2"
                icon="flaticon-king-size"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={300}>
              <ServicesMedia
                image={eventsImage}
                title="Gatherings & Events"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-3"
                icon="flaticon-tour-guide"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={400}>
              <ServicesMedia
                image={funImage}
                title="Fun"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-4"
                icon="flaticon-paragliding"
              />
            </Fade>
          </Grid>
          {/* <Card>
            <CardContent>
              <h1>Content 2</h1>
            </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}></Grid>
          <Fade clear delay={100}>
            <span className={classes.welcomeGreen}> </span>
            <br />
            <Typography className={classes.welcomeTitle}>
              Welcome to <br /> Villa Gregoria Resort
            </Typography>

            {/* <Typography
              variant="h4"
              style={{ marginBottom: "10px", fontFamily: "Arizonia" }}
            >
        
            </Typography> */}
          </Fade>
          <video width="100%" height="50%" ref={videoElement} muted>
            <source
              src="https://res.cloudinary.com/dlqsqlkws/video/upload/v1645021426/resort_video_compressed_c4qhng.mp4"
              type="video/mp4"
            />
          </video>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceSection;
