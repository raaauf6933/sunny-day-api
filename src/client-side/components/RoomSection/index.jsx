import React from "react";
import { Grid, Typography } from "@mui/material";
import Room from "../Room";

const RoomSection = (props) => {
  const {
    show,
    rooms: rooms_data,
    openModal,
    closeModal,
    searchParams,
  } = props;

  const rooms =
    rooms_data &&
    rooms_data?.map((e) => ({
      id: e._id,
      image: e.images,
      price: e.room_rate,
      maxPerson: e.details.no_person,
      roomName: e.name,
      noBeds: e.details.no_bed,
      noShower: e.details.no_bath,
    }));
  // const rooms = [
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646030130/ROOM_IMAGES/hotel-room-4-1646030130790-419545990.jpg",
  //     price: 1500,
  //     maxPerson: 2,
  //     roomName: "Room Variant 1",
  //     noBeds: 1,
  //     noShower: 1,
  //     description: ["1 Double Bed", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646030130/ROOM_IMAGES/hispalis-1646030130789-992435874.jpg",
  //     price: 2500,
  //     maxPerson: 4,
  //     roomName: "Room Variant 2",
  //     noBeds: 1,
  //     noShower: 1,
  //     description: ["1 Queen Bed  w/pull-out bed ", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646030121/ROOM_IMAGES/single-room-1646030121352-835846011.jpg",
  //     price: 3600,
  //     maxPerson: 4,
  //     roomName: "Room Variant 3",
  //     noBeds: 2,
  //     noShower: 1,
  //     description: ["2 Queen Beds", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646030121/ROOM_IMAGES/img2-1646030121113-608776862.jpg",
  //     price: 3600,
  //     maxPerson: 6,
  //     roomName: "Rooom Variant 4",
  //     noBeds: 3,
  //     noShower: 1,
  //     description: ["1 Double Deck", "1 Queen Bed", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646030121/ROOM_IMAGES/ostrovok-7900095-008a22dfb798fca5b44e600470334b429ad4adf8-623299-1646030121333-778905160.jpg",
  //     price: 3600,
  //     maxPerson: 6,
  //     roomName: "Rooom Variant 5",
  //     noBeds: 3,
  //     noShower: 1,
  //     description: ["1 Double Deck w/ pull-out", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646029855/ROOM_IMAGES/Difference-Between-2-Star-and-3-Star-Hotels-1-1646029855005-350744829.jpg",
  //     price: 4300,
  //     maxPerson: 6,
  //     roomName: "Room Variant 6",
  //     noBeds: 3,
  //     noShower: 1,
  //     description: ["3 Queen Beds", "TV", "Shower Heater"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646029844/ROOM_IMAGES/2-star-bedroom-1646029843333-168609007.jpg",
  //     price: 5000,
  //     maxPerson: 12,
  //     roomName: "Room Variant 7",
  //     noBeds: 1,
  //     noShower: 1,
  //     description: ["2 Double Decks", "2 Queen Bed"],
  //   },
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dlqsqlkws/image/upload/v1646029601/ROOM_IMAGES/executive-one%281%29-1646029600608-447682339.jpg",
  //     price: 11000,
  //     maxPerson: 12,
  //     roomName: "Room Variant 8",
  //     noBeds: 1,
  //     noShower: 1,
  //     description: [
  //       "2 King Bed",
  //       "2 Queen Bed",
  //       "Videoke",
  //       "Gas Stove",
  //       "Refrigerator",
  //       "TV",
  //       "Shower Heater",
  //     ],
  //   },
  // ];

  return (
    <>
      <Grid container spacing={3}>
        {rooms.length === 0 ? (
          <>
            <Typography
              variant="h3"
              style={{
                textAlign: "center",
              }}
            >
              No Rooms Available
            </Typography>
          </>
        ) : (
          rooms.map((room, index) => {
            if (show) {
              return show <= index ? (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Room
                    key={index}
                    {...room}
                    openModal={openModal}
                    searchParams={searchParams}
                    closeModal={closeModal}
                  />
                </Grid>
              ) : null;
            } else {
              return (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Room
                    key={index}
                    {...room}
                    openModal={openModal}
                    searchParams={searchParams}
                    closeModal={closeModal}
                  />
                </Grid>
              );
            }
          })
        )}
      </Grid>
    </>
  );
};

export default RoomSection;
