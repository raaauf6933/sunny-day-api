import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  CardHeader,
  Button,
  Divider,
} from "@mui/material";
import { renderCollection, currencyFormat } from "./../../../../misc";
import NoData from "../../../components/NoData/NoData";

const BookingCharges = ({ booking, onAddCharges }) => {
  return (
    <Card>
      <CardHeader
        title="Charges"
        action={
          <>
            {booking.status === "CHECK_IN" ? (
              <Button
                onClick={() => onAddCharges()}
                style={{ outline: "none" }}
                variant="outlined"
              >
                <b>Add</b>
              </Button>
            ) : null}
          </>
        }
      />
      <Divider />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={600}>Type</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={600}> Rate</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={600}> Qty</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(
              booking?.charges,
              (amenity) => (
                <TableRow
                  key={amenity.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{amenity.name}</TableCell>
                  <TableCell>{currencyFormat(amenity.amount)}</TableCell>
                  <TableCell>{amenity.qty}</TableCell>
                </TableRow>
              ),
              () => {
                return (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <NoData />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingCharges;
