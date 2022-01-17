import React from "react";
import { Pagination } from "@mui/material";
// import _ from "lodash";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    root: {
      padding: "1em",
    },
  }),
  { name: "PaginationComponent" }
);

const PaginationComponent = ({
  itemsCount,
  pageSize,
  onPageChange,
  ...rest
}) => {
  const classes = useStyles(rest);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  //   const pages = _.range(1, pagesCount + 1);

  return (
    <div className={classes.root}>
      <Pagination
        count={pagesCount}
        onChange={(e, value) => onPageChange(value)}
        variant="outlined"
        shape="rounded"
      ></Pagination>
    </div>
  );
};

export default PaginationComponent;
