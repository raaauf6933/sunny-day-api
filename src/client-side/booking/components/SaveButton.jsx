import React from "react";
import { Box, Button } from "@mui/material";

const SaveButton = (props) => {
  const { onSubmit, onBack, disabledSave, saveLabel } = props;

  return (
    <Box display="flex" justifyContent="center" marginBottom="1.5em">
      <Button
        color="info"
        variant="outlined"
        style={{ marginRight: "1.5em" }}
        onClick={() => onBack()}
      >
        Back
      </Button>
      <Button
        variant="contained"
        onClick={() => onSubmit()}
        disabled={disabledSave}
      >
        {saveLabel || "Submit"}
      </Button>
    </Box>
  );
};

export default SaveButton;
