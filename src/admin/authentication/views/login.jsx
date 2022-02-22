import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Form from "./../../components/Form/Form";
import { makeStyles } from "@mui/styles";
import { useAuth } from "./../../context/auth/context";
import logo from "./../../../assets/images/admin_logo.png";

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
  const { login } = useAuth();
  const [error, setError] = useState(false);

  const handleLogin = async (formData) => {
    setError(false);
    let err = await login(formData);
    if (err) {
      setError(true);
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
              Villa Gregoria Resort | Admin Dashboard
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
                  <Button
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
                  </Button>
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
