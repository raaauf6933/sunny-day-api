import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
} from "@mui/material";
import apiAxios from "../../../apiAxios";
import { useNavigate, useLocation } from "react-router-dom";
import { parse as parseQs } from "qs";
import { MyBookingTypePath } from "../url";
import { AUTH_CLIENT } from "../api";
import { LoadingButton } from "@mui/lab";

const MyBookingLogIn = () => {
  const [form, setForm] = useState({ booking_reference: "", email: "" });
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const handleLogin = async () => {
    setLoading(true);
    setFormError(false);
    try {
      const result = await apiAxios({
        method: "POST",
        url: AUTH_CLIENT,
        data: {
          booking_reference: form.booking_reference,
          email: form.email,
        },
      });
      setLoading(false);
      navigate(MyBookingTypePath(result.data.token, params));
    } catch (error) {
      setFormError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        textAlign: "center",
        marginTop: "5em",
      }}
    >
      <Box sx={{ boxShadow: 3 }}>
        {" "}
        <Card>
          <CardHeader title="My Booking" />
          <CardContent>
            <form action="#" class=" pr-5 pl-5 pb-3 contact-form">
              <div class="form-group">
                <TextField
                  fullWidth
                  autoFocus
                  label="Booking Reference"
                  variant="outlined"
                  value={form.booking_reference}
                  onChange={(e) =>
                    setForm({ ...form, booking_reference: e.target.value })
                  }
                  error={formError}
                  helperText={
                    formError ? "Invalid Booking Reference or Email" : ""
                  }
                />
              </div>
              <div class="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div class="form-group">
                <LoadingButton
                  disabled={!form.booking_reference || !form.email}
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  loading={loading}
                >
                  <b>Submit</b>
                </LoadingButton>
              </div>
            </form>
          </CardContent>
        </Card>{" "}
      </Box>
    </div>
  );
};

export default MyBookingLogIn;
