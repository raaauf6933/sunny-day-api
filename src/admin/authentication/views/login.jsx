import React from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Form from "./../../components/Form/Form";
import { makeStyles } from "@mui/styles";
import { useAuth } from "./../../context/auth/context";
const useStyles = makeStyles(
  () => ({
    root: {
      background: "white !important",
      //   "& > *": {
      //     margin: "1em !important",
      //   },
    },
  }),
  {
    name: "LoginView",
  }
);

const LoginView = (props) => {
  const classes = useStyles(props);
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <Container component="main" maxWidth="xs">
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
            {" "}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Form
              initial={{ username: "", password: "" }}
              onSubmit={() => handleLogin()}
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
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={data.password}
                    type="password"
                    inputProps={{
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    onChange={change}
                  />
                  <Button
                    disabled={!hasChanged}
                    fullWidth
                    variant="contained"
                    onClick={submit}
                    sx={{ mt: 3, mb: 2 }}
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
