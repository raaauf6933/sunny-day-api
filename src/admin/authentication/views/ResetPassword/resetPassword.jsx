import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "./../../../context/auth/context";
import { useNavigate } from "react-router-dom";

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

const ResetPassword = (props) => {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { requestResetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await requestResetPassword({ email });

      if (result?.data?.code === "USER_NO_FOUND") {
        setError("Email does not exist");
      } else {
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
              Sunny Day Residences | Admin
            </Typography>
            <Typography component="h1" variant="h5" gutterBottom>
              Reset Your Password
            </Typography>
            {success ? (
              <>
                <Box marginTop="1em" marginBottom="1em">
                  <span>
                    Your Request to change your password has been sent to your
                    Email.
                  </span>{" "}
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
                <Box>
                  <span>
                    Lost your password? Please enter your email address. You
                    will receive a link to create a new password via email.
                  </span>{" "}
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    helperText={error}
                    error={error}
                    required
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <LoadingButton
                    onClick={onSubmit}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    disabled={!email}
                  >
                    RESET PASSWORD
                  </LoadingButton>

                  {/* <Button variant="contained" color="primary" disabled={!email} onClick={onSubmit}>
                RESET PASSWORD
              </Button> */}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/admin/login")}
                  >
                    Login
                  </Button>
                </Box>{" "}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPassword;
