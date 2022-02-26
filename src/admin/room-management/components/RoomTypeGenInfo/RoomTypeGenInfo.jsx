import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  // Box,
  // Switch,
  Button,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

const RoomTypeGenInfo = (props) => {
  const { data, change } = props;

  return (
    <>
      <Card>
        <CardHeader
          title={"Room Details"}
          action={
            data?.new ? null : (
              <Button variant="outlined" color="error">
                <b>Delete</b>
              </Button>
            )
          }
        />
        <Divider variant="fullWidth" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={12} item>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={data.name}
                onChange={change}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} md={3} item>
              <TextField
                label="Number of Person"
                variant="outlined"
                type="number"
                name="no_person"
                inputProps={{
                  min: 1,
                }}
                value={data.no_person}
                onChange={change}
                fullWidth
              />
            </Grid>
            <Grid xs={6} sm={3} md={3} item>
              <TextField
                label="Number of Bed"
                variant="outlined"
                type="number"
                name="no_bed"
                inputProps={{
                  min: 1,
                }}
                value={data?.no_bed}
                onChange={change}
                fullWidth
              />
            </Grid>
            <Grid xs={6} sm={3} md={3} item>
              <TextField
                label="Number of Bathroom"
                variant="outlined"
                type="number"
                inputProps={{
                  min: 1,
                }}
                name="no_bath"
                value={data?.no_bath}
                onChange={change}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} md={3} item>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Room Rate
                </InputLabel>
                <OutlinedInput
                  value={data.room_rate}
                  name="room_rate"
                  onChange={change}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">₱</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              {/* <TextField
                label="Room Rate"
                variant="outlined"
                name="room_rate"
                value={data?.room_rate}
                onChange={change}
                fullWidth
              /> */}
            </Grid>
            <Grid xs={12} sm={4} md={4} item>
              {/* <Box display="flex" justifyContent="space-between"> */}
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Aircon
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="isAircon"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "5em",
                  }}
                  value={data?.isAircon}
                  onChange={change}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Kitchen
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="isKitchen"
                  defaultValue={data?.isKitchen}
                  value={data?.isKitchen}
                  onChange={change}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="status"
                  defaultValue={data?.status}
                  value={data?.status}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FormControlLabel
                    value="ACT"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="DEACT"
                    control={<Radio />}
                    label="Disable"
                  />
                </RadioGroup>
              </FormControl>

              {/* </Box> */}
            </Grid>
            <Grid xs={12} sm={6} md={6} item></Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default RoomTypeGenInfo;
