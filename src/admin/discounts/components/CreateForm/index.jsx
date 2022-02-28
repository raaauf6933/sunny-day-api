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
import Select from "./../../../../client-side/components/Select";

const CreateForm = ({ open, onClose, createDiscount }) => {
  const handleSubmit = (formData) => {
    createDiscount(formData);
    onClose();
  };

  const discountTypeChoices = [
    {
      value: "FIXED",
      label: "FIXED",
    },
    {
      value: "PERCENTAGE",
      label: "PERCENTAGE",
    },
  ];

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
          type: "",
          discount_rate: 1,
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, submit }) => {
          return (
            <>
              <DialogTitle>Create Discount</DialogTitle>
              <DialogContent dividers>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={change}
                  margin="normal"
                />

                <Select
                  label="Discount Type"
                  value={data.type}
                  name="type"
                  choices={discountTypeChoices}
                  onChange={change}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Value"
                  type="number"
                  inputProps={{
                    min: 1,
                  }}
                  name="discount_rate"
                  onChange={(e) =>
                    change({
                      target: {
                        name: "discount_rate",
                        value: parseInt(
                          e.target.value.replace(/\D/g, "").replace(/^0+/, "")
                        ),
                      },
                    })
                  }
                  value={data.discount_rate}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClose()} fullWidth variant="outlined">
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={submit}
                  disabled={!data.name || !data.discount_rate || !data.type}
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
