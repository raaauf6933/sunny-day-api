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
import {
  TextField,
  Box,
  TablePagination,
  Skeleton,
  Button,
} from "@mui/material";
import { currencyFormat } from "./../../../../misc";
import NoData from "./../../../components/NoData/NoData";
import Status from "./../../../components/Status";

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

const DiscountListPage = (props) => {
  const { discounts, onCreateDiscount } = props;
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

    let filteredDiscounts = discounts;
    if (searchQuery && Array.isArray(filteredDiscounts)) {
      filteredDiscounts = discounts.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
    }

    const newUsers = paginate(filteredDiscounts, currentPage, pageSize);
    return {
      totalCount: filteredDiscounts?.length ? filteredDiscounts?.length : 0,
      data: newUsers,
    };
  };

  React.useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery, state.currentPage]);

  return (
    <>
      {" "}
      <PageHeader title={"Discounts"}>
        <Button
          onClick={() => onCreateDiscount()}
          color="primary"
          variant="contained"
          style={{ outline: "none" }}
        >
          <span>Create Discount</span>
        </Button>
      </PageHeader>
      <Box className={classes.root}>
        <div className={classes.searchField}>
          <TextField
            label={"Search Discount"}
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
                <TableCell className={classes.tableCellHeader}>Name</TableCell>
                <TableCell className={classes.tableCellHeader}>
                  Discount Type
                </TableCell>
                <TableCell className={classes.tableCellHeader}>Value</TableCell>
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
                (discount) => (
                  <TableRow
                    key={discount._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    hover
                  >
                    <TableCell>
                      {discount.name ? (
                        <span>{discount.name}</span>
                      ) : (
                        <Skeleton width={5} height={5} />
                      )}
                    </TableCell>
                    <TableCell>{discount?.type}</TableCell>
                    <TableCell>
                      {discount?.type === "FIXED"
                        ? currencyFormat(discount?.discount_rate)
                        : discount?.discount_rate + "%"}
                    </TableCell>
                    <TableCell>
                      <Status status={discount?.status} />
                    </TableCell>
                  </TableRow>
                ),
                () => (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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

export default DiscountListPage;
