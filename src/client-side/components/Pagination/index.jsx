import React from "react";
import { Pagination } from "@mui/material";
import _ from "lodash";

const PaginationComponent = ({ itemsCount, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  //   const pages = _.range(1, pagesCount + 1);

  return (
    <>
      <Pagination
        count={pagesCount}
        size="large"
        onChange={(e, value) => onPageChange(value)}
      ></Pagination>
    </>
  );
};

export default PaginationComponent;
