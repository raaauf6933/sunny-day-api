import React, { useState } from "react";
import {
  TextField,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Form from "./../../components/Form/Form";
import { makeStyles } from "@mui/styles";
import { useAuth } from "./../../context/auth/context";
// import logo from "./../../../assets/images/admin_logo.png";
import { LoadingButton } from "@mui/lab";
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

const LoginView = (props) => {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (formData) => {
    setError(false);
    setLoading(true);

    try {
      let err = await login(formData);
      if (err) {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
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
          {/* <CardMedia
            component="img"
            image={logo}
            alt="Live from space album cover"
            sx={{ width: "300px" }}
          /> */}

          <CardContent>
            {" "}
            <Typography
              component="h1"
              variant="h5"
              textAlign="center"
              padding="30px"
            >
              Sunny Day Residences | Admin Dashboard
            </Typography>
            <Form
              initial={{ username: "", password: "" }}
              onSubmit={handleLogin}
            >
              {({ data, change, hasChanged, submit }) => (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={data.username}
                    onChange={change}
                    inputProps={{
                      autocomplete: "new-username",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    autoFocus
                    error={error}
                    helperText={error ? "Invalid username or password" : ""}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={data.password}
                    type="password"
                    error={error}
                    inputProps={{
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    onChange={change}
                  />
                  {/* <Button
                    disabled={!data.username || !data.password}
                    fullWidth
                    variant="contained"
                    onClick={submit}
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    style={{
                      outline: "none",
                    }}
                  >
                    SIGN IN
                  </Button> */}
                  <Box marginTop="10px" marginBottom="10px">
                    <Typography
                      sx={{
                        color: "#1F4EF4",
                        cursor: "pointer",
                      }}
                      variant="body2"
                      onClick={() => navigate("/admin/reset-password")}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>

                  <LoadingButton
                    fullWidth
                    onClick={submit}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    SIGN IN
                  </LoadingButton>
                </>
              )}
            </Form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginView;
