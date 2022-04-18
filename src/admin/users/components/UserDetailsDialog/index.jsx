import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Form from "./../../../components/Form/Form";
import { hasNoError } from "./../../../utils/hasNoError";
import { userValidation } from "./../../handlers";

const initialErrorValidation = {
  first_name: null,
};

const UserDetailsDialog = (props) => {
  const {
    open,
    onClose,
    user,
    params,
    createUser,
    // updateUser, onSubmit
  } = props;

  const [error, setErrorValdiation] = useState(initialErrorValidation);

  const initialData = {
    first_name: params?.type === "create" ? "" : user?.first_name,
    last_name: params?.type === "create" ? "" : user?.last_name,
    email: params?.type === "create" ? "" : user?.email,
    username: params?.type === "create" ? "" : user?.username,
    password: "",
  };

  const handleSubmit = async (formData) => {
    if (params) {
      const validate = userValidation(formData);
      if (params?.type === "create") {
        if (hasNoError(validate)) {
          setErrorValdiation(validate);
          createUser(formData);
          onClose();
        } else {
          setErrorValdiation(validate);
        }
      } else {
        if (hasNoError(validate)) {
          setErrorValdiation(validate);
          // updateUser(formData);
          onClose();
        } else {
          setErrorValdiation(validate);
        }
      }
    }
  };

  return (
    <>
      <Form initial={initialData} onSubmit={handleSubmit}>
        {({ change, data, hasChanged, submit, reset }) => (
          <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={() => onClose({ type: undefined, id: undefined })}
          >
            <DialogTitle>
              {params?.type === "create" ? "Create User" : user?.username}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={data.first_name}
                    onChange={change}
                    autoFocus
                    error={!!error.first_name}
                    helperText={error.first_name}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={data.last_name}
                    onChange={change}
                    error={!!error.last_name}
                    helperText={error.last_name}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={change}
                    error={!!error.email}
                    helperText={error.email}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={data.username}
                    onChange={change}
                    error={!!error.username}
                    helperText={error.username}
                    inputProps={{
                      autocomplete: "new-username",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={data?.password}
                    onChange={change}
                    error={!!error.password}
                    helperText={error.password}
                    inputProps={{
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => onClose({ type: undefined, id: undefined })}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  submit();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Form>
    </>
  );
};

export default UserDetailsDialog;
