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
import {
  TextField,
  Box,
  TablePagination,
  Skeleton,
  Button,
} from "@mui/material";

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

const UserListPage = (props) => {
  const { users, openModal } = props;
  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: 10,
    searchQuery: "",
    booking: [],
  });
  const classes = useStyles(props);

  const handlePageChange = (event, page) => {
    setState({ ...state, currentPage: page });
  };

  const getPageData = () => {
    const { currentPage, pageSize, searchQuery } = state;

    const searchRegex = new RegExp(escapeRegExp(searchQuery), "i");

    let filteredUsers = users;
    if (searchQuery && Array.isArray(filteredUsers)) {
      filteredUsers = users.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
    }

    const newUsers = paginate(filteredUsers, currentPage, pageSize);
    return {
      totalCount: filteredUsers?.length ? filteredUsers?.length : 0,
      data: newUsers,
    };
  };

  React.useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery, state.currentPage]);

  return (
    <>
      <PageHeader title={"Users"}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => openModal({ type: "create" })}
          style={{ outline: "none" }}
        >
          <span>Create User</span>
        </Button>
      </PageHeader>
      <Box className={classes.root}>
        <div className={classes.searchField}>
          <TextField
            label={"Search User"}
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
                  Username
                </TableCell>
                <TableCell className={classes.tableCellHeader}>
                  First Name
                </TableCell>
                <TableCell className={classes.tableCellHeader}>
                  Last Name
                </TableCell>
                <TableCell className={classes.tableCellHeader}>
                  Created Date
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
                (user) => (
                  <TableRow
                    key={user._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => openModal({ type: "edit", id: user._id })}
                    hover
                  >
                    <TableCell>
                      {user.username ? (
                        <span>{user.username}</span>
                      ) : (
                        <Skeleton width={5} height={5} />
                      )}
                    </TableCell>
                    <TableCell>{user?.first_name}</TableCell>
                    <TableCell>{user?.last_name}</TableCell>
                    <TableCell>
                      {" "}
                      {moment(user.createdAt).format("lll")}
                    </TableCell>
                    <TableCell>{user.status}</TableCell>
                  </TableRow>
                ),
                () => (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
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

export default UserListPage;
