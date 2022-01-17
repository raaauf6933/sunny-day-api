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
          <span class="days">{room.maxPerson} Max Person</span>
          <h3>Banaue Rice Terraces</h3>
          <p class="location">
            <span class="fa fa-map-marker"></span> {room.roomName}
          </p>
          <ul>
            <li>
              <span class="flaticon-shower"></span>
              {room.noShower}
            </li>
            <li>
              <span class="flaticon-king-size"></span>
              {room.noBeds}
            </li>
            {/* <li>
            <span class="flaticon-mountains"></span>Near Mountain
          </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Room;
