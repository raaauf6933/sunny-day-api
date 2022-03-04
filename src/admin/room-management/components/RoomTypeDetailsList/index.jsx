import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { renderCollection } from "./../../../../misc";
import {
  Card,
  CardHeader,
  CardContent,
  TableFooter,
  Divider,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import NoData from "../../../components/NoData/NoData";

const RoomTypeDetailsList = (props) => {
  const { rooms, onCreateRoom, onDeleteRoom } = props;
  // const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader
          title="Rooms"
          action={
            <>
              <Button
                style={{ outline: "none" }}
                variant="outlined"
                onClick={() => onCreateRoom()}
              >
                <b>Create Room</b>
              </Button>
            </>
          }
        />
        <Divider variant="fullWidth" />
        <CardContent>
          {rooms && rooms.length !== 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={600}> Room Number</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}> Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderCollection(
                  rooms,
                  (room) => (
                    <TableRow
                      key={room._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{room.room_number}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => onDeleteRoom(room._id)}
                          style={{ outline: "none" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ),
                  () => {
                    return (
                      <TableFooter>
                        <TableCell>No Data</TableCell>
                      </TableFooter>
                    );
                  }
                )}
              </TableBody>
            </Table>
          ) : (
            <NoData />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RoomTypeDetailsList;
