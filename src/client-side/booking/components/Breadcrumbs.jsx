import * as React from "react";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import { Hidden } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { bookingBreadCrumbs } from "../../utils/bookingBreadCrumbs";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import StepButton from "@mui/material/StepButton";

import {
  bookingSelectRooms,
  bookingGuestDetails,
  bookingReview,
  bookingSuccess,
} from "../url";

// import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles(
//   () => {
//     return {
//       label: {
//         fontSize: "5em",
//       },
//       root: {
//         ".MuiStepLabel-alternativeLabel": {
//           fontSize: "1em !important",
//         },
//         ".css-qivjh0-MuiStepLabel-label": {
//           fontSize: "1em !important",
//         },
//       },
//     };
//   },
//   {
//     name: "IconBreadcrumbs",
//   }
// );

const BreadcrumbsComponent = (props) => {
  // const classes = useStyles(props);
  // const navigate = useNavigate();

  const getCurrentStep = () => {
    const bookingStep = props.activeStep.substring(8);
    switch (bookingStep) {
      case bookingSelectRooms:
        return 1;
      case bookingGuestDetails:
        return 2;
      case bookingReview:
        return 3;
      case bookingSuccess:
        return 4;
      default:
        break;
    }
  };

  // const handleNavigateStep = (step) => {
  //   navigate(`/booking?step=${step}`, {
  //     state: {
  //       activateState: step,
  //     },
  //   });
  // };

  return (
    // <div role="presentation" onClick={handleClick}>
    //   <Breadcrumbs
    //     aria-label="breadcrumb"
    //     separator={<NavigateNextIcon fontSize="small" />}
    //   >
    //     {bookingBreadCrumbs.map((e, index, array) => {
    //       if (index === array.length - 1) {
    //         return (
    //           <Typography
    //             sx={{ display: "flex", alignItems: "center" }}
    //             color="text.primary"
    //             variant="h5"
    //           >
    //             {e.icon}
    //             <Hidden smDown> {e.label}</Hidden>
    //           </Typography>
    //         );
    //       } else {
    //         return (
    //           <Link
    //             underline="hover"
    //             sx={{ display: "flex", alignItems: "center" }}
    //             color="inherit"
    //             href="/"
    //             variant="h5"
    //           >
    //             {e.icon}
    //             <Hidden smDown> {e.label}</Hidden>
    //           </Link>
    //         );
    //       }
    //     })}

    //   </Breadcrumbs>
    // </div>
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={getCurrentStep()} alternativeLabel>
        {bookingBreadCrumbs.map((e) => (
          <Step
            key={e.label}
            style={{ cursor: "pointer" }}
            // onClick={() => handleNavigateStep(e.step)}
          >
            <StepLabel>
              <b>{e.label}</b>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default BreadcrumbsComponent;
