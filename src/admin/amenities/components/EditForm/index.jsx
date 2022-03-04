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

const EditForm = ({ open, onClose, editAmenity, initialData }) => {
  const handleSubmit = (formData) => {
    editAmenity(formData);

    onClose({ id: undefined });
  };

  const createStatusChoices = () => {
    return [
      {
        label: "Active",
        value: "ACT",
      },
      {
        label: "Disabled",
        value: "DEACT",
      },
    ];
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => onClose({ id: undefined })}
    >
      <Form initial={initialData} onSubmit={handleSubmit}>
        {({ data, change, submit }) => {
          console.log(data);
          return (
            <>
              <DialogTitle>Amenity</DialogTitle>
              <DialogContent dividers>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={change}
                  InputLabelProps={{ shrink: true }}
                  disabled={true}
                />
                <TextField
                  fullWidth
                  label="Rate"
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
                  InputLabelProps={{ shrink: true }}
                  disabled={!initialData.rate}
                  margin="normal"
                />
                <Select
                  choices={createStatusChoices()}
                  label="Status"
                  onChange={(e) =>
                    change({
                      target: {
                        name: "status",
                        value: e.target.value,
                      },
                    })
                  }
                  name="status"
                  value={data.status ? data.status : "ACT"}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => onClose({ id: undefined })}
                  fullWidth
                  variant="outlined"
                >
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

export default EditForm;
