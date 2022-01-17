import React from "react";
import { Grid } from "@mui/material";
import Destination1 from "../../assets/images/destination-1.jpg";
import Room from "../Room";

const RoomSection = (props) => {
  const { show } = props;

  const rooms = [
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
    {
      id: 1,
      image: Destination1,
      price: 1000,
      maxPerson: 4,
      roomName: "Banaue Rice Terraces",
      noBeds: 3,
      noShower: 1,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {rooms.map((room, index) => {
          if (show) {
            return show <= index ? (
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Room key={index} {...room} />
              </Grid>
            ) : null;
          } else {
            return (
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Room key={index} {...room} />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
};

export default RoomSection;
