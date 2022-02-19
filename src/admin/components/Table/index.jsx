import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { renderCollection, escapeRegExp, paginate } from "../../../misc";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    tableCellHeader: {
      fontWeight: 600,
    },

    root: {
      backgroundColor: "#FFFFFF",
    },
    searchField: {
      padding: "1em",
    },
  }),
  { name: "" }
);

const TableComponent = (props) => {
  const { tableHead, tableData } = props;
  const classes = useStyles(props);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((header) => (
                <TableCell className={classes.tableCellHeader}>
                  {header}
                </TableCell>
              ))}
              {/* <TableCell className={classes.tableCellHeader}>
                Booking Reference
              </TableCell>
              <TableCell className={classes.tableCellHeader}>Guest</TableCell>
              <TableCell className={classes.tableCellHeader}>
                Booking Date
              </TableCell>
              <TableCell className={classes.tableCellHeader}>
                Check-In
              </TableCell>
              <TableCell className={classes.tableCellHeader}>
                Check-Out
              </TableCell>
              <TableCell
                className={classes.tableCellHeader}
                style={{ width: "10%" }}
              >
                Status
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(tableData, (data) => (
              <TableRow
                key={Math.random()}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => navigate(booking._id.toString())}
                hover
              >
                {Object.keys(data).map((objectData, index) => (
                  <TableCell>
                    {booking?.guest?.first_name} {booking?.guest?.last_name}
                  </TableCell>
                ))}
                <TableCell component="th" scope="row" align="center">
                  {booking.booking_reference ? (
                    <span>{booking.booking_reference}</span>
                  ) : (
                    <Skeleton width={5} height={5} />
                  )}
                </TableCell>
                <TableCell>
                  {booking?.guest?.first_name} {booking?.guest?.last_name}
                </TableCell>
                <TableCell>{moment(booking.created).format("lll")}</TableCell>
                <TableCell>{moment(booking.check_in).format("ll")}</TableCell>
                <TableCell>{moment(booking.check_out).format("ll")}</TableCell>
                <TableCell>
                  <BookingStatus status={booking.status} />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <TablePagination
          component="div"
          count={tableData.totalCount}
          page={state.currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={state.pageSize}
          onRowsPerPageChange={(row, rows) =>
            setState({ ...state, pageSize: rows })
          }
        />
      </div>
    </>
  );
};

export default TableComponent;
