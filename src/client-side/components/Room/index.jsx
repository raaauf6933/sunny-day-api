import React from "react";
import { currencyFormat } from "../../utils/formatter";

const Room = (room) => {
  return (
    <div class=" ftco-animate fadeInUp ftco-animated">
      <div class="project-wrap">
        <span
          class="img"
          style={{
            backgroundImage: `url(${room.image})`,
          }}
        >
          <span class="price">{currencyFormat(room.price)} / Night</span>
        </span>
        <div class="text p-4">
          <h3>{room.roomName}</h3>
          {/* <p class="location">
            <span class="fa fa-map-marker"></span> {room.roomName}
          </p> */}
          {/* <ul>
            <li>
              <span class="flaticon-shower"></span>
              {room.noShower}
            </li>
            <li>
              <span class="flaticon-king-size"></span>
              {room.noBeds}
            </li>
         
          </ul> */}
          <span class="days">- {room.maxPerson} Max Person</span>
          <br />
          {room?.description &&
            room.description.map((e) => {
              return (
                <>
                  <span class="days">- {e}</span> <br />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Room;
