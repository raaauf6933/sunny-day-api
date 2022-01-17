import React from "react";
import { Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import ServicesMedia from "../ServicesMedia";
import Services1 from "../../assets/images/services-1.jpg";
import Services2 from "../../assets/images/services-2.jpg";
import { Typography } from "@mui/material";
import Fade from "react-reveal/Fade";

// const useStyles = makeStyles(
//   () => {
//     return {
//       contentBackground: {
//         backgroundImage: `url(${Services1}) !important`,
//       },
//     };
//   },
//   {
//     name: "ServiceSection",
//   }
// );

const ServiceSection = (props) => {
  // const classes = useStyles(props);

  return (
    <div>
      <Grid container spacing={6}>
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={100}>
              <ServicesMedia
                image={Services1}
                title="Activities"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-1"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={200}>
              <ServicesMedia
                image={Services2}
                title="Activities"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-2"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={300}>
              <ServicesMedia
                image={Services1}
                title="Activities"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-3"
              />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade clear delay={400}>
              <ServicesMedia
                image={Services1}
                title="Activities"
                content="A small river named Duden flows by their place and supplies it with the necessary"
                color="color-4"
              />
            </Fade>
          </Grid>
          {/* <Card>
            <CardContent>
              <h1>Content 2</h1>
            </CardContent>
          </Card> */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            paddingTop: "8em",
          }}
        >
          <Grid item xs={12} sm={6}></Grid>
          <Fade clear delay={100}>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>
              Welcome to ....
            </Typography>
          </Fade>
          <Fade clear delay={200}>
            <Typography variant="h4" style={{ marginBottom: "1.5em" }}>
              It's time to start your adventure
            </Typography>
          </Fade>
          <Fade clear delay={300}>
            <Typography variant="subtitle1">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth. Far far
              away, behind the word mountains, far from the countries Vokalia
              and Consonantia, there live the blind texts. Separated they live
              in Bookmarksgrove right at the coast of the Semantics, a large
              language ocean. A small river named Duden flows by their place and
              supplies it with the necessary regelialia.
            </Typography>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceSection;
