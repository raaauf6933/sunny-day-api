import React from "react";
// import RoomTypeDetailsList from "../RoomTypeDetailsList";
import RoomTypeGenInfo from "../RoomTypeGenInfo/RoomTypeGenInfo";
// import RoomTypeImages from "../RoomTypeImages";
import SaveButtonBar from "../../../components/SaveButtonBar/SaveButtonBar";

import Form from "../../../components/Form/Form.jsx";
import { makeStyles } from "@mui/styles";

// import { maybe } from "../../../../misc";

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
  const { createRoomType } = props;
  const classes = useStyles(props);

  const data = {
    new: true,
    name: "",
    no_person: 1,
    no_bed: 1,
    no_bath: 1,
    room_rate: 1,
    isAircon: true,
    isKitchen: true,
    status: "ACT",
  };

  return (
    <>
      {/* <h1>sdfs</h1> */}
      <Form initial={data} onSubmit={(e) => createRoomType(e)}>
        {({ change, data, hasChanged, submit }) => (
          <>
            <div className={classes.root}>
              <RoomTypeGenInfo data={data} change={change} />
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
