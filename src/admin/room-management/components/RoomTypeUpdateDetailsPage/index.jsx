import React from "react";
import RoomTypeDetailsList from "../RoomTypeDetailsList";
import RoomTypeGenInfo from "../RoomTypeGenInfo/RoomTypeGenInfo";
import RoomTypeImages from "../RoomTypeImages";
import SaveButtonBar from "../../../components/SaveButtonBar/SaveButtonBar";

import { Grid } from "@mui/material";
import Form from "../../../components/Form/Form.jsx";
import { makeStyles } from "@mui/styles";

import { maybe } from "../../../../misc";

const useStyles = makeStyles(
  () => ({
    root: {
      "& > *": {
        marginBottom: "1em",
      },
    },
  }),
  { name: "RoomTypeUpdateDetailsPage" }
);

const RoomTypeUpdateDetailsPage = (props) => {
  const { roomType, updateRoomType, uploadRoomImage, onCreateRoom } = props;
  const classes = useStyles(props);

  const data = {
    new: false,
    name: maybe(() => roomType?.name, ""),
    room_rate: maybe(() => roomType?.room_rate, 1),
    no_person: maybe(() => roomType?.details?.no_person, 1),
    no_bed: maybe(() => roomType?.details?.no_bed, 1),
    no_bath: maybe(() => roomType?.details?.no_bath, 1),
    isAircon: maybe(() => roomType?.details?.isAircon, false),
    isKitchen: maybe(() => roomType?.details?.isKitchen, false),
    status: maybe(() => roomType?.status, "ACT"),
  };

  return (
    <>
      {/* <h1>sdfs</h1> */}
      <Form initial={data} onSubmit={(e) => updateRoomType(e)}>
        {({ change, data, hasChanged, submit }) => (
          <>
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={8} md={8} item spacing={2} rowSpacing={2}>
                  <Grid xs={12} sm={12} md={12} item>
                    <RoomTypeGenInfo
                      roomType={roomType}
                      data={data}
                      change={change}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} item>
                    <RoomTypeImages
                      images={roomType?.images}
                      uploadRoomImage={uploadRoomImage}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} sm={4} md={4} item>
                  <RoomTypeDetailsList
                    rooms={roomType?.rooms}
                    onCreateRoom={onCreateRoom}
                  />
                </Grid>
              </Grid>
            </div>
            <div style={{ marginTop: "5em" }}>
              <SaveButtonBar onClickSave={submit} disabled={!hasChanged} />
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default RoomTypeUpdateDetailsPage;
