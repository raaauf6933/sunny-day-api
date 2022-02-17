import React from "react";
import { Grid } from "@mui/material";
import Room from "../Room";

const RoomSection = (props) => {
  const { show } = props;

  const rooms = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079870/ROOM_IMAGES/10293622_740617089321760_6142092653890469_o-1645079870429-423576824.jpg",
      price: 1500,
      maxPerson: 2,
      roomName: "Room Variant 1",
      noBeds: 1,
      noShower: 1,
      description: ["1 Double Bed", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079807/ROOM_IMAGES/14542546_1249607201756077_5505280591008993674_o-1645079806945-67059345.jpg",
      price: 2500,
      maxPerson: 4,
      roomName: "Room Variant 2",
      noBeds: 1,
      noShower: 1,
      description: ["1 Queen Bed  w/pull-out bed ", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079507/ROOM_IMAGES/10293622_740617085988427_254404023111341675_o-1645079506193-935831042.jpg",
      price: 3600,
      maxPerson: 4,
      roomName: "Room Variant 3",
      noBeds: 2,
      noShower: 1,
      description: ["2 Queen Beds", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079421/ROOM_IMAGES/1-1645079419965-259083282.jpg",
      price: 3600,
      maxPerson: 6,
      roomName: "Rooom Variant 4",
      noBeds: 3,
      noShower: 1,
      description: ["1 Double Deck", "1 Queen Bed", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645025950/ROOM_IMAGES/1-1645025949073-749618466.jpg",
      price: 3600,
      maxPerson: 6,
      roomName: "Rooom Variant 5",
      noBeds: 3,
      noShower: 1,
      description: ["1 Double Deck w/ pull-out", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079870/ROOM_IMAGES/10293622_740617089321760_6142092653890469_o-1645079870429-423576824.jpg",
      price: 4300,
      maxPerson: 6,
      roomName: "Room Variant 6",
      noBeds: 3,
      noShower: 1,
      description: ["3 Queen Beds", "TV", "Shower Heater"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079507/ROOM_IMAGES/10293622_740617085988427_254404023111341675_o-1645079506193-935831042.jpg",
      price: 5000,
      maxPerson: 12,
      roomName: "Room Variant 7",
      noBeds: 1,
      noShower: 1,
      description: ["2 Double Decks", "2 Queen Bed"],
    },
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlqsqlkws/image/upload/v1645079421/ROOM_IMAGES/1-1645079419965-259083282.jpg",
      price: 11000,
      maxPerson: 12,
      roomName: "Room Variant 8",
      noBeds: 1,
      noShower: 1,
      description: [
        "2 King Bed",
        "2 Queen Bed",
        "Videoke",
        "Gas Stove",
        "Refrigerator",
        "TV",
        "Shower Heater",
      ],
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
