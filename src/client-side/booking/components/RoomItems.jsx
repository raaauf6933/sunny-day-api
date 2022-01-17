import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Grid, CardMedia, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { currencyFormat } from "../../utils/formatter";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import bookingContext from "../../context/booking/bookingContext";
import classNames from "classnames";

const useStyles = makeStyles(
  () => {
    return {
      image: {
        "&:hover": {
          opacity: 0.8,
        },
      },
      roomDescription: {
        color: "#717171",
        fontWeight: 600,
        display: "flex",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        marginBottom: "2em",
      },
      roomAmenities: {
        whiteSpace: "nowrap",
      },
      roomAmount: {
        fontWeight: 600,
      },
      roomFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      selectedQuantity: {
        fontSize: "1.5em",
      },
      icon: {
        fontSize: "35px",
      },
      roomControls: {
        display: "flex",
        alignItems: "center",
        "& > *": {
          margin: "4px",
        },
        "& svg": {
          cursor: "pointer",
          color: "#000000c7",
          "&:hover": {
            color: "#0000008c",
          },
        },
      },
      controlDisabled: {
        fontSize: "35px",
        color: "#00000038 !important",
      },
      quantityLeft: {
        display: "flex",
        justifyContent: "end",
        marginRight: "2em",
        color: "#0000008a",
      },
    };
  },
  {
    name: "RoomItems",
  }
);

const RoomItems = (props) => {
  const { openModal, room } = props;
  const { room_details, room_images } = room;
  const classes = useStyles(props);
  const { bookingState, bookingDispatch } = React.useContext(bookingContext);
  const { room_details: roomContext } = bookingState;

  const initialQty = () => {
    const roomContextData =
      roomContext &&
      roomContext.filter(({ roomtype_id }) => roomtype_id === room.id);
    return roomContextData.length ? roomContextData.length : 0;
  };

  const [qty, setQty] = React.useState(initialQty());
  const [disableAdd, setDisableAdd] = React.useState(false);
  const [disableRemove, setDisableRemove] = React.useState(false);

  // console.log(qty);
  // console.log(roomContext);
  // console.log(room);

  const handleAddRemoveRoom = (type) => {
    if (type === "ADD") {
      setQty((prevState) => (disableAdd ? prevState : prevState + 1));
      if (!disableAdd) {
        bookingDispatch({
          type: "ADD_ROOM",
          payload: {
            room_id: room.rooms[qty].room_id,
            roomtype_id: room.rooms[qty].roomtype_id,
            room_num: room.rooms[qty].room_num,
            room_amount: room.rooms[qty].room_amount,
            roomtype_name: room.rooms[qty].roomtype_name,
          },
        });
      }
    } else {
      setQty((prevState) => (disableRemove ? prevState : prevState - 1));
      if (!disableRemove) {
        // console.log(room.rooms[qty - 1].room_id);
        bookingDispatch({
          type: "REMOVE_ROOM",
          payload: {
            room_id: room.rooms[qty - 1].room_id,
          },
        });
      }
    }
  };

  const disableButtons = () => {
    setDisableAdd(false);
    setDisableRemove(false);

    if (room.rooms.length !== 1) {
      if (qty < room.rooms.length && qty !== 0) {
        setDisableAdd(false);
        setDisableRemove(false);
      } else if (qty === 0) {
        setDisableRemove(true);
      } else if (qty === room.rooms.length) {
        setDisableAdd(true);
      }
    } else {
      setDisableRemove(true);
      setDisableAdd(true);
      if (qty === 1) {
        setDisableAdd(true);
        setDisableRemove(false);
      } else {
        setDisableRemove(true);
        setDisableAdd(false);
      }
    }

    if (room.rooms.length === 0) {
      setDisableRemove(true);
      setDisableAdd(true);
    }
  };

  React.useEffect(() => {
    setQty(initialQty());
    disableButtons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, room, roomContext]);

  React.useEffect(() => {
    disableButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, roomContext]);

  // React.useEffect(() => {
  //   disableButtons();
  //   setQty(initialQty());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [roomContext]);

  // React.useEffect(() => {
  //   setDisableAdd(false);
  //   setDisableRemove(false);
  // }, [roomContext]);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Carousel indicators={false} autoPlay={false} animation="slide">
          {room_images?.images.map((e) => {
            return (
              <>
                <CardMedia
                  component="img"
                  height="200"
                  image={e.src}
                  alt="green iguana"
                  className={classes.image}
                  style={{
                    borderRadius: "23px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    openModal("showRoomImage", { roomImage: e.src })
                  }
                />
              </>
            );
          })}
        </Carousel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div
          style={{
            marginTop: "1em",
          }}
        >
          <Typography variant="h5" marginBottom="10px">
            {room.roomtype_name}
          </Typography>
          <div className={classes.roomDescription}>
            <Typography variant="subtitle1">
              <span className={classes.roomAmenities}>
                {" "}
                {room_details?.noPerson ? (
                  room_details?.noPerson
                ) : (
                  <Skeleton />
                )}{" "}
                Person
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {room_details?.noBedRooms ? (
                  `${room_details?.noBedRooms} Bed Rooms`
                ) : (
                  <Skeleton />
                )}
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {room_details?.noBed ? (
                  `${room_details.noBed} bed`
                ) : (
                  <Skeleton />
                )}
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {room_details?.noBath ? (
                  `${room_details.noBath} bath`
                ) : (
                  <Skeleton />
                )}
              </span>{" "}
              · {""}
              {room_details?.isAircon ? (
                <>
                  <span className={classes.roomAmenities}>
                    Air conditioning
                  </span>{" "}
                  {"·"}
                </>
              ) : null}
              {room_details?.isKitchen ? (
                <span className={classes.roomAmenities}>Kitchen </span>
              ) : null}
            </Typography>
          </div>
          <div className={classes.roomFooter}>
            <Typography variant="h6">
              <span className={classes.roomAmount}>
                {currencyFormat(room?.room_amount)}
              </span>{" "}
              / night
            </Typography>
            <div className={classes.roomControls}>
              <RemoveCircleOutlineIcon
                className={classNames(classes.icon, {
                  [classes.controlDisabled]: disableRemove,
                })}
                onClick={() => handleAddRemoveRoom("REMOVE")}
              />{" "}
              <span className={classes.selectedQuantity}>{qty}</span>{" "}
              <ControlPointIcon
                className={classNames(classes.icon, {
                  [classes.controlDisabled]: disableAdd,
                })}
                onClick={() => handleAddRemoveRoom("ADD")}
              />
            </div>
          </div>
          <div className={classes.quantityLeft}>
            <span>({room.rooms.length} left)</span>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default RoomItems;
