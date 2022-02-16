import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const CreateRoomDialog = (props) => {
  const { open, onClose, onSubmit } = props;
  const [roomNumber, setRoomNumber] = React.useState("");

  const handleSubmit = async () => {
    try {
      await onSubmit(roomNumber, onClose);
    } catch (error) {}
  };
  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            autoFocus
            label="Room Number"
            variant="outlined"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            variant="outlined"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            style={{ outline: "none" }}
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRoomDialog;
