import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { renderCollection, escapeRegExp, paginate } from "../../../../misc";
import PageHeader from "./../../../components/PageHeader/PageHeader";
import moment from "moment";
import { TextField, Box, TablePagination, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { bookingUrl } from "../../url";
import BookingStatus from "../BookingStatus/BookingStatus";
import NoData from "./../../../components/NoData/NoData";

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

const BookingListPage = (props) => {
  const { bookings } = props;
  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: 10,
    searchQuery: "",
    booking: [],
  });
  const classes = useStyles(props);
  const navigate = useNavigate();
  console.log(bookings);
  const handlePageChange = (event, page) => {
    setState({ ...state, currentPage: page });
  };

  const getPageData = () => {
    const { currentPage, pageSize, searchQuery } = state;

    const searchRegex = new RegExp(escapeRegExp(searchQuery), "i");

    let filteredBookings = bookings;
    if (searchQuery && Array.isArray(filteredBookings)) {
      filteredBookings = bookings.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
    }

    const newBookings = paginate(filteredBookings, currentPage, pageSize);
    return {
      totalCount: filteredBookings?.length ? filteredBookings?.length : 0,
      data: newBookings,
    };
  };

  React.useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery, state.currentPage]);

  return (
    <>
      <PageHeader title={"Bookings"}></PageHeader>
      <Box className={classes.root}>
        <div className={classes.searchField}>
          <TextField
            label={"Search Booking"}
            size="small"
            fullWidth
            value={state.searchQuery}
            onChange={(e) =>
              setState({ ...state, searchQuery: e.currentTarget.value })
            }
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellHeader}>
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
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderCollection(
                getPageData().data,
                (booking) => (
                  <TableRow
                    key={booking.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(booking._id.toString())}
                    hover
                  >
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
                    <TableCell>
                      {moment(booking.created).format("lll")}
                    </TableCell>
                    <TableCell>
                      {moment(booking.check_in).format("ll")}
                    </TableCell>
                    <TableCell>
                      {moment(booking.check_out).format("ll")}
                    </TableCell>
                    <TableCell>
                      <BookingStatus status={booking.status} />{" "}
                    </TableCell>
                  </TableRow>
                ),
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
        <div style={{ display: "flex", justifyContent: "end" }}>
          <TablePagination
            component="div"
            count={getPageData().totalCount}
            page={state.currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={state.pageSize}
            onRowsPerPageChange={(row, rows) =>
              setState({ ...state, pageSize: rows })
            }
          />
        </div>
      </Box>
    </>
  );
};

export default BookingListPage;

// import * as React from "react";
// import PageHeader from "./../../../components/PageHeader/PageHeader";
// import moment from "moment";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import {
//   DataGrid,
//   GridToolbarDensitySelector,
//   GridToolbarFilterButton,
// } from "@mui/x-data-grid";
// import ClearIcon from "@mui/icons-material/Clear";
// import SearchIcon from "@mui/icons-material/Search";
// import { makeStyles } from "@mui/styles";

// function escapeRegExp(value) {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }

// const QuickSearchToolbar = (props) => {
//   return (
//     <Box
//       sx={{
//         p: 0.5,
//         pb: 0,
//         justifyContent: "space-between",
//         display: "flex",
//         alignItems: "flex-start",
//         flexWrap: "wrap",
//       }}
//     >
//       <div>
//         <GridToolbarFilterButton />
//         {/* <GridToolbarDensitySelector /> */}
//       </div>
//       <TextField
//         variant="standard"
//         value={props.value}
//         onChange={props.onChange}
//         placeholder="Search…"
//         InputProps={{
//           startAdornment: <SearchIcon fontSize="small" />,
//           endAdornment: (
//             <IconButton
//               title="Clear"
//               aria-label="Clear"
//               size="small"
//               style={{ visibility: props.value ? "visible" : "hidden" }}
//               onClick={props.clearSearch}
//             >
//               <ClearIcon fontSize="small" />
//             </IconButton>
//           ),
//         }}
//         sx={{
//           width: {
//             xs: 1,
//             sm: "auto",
//           },
//           m: (theme) => theme.spacing(1, 0.5, 1.5),
//           "& .MuiSvgIcon-root": {
//             mr: 0.5,
//           },
//           "& .MuiInput-underline:before": {
//             borderBottom: 1,
//             borderColor: "divider",
//           },
//         }}
//       />
//     </Box>
//   );
// };

// QuickSearchToolbar.propTypes = {
//   clearSearch: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

// const useStyles = makeStyles(
//   () => ({
//     root: {
//       "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
//         outline: "none",
//       },
//       "&.MuiDataGrid-root .MuiDataGrid-cell ": {
//         cursor: "pointer",
//       },
//       "&.MuiDataGrid-root .MuiDataGrid-columnHeader ": {
//         width: "100% !important",
//         minWidth: "unset !important",
//         maxWidth: "unset !important",
//       },
//       "&.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
//         display: "block !important",
//       },
//     },
//   }),
//   { name: "BookingListPage" }
// );
// export default function BookingListPage(props) {
//   const classes = useStyles(props);
//   const { bookings } = props;
//   const data = {
//     columns: [
//       {
//         field: "id",
//         hide: true,
//       },
//       {
//         field: "booking_reference",
//         headerName: "Booking Reference",
//         width: 200,
//         flex: 1,
//       },
//       {
//         field: "created",
//         headerName: "Booking Date",
//         width: 200,
//         flex: 1,
//         editable: false,
//       },
//       {
//         field: "check_in",
//         headerName: "Check-In",
//         width: 200,

//         editable: false,
//       },
//       {
//         field: "check_out",
//         headerName: "Check-Out",
//         width: 200,

//         editable: false,
//       },
//       {
//         field: "status",
//         headerName: "Status",
//         width: 200,

//         editable: false,
//       },
//     ],
//     rows:
//       bookings.map((booking) => ({
//         ...booking,
//         created: moment(booking.created).format("lll"),
//         check_in: moment(booking.check_in).format("ll"),
//         check_out: moment(booking.check_out).format("ll"),
//       })) || [],
//   };

//   const [searchText, setSearchText] = React.useState("");
//   const [rows, setRows] = React.useState(data.rows);

//   const requestSearch = (searchValue) => {
//     setSearchText(searchValue);
//     const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
//     const filteredRows = data.rows.filter((row) => {
//       return Object.keys(row).some((field) => {
//         return searchRegex.test(row[field].toString());
//       });
//     });
//     setRows(filteredRows);
//   };

//   React.useEffect(() => {
//     setRows(data.rows);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [bookings]);

//   return (
//     <>
//       <PageHeader title={"Bookings"}></PageHeader>
//       <Box sx={{ height: 500, width: "100%", backgroundColor: "#FFFFFF" }}>
//         <DataGrid
//           className={classes.root}
//           components={{ Toolbar: QuickSearchToolbar }}
//           rows={rows}
//           columns={data.columns}
//           disableExtendRowFullWidth={true}
//           componentsProps={{
//             toolbar: {
//               value: searchText,
//               onChange: (event) => requestSearch(event.target.value),
//               clearSearch: () => requestSearch(""),
//             },
//           }}
//           onRowClick={(e) => console.log(e.row)}
//           disableColumnMenu={true}
//           loading={!bookings}
//           hideFooterSelectedRowCount
//         />
//       </Box>
//     </>
//   );
// }
