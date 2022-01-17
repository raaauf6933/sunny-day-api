import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { currencyFormat } from "../../utils/formatter";

const AvailedRoomTable = ({ rooms }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      {" "}
      <Table>
        <TableHead>
          <TableCell>Availed</TableCell>
          <TableCell>Rate</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableHead>
        <TableBody>
          {rooms.map((e) => {
            return (
              <TableRow>
                <TableCell>{e.room_name}</TableCell>
                <TableCell>{currencyFormat(e.rate)}</TableCell>
                <TableCell>{e.qty}</TableCell>
                <TableCell align="right">{currencyFormat(e.amount)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AvailedRoomTable;
