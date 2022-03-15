import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Select from "./../../../../client-side/components/Select";
import Form from "./../../../components/Form/Form";

const BookingAdditionalDialog = ({
  open,
  onClose,
  fetchAmenities,
  addAmenity,
}) => {
  const [choices, setChoices] = React.useState([]);

  const getAmenities = async () => {
    const result = await fetchAmenities();
    setChoices(
      result
        ? result.map((e) => ({
            value: JSON.stringify({ id: e._id, rate: e.rate, name: e.name }),
            label: e.name,
          }))
        : []
    );
  };

  const handleSubmit = (formData) => {
    addAmenity(formData);
    onClose();
  };

  React.useEffect(() => {
    getAmenities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const discountChoices = [
  //   { value: "none", label: "none" },
  //   ,
  // ];

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle>Add Amenity</DialogTitle>
      <Form
        initial={{
          amenity_id: "",
          qty: 1,
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, submit }) => {
          return (
            <>
              <DialogContent dividers>
                <Select
                  label="Amenities"
                  value={data.amenity_id}
                  name="amenity_id"
                  choices={choices}
                  onChange={change}
                />

                <TextField
                  label="Quantity"
                  type="number"
                  inputProps={{
                    min: 1,
                  }}
                  name="qty"
                  value={data.qty}
                  onChange={(e) =>
                    change({
                      target: {
                        name: "qty",
                        value: parseInt(
                          e.target.value.replace(/\D/g, "").replace(/^0+/, "")
                        ),
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button fullWidth variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  disabled={!data.amenity_id || !data.qty}
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

export default BookingAdditionalDialog;
