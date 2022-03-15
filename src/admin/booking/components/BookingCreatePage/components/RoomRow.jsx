import React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { currencyFormat } from "../../../../../misc";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => {
    return {
      controlDisabled: {
        color: "#00000038 !important",
      },
    };
  },
  {
    name: "RoomItems",
  }
);

const RoomRow = ({ room_type, rooms, dispatch, room_details }) => {
  const classes = useStyles({});
  const initialQty = () => {
    const roomContextData =
      room_details &&
      room_details.filter(({ roomtype_id }) => roomtype_id === room_type._id);
    return roomContextData.length ? roomContextData.length : 0;
  };

  const [qty, setQty] = React.useState(initialQty());
  const [disableAdd, setDisableAdd] = React.useState(false);
  const [disableRemove, setDisableRemove] = React.useState(false);

  const handleAdd = () => {
    setQty((prevState) => (disableAdd ? prevState : prevState + 1));
    if (!disableAdd) {
      dispatch({
        type: "ADD_ROOM",
        payload: {
          room_id: rooms[qty]._id,
          roomtype_id: room_type._id,
          room_amount: room_type.room_rate,
          roomtype_name: room_type.name,
          room_num: rooms[qty].room_number,
        },
      });
    }
  };

  const handleRemote = () => {
    setQty((prevState) => (disableRemove ? prevState : prevState - 1));
    if (!disableRemove) {
      // console.log(room.rooms[qty - 1].room_id);
      dispatch({
        type: "REMOVE_ROOM",
        payload: {
          room_id: rooms[qty - 1]._id,
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
  }, [qty, room_type, room_details]);

  React.useEffect(() => {
    disableButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, room_details]);

  return (
    <TableRow
      key={room_type.name}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {room_type.name}
      </TableCell>
      <TableCell>{currencyFormat(room_type.room_rate)}</TableCell>
      <TableCell>{room_type.rooms.length}</TableCell>
      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
        <RemoveCircleOutlineIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={() => handleRemote()}
          className={classNames(
            {},
            {
              [classes.controlDisabled]: disableRemove,
            }
          )}
        />
        <span style={{ margin: "0px 10px 0px" }}>{qty}</span>
        <AddCircleOutlineIcon
          fontSize="small"
          className={classNames(
            {},
            {
              [classes.controlDisabled]: disableAdd,
            }
          )}
          sx={{ cursor: "pointer" }}
          onClick={() => handleAdd()}
        />
      </TableCell>
    </TableRow>
  );
};

export default RoomRow;
