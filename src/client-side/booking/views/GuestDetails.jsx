import React from "react";
import {
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import {
  formValidation,
  restrictInput,
  hasNoError,
  hasNull,
} from "../../utils/validators/guestForm";
import bookingContext from "../../context/booking/bookingContext";
import SaveButton from "../components/SaveButton";
import { buttonMessage } from "../../utils/intl";
import { bookingSelectRooms, bookingReview, bookingUrl } from "../url";
import { Navigate } from "react-router-dom";

const initalFormValidation = {
  first_name: null,
  last_name: null,
  email: null,
  mobile_number: null,
  no_guest: null,
  street_address: null,
  province: null,
  city: null,
};

const GuestDetailsView = ({ navigate, params }) => {
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    no_guest,
    street_address,
    province,
    city,
  } = bookingState.guest_details;
  const [formError, setErrorValdiation] = React.useState(initalFormValidation);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const validate = restrictInput(name, value);

    if (name === "no_guest") {
      if (value) {
        bookingDispatch({
          type: "SET_GUEST_DETAILS",
          payload: {
            [name]: value,
          },
        });
      }
    } else {
      if (!validate) {
        bookingDispatch({
          type: "SET_GUEST_DETAILS",
          payload: {
            [name]: value,
          },
        });
      }
    }
  };

  const handleSave = () => {
    const validate = formValidation(bookingState.guest_details);
    setErrorValdiation(validate);
    if (hasNoError(validate)) {
      // navigate here
      navigate(bookingUrl(params, bookingReview));
    }
  };

  const handleBack = () => {
    navigate(bookingUrl(params, bookingSelectRooms));
  };

  if (bookingState?.room_details.length !== 0) {
    return (
      <>
        <Box display="flex" justifyContent="center" margin="2em">
          <div>
            <Card style={{ width: "100%" }}>
              <CardHeader title="Guest Details"></CardHeader>
              <CardContent>
                {" "}
                <Grid container spacing={2} marginBottom={2}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <TextField
                        label="First name"
                        variant="outlined"
                        name="first_name"
                        value={first_name}
                        inputProps={{ placeholder: "Enter your first name" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // error={!!formError.first_name}
                        // helperText={formError.first_name}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <TextField
                        label="Last name"
                        variant="outlined"
                        name="last_name"
                        value={last_name}
                        inputProps={{ placeholder: "Enter your last name" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // error={!!formError.last_name}
                        // helperText={formError.last_name}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={email}
                        error={!!formError.email}
                        helperText={formError.email}
                        onChange={handleOnChange}
                        inputProps={{
                          placeholder: "Ex. juandelacruz@yahoo.com",
                        }}
                        InputLabelProps={{ shrink: true }}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="Mobile number"
                        variant="outlined"
                        name="mobile_number"
                        value={mobile_number}
                        error={!!formError.mobile_number}
                        helperText={formError.mobile_number}
                        inputProps={{
                          placeholder: "Ex. 09479927894",
                          maxLength: 11,
                        }}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="No. Guest"
                        variant="outlined"
                        type="number"
                        name="no_guest"
                        value={no_guest}
                        onChange={handleOnChange}
                        inputProps={{
                          min: 1,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        required
                        helperText={
                          <Tooltip
                            title="max guest was based in your selected rooms"
                            placement="bottom"
                          >
                            <div>Max Guest (43)</div>
                          </Tooltip>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  marginBottom={2}
                  alignItems="center"
                >
                  <Grid item sm={12}>
                    <h4>Guest Address</h4>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="Street, Brgy"
                        variant="outlined"
                        name="street_address"
                        value={street_address}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="Province"
                        variant="outlined"
                        name="province"
                        value={province}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <TextField
                        label="City"
                        variant="outlined"
                        name="city"
                        value={city}
                        onChange={handleOnChange}
                        required
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Box>
        <SaveButton
          onSubmit={handleSave}
          onBack={handleBack}
          saveLabel={buttonMessage.continue}
          disabledSave={hasNull(bookingState.guest_details)}
        />
      </>
    );
  } else {
    return <Navigate to={bookingUrl(params, bookingSelectRooms)}></Navigate>;
  }
};

export default GuestDetailsView;
