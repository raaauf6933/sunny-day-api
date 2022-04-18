import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../../context/auth/context";

const useStyles = makeStyles(
  () => ({
    root: {
      display: "flex !important",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
  {
    name: "LoginView",
  }
);

const ResetPasswordForm = (props) => {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { id } = useParams();
  const [password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const verifyToken = () => {
    try {
      const result = jwt_decode(id);
      return result;
    } catch (error) {
      navigate("/admin/reset-password");
      return error;
    }
  };

  const user_details = verifyToken();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const validate = () => {
        if (password.password !== password.confirm_password) {
          setError("Password must be equal to Confirm password");
          return false;
        } else if (password.password.length < 5) {
          setError(
            "Password length must be greater than or equal to 6 characters"
          );
          return false;
        } else {
          return true;
        }
      };

      if (validate()) {
        await resetPassword({
          id: user_details._id,
          password: password.password,
        });
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <CardContent>
            <Typography component="h1" variant="h4" gutterBottom>
              Villa Gregoria Resort | Admin
            </Typography>
            {success ? (
              <>
                <Box margin="10px">
                  <span>You have successfully changed your password.</span>{" "}
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/admin/login")}
                  >
                    Back to Login
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box margin="10px">
                  <span>Enter a new password for {user_details?.email}</span>{" "}
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={password.password}
                    onChange={(e) =>
                      setPassword({ ...password, password: e.target.value })
                    }
                    error={error}
                    helperText={error}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password.confirm_password}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        confirm_password: e.target.value,
                      })
                    }
                    required
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    loadingPosition="end"
                    fullWidth
                    loading={loading}
                    disabled={!password.password || !password.confirm_password}
                    onClick={onSubmit}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
