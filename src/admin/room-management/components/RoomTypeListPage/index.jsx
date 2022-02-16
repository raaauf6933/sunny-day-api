import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { renderCollection, escapeRegExp, paginate } from "./../../../../misc";
import PageHeader from "./../../../components/PageHeader/PageHeader";
import { currencyFormat } from "./../../../../misc";
import {
  TextField,
  Box,
  TablePagination,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const RoomTypeListPage = (props) => {
  const { roomTypes, onAdd } = props;

  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: 10,
    searchQuery: "",
    booking: [],
  });
  const classes = useStyles(props);
  const navigate = useNavigate();

  const handlePageChange = (event, page) => {
    setState({ ...state, currentPage: page });
  };

  const getPageData = () => {
    const { currentPage, pageSize, searchQuery } = state;

    const searchRegex = new RegExp(escapeRegExp(searchQuery), "i");

    let filteredRoomTypes = roomTypes;
    if (searchQuery && Array.isArray(filteredRoomTypes)) {
      filteredRoomTypes = roomTypes.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
    }

    const newBookings = paginate(filteredRoomTypes, currentPage, pageSize);
    return {
      totalCount: filteredRoomTypes?.length ? filteredRoomTypes?.length : 0,
      data: newBookings,
    };
  };

  React.useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery, state.currentPage]);

  return (
    <>
      <PageHeader title={"Bookings"}>
        {" "}
        <Button color="primary" variant="contained" onClick={onAdd}>
          <span>Create Room Type</span>
        </Button>
      </PageHeader>
      <Box className={classes.root}>
        <div className={classes.searchField}>
          <TextField
            label={"Search Room"}
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
                  Room Type Name
                </TableCell>
                <TableCell className={classes.tableCellHeader}>Rate</TableCell>
                <TableCell className={classes.tableCellHeader}>Rooms</TableCell>
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
                (roomType) => (
                  <TableRow
                    key={roomType._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(roomType._id.toString())}
                    hover
                  >
                    <TableCell>{roomType.name}</TableCell>
                    <TableCell>{currencyFormat(roomType.room_rate)}</TableCell>
                    <TableCell>{roomType?.rooms.length}</TableCell>
                    <TableCell>{roomType.status}</TableCell>
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

export default RoomTypeListPage;
