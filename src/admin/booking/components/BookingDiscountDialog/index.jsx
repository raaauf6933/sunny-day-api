import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  // TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Select from "./../../../../client-side/components/Select";
import Form from "./../../../components/Form/Form";

const BookingDiscountDialog = ({
  open,
  onClose,
  fetchDiscounts,
  addDiscount,
}) => {
  const [choices, setChoices] = React.useState([]);

  const getDiscounts = async () => {
    const result = await fetchDiscounts();
    setChoices(
      result
        ? result.map((e) => ({
            value: JSON.stringify({
              id: e._id,
              discount_rate: e.discount_rate,
              name: e.name,
              type: e.type,
            }),
            label: e.name,
          }))
        : []
    );
  };

  const handleSubmit = (formData) => {
    addDiscount(formData);
    onClose();
  };

  React.useEffect(() => {
    getDiscounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle>Add Discount</DialogTitle>
      <Form
        initial={{
          discount_type: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, submit }) => {
          return (
            <>
              <DialogContent dividers>
                <Select
                  label="Dicount Type"
                  value={data.discount_type}
                  name="discount_type"
                  choices={choices}
                  onChange={change}
                />
              </DialogContent>
              <DialogActions>
                <Button fullWidth variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  disabled={!data.discount_type}
                  onClick={submit}
                  fullWidth
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};

export default BookingDiscountDialog;
