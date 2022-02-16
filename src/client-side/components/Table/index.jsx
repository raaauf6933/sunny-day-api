import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { renderCollection } from "./../../../misc";

const TableComponent = ({ tableHead, data }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((e) => (
              <TableCell>{e}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderCollection(data, () => {})}</TableBody>
      </Table>
    </>
  );
};

export default TableComponent;
