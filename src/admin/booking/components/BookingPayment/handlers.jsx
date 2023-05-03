import { Button } from "@mui/material";

export const createAddDiscountBtn = (status, discount, onAddDiscount) => {
  if (status === "RESERVED" && !discount) {
    return (
      <>
        <Button
          // startIcon={<LocalOfferIcon />}
          onClick={() => onAddDiscount()}
          variant="outlined"
          color="success"
          size="small"
          style={{ outline: "none" }}
          sx={{
            color: "white",
            borderColor: "white",
          }}
        >
          Add Discount
        </Button>
      </>
    );
  } else {
    return <>{null}</>;
  }
};
