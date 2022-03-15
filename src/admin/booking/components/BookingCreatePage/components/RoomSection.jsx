import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { renderCollection } from "../../../../../misc";
import { Skeleton } from "@mui/material";
import NoData from "./../../../../components/NoData/NoData";
import RoomRow from "./RoomRow";

const RoomSection = ({ rooms, dispatch, room_details }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table
          //   sx={{ minWidth: 650 }}
          //   size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Room Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>No. Available</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(
              rooms,
              (roomtype) => {
                return (
                  <RoomRow
                    dispatch={dispatch}
                    room_type={roomtype}
                    rooms={roomtype.rooms}
                    room_details={room_details}
                  />
                );
              },
              () => (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <NoData />
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell>
                    <Skeleton width="150px" height="40px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="150px" height="40px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="150px" height="40px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="150px" height="40px" />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RoomSection;
