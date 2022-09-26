/* eslint-disable jsx-a11y/alt-text */
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { currencyFormat } from "../../utils/formatter";

const Room = (room) => {
  return (
    <div>
      <Card>
        <CardContent
          sx={{
            padding: "1.5em",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={6}>
              <div
                style={{
                  display: "block",
                  overflow: "hidden",
                }}
              >
                <img
                  src={room.image}
                  style={{
                    width: "300px",
                    height: "200px",
                  }}
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6">{room.roomName}</Typography>
              <Box padding="5px">
                <Typography variant="caption">
                  {" "}
                  <span class="days">- {room.maxPerson} Max Person</span>
                </Typography>
                <br />
                {room?.description &&
                  room.description.map((e) => {
                    return (
                      <>
                        <Typography variant="caption">
                          <span class="days">- {e}</span>
                        </Typography>{" "}
                        <br />
                      </>
                    );
                  })}
              </Box>
              <Typography variant="h6" fontWeight="lighter">
                {currencyFormat(room.price)} / Night
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
    // <div class=" ftco-animate fadeInUp ftco-animated">
    //   <div class="project-wrap">
    //     <span
    //       class="img"
    //       style={{
    //         backgroundImage: `url(${room.image})`,
    //       }}
    //     >
    //       <span class="price">{currencyFormat(room.price)} / Night</span>
    //     </span>
    //     <div class="text p-4">
    //       <h3>{room.roomName}</h3>
    //       {/* <p class="location">
    //         <span class="fa fa-map-marker"></span> {room.roomName}
    //       </p> */}
    //       {/* <ul>
    //         <li>
    //           <span class="flaticon-shower"></span>
    //           {room.noShower}
    //         </li>
    //         <li>
    //           <span class="flaticon-king-size"></span>
    //           {room.noBeds}
    //         </li>

    //       </ul> */}
    //       <span class="days">- {room.maxPerson} Max Person</span>
    //       <br />
    //       {room?.description &&
    //         room.description.map((e) => {
    //           return (
    //             <>
    //               <span class="days">- {e}</span> <br />
    //             </>
    //           );
    //         })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Room;
