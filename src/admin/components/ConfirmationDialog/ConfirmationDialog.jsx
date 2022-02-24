import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmationDialog = (props) => {
  const { open, onClose, message, onSubmit } = props;

  const handleSubmit = async () => {
    const result = await onSubmit();
    if (result.data) {
      onClose();
    }
  };
  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent dividers>{message}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
