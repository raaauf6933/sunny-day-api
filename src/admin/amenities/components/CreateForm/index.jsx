import React from "react";
import Form from "./../../../components/Form/Form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const CreateForm = ({ open, onClose, createAmenity }) => {
  const handleSubmit = (formData) => {
    createAmenity(formData);
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => onClose({ type: undefined, id: undefined })}
    >
      <Form
        initial={{
          name: "",
          rate: 1,
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, submit }) => {
          return (
            <>
              <DialogTitle>Amenity</DialogTitle>
              <DialogContent dividers>
                <TextField
                  fullWidth
                  label="name"
                  name="name"
                  value={data.name}
                  onChange={change}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="rate"
                  type="number"
                  inputProps={{
                    min: 1,
                  }}
                  name="rate"
                  onChange={(e) =>
                    change({
                      target: {
                        name: "rate",
                        value: parseInt(
                          e.target.value.replace(/\D/g, "").replace(/^0+/, "")
                        ),
                      },
                    })
                  }
                  value={data.rate}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClose()} fullWidth variant="outlined">
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={submit}
                  disabled={!data.name || !data.rate}
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

export default CreateForm;
