import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Grid, CardMedia, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { currencyFormat } from "../../../../utils/formatter";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

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
    name: "RoomSection",
  }
);

const RoomSection = (props) => {
  const { openModal, room, change, room_data } = props;
  const { details, images, name, room_rate, rooms, _id } = room;
  const classes = useStyles(props);

  const initialQty = () => {
    const roomContextData =
      room_data && room_data.filter(({ roomtype_id }) => roomtype_id === _id);
    return roomContextData.length ? roomContextData.length : 0;
  };

  const [qty, setQty] = React.useState(initialQty());
  const [disableAdd, setDisableAdd] = React.useState(false);
  const [disableRemove, setDisableRemove] = React.useState(false);

  const onAdd = () => {
    setQty((prevState) => (disableAdd ? prevState : prevState + 1));
    if (!disableAdd) {
      change({
        target: {
          name: "room_details",
          value: [
            ...room_data,
            {
              room_id: rooms[qty]._id,
              roomtype_id: _id,
              room_amount: room_rate,
              roomtype_name: name,
              room_num: rooms[qty].room_number,
              no_person: details.no_person,
            },
          ],
        },
      });
    }
  };

  const onRemove = () => {
    setQty((prevState) => (disableRemove ? prevState : prevState - 1));
    if (!disableRemove) {
      const filterArray = room_data.filter(
        (e) => e.room_id !== rooms[qty - 1]._id
      );
      change({
        target: {
          name: "room_details",
          value: filterArray,
        },
      });
    }
  };

  const disableButtons = () => {
    setDisableAdd(false);
    setDisableRemove(false);

    if (rooms.length !== 1) {
      if (qty < rooms.length && qty !== 0) {
        setDisableAdd(false);
        setDisableRemove(false);
      } else if (qty === 0) {
        setDisableRemove(true);
      } else if (qty === rooms.length) {
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

    if (rooms.length === 0) {
      setDisableRemove(true);
      setDisableAdd(true);
    }
  };

  React.useEffect(() => {
    setQty(initialQty());
    disableButtons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, room, room_data]);

  React.useEffect(() => {
    disableButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, room_data]);

  return (
    <>
      <Grid item xs={12} sm={6} md={6}>
        <Carousel indicators={false} autoPlay={false} animation="slide">
          {images?.map((e) => {
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
      <Grid item xs={12} sm={6} md={6}>
        <div
          style={{
            marginTop: "1em",
          }}
        >
          <Typography variant="h5" marginBottom="10px">
            {name}
          </Typography>
          <div className={classes.roomDescription}>
            <Typography variant="subtitle1">
              <span className={classes.roomAmenities}>
                {" "}
                {details?.no_person ? details?.no_person : <Skeleton />} Person
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {details?.no_bed ? (
                  `${details?.no_bed} Bed Rooms`
                ) : (
                  <Skeleton />
                )}
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {details?.no_bed ? `${details.no_bed} bed` : <Skeleton />}
              </span>{" "}
              ·{" "}
              <span className={classes.roomAmenities}>
                {details?.no_bath ? `${details.no_bath} bath` : <Skeleton />}
              </span>{" "}
              · {""}
              {details?.isAircon ? (
                <>
                  <span className={classes.roomAmenities}>
                    Air conditioning
                  </span>{" "}
                  {"·"}
                </>
              ) : null}
              {details?.isKitchen ? (
                <span className={classes.roomAmenities}>Kitchen </span>
              ) : null}
            </Typography>
          </div>
          <div className={classes.roomFooter}>
            <Typography variant="h6">
              <span className={classes.roomAmount}>
                {currencyFormat(room_rate)}
              </span>{" "}
              / night
            </Typography>
            <div className={classes.roomControls}>
              <RemoveCircleOutlineIcon
                className={classNames(classes.icon, {
                  [classes.controlDisabled]: disableRemove,
                })}
                onClick={() => onRemove()}
              />{" "}
              <span className={classes.selectedQuantity}>{qty}</span>{" "}
              <ControlPointIcon
                className={classNames(classes.icon, {
                  [classes.controlDisabled]: disableAdd,
                })}
                onClick={() => onAdd()}
              />
            </div>
          </div>
          <div className={classes.quantityLeft}>
            <span>({rooms.length} left)</span>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default RoomSection;
