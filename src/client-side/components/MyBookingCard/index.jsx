import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import apiAxios from "../../../apiAxios";
import { useNavigate, useLocation } from "react-router-dom";
import { parse as parseQs } from "qs";
import { MyBookingTypePath } from "../../myBooking/url";
import { AUTH_CLIENT } from "../../myBooking/api";
import { LoadingButton } from "@mui/lab";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const MyBookingCard = (props) => {
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
    <Card>
      <CardHeader
        title={
          <Box textAlign="left">
            <Typography
              variant="subtitle1"
              sx={{
                color: "#2276d2",
                cursor: "pointer",
              }}
              onClick={props.toggleCard}
            >
              <ArrowCircleLeftOutlinedIcon /> Back
            </Typography>
          </Box>
        }
      />
      <CardContent
        sx={{
          paddingTop: "0em",
          paddingX: "2.5em",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">My Booking</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label
              for="date-in"
              style={{
                fontSize: "14px",
                color: "#707079",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Booking Reference:
            </label>
            <TextField
              fullWidth
              variant="standard"
              autoFocus
              value={form.booking_reference}
              onChange={(e) =>
                setForm({ ...form, booking_reference: e.target.value })
              }
              error={formError}
              helperText={formError ? "Invalid Booking Reference or Email" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label
              for="date-in"
              style={{
                fontSize: "14px",
                color: "#707079",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Email:
            </label>
            <TextField
              fullWidth
              variant="standard"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <LoadingButton
              fullWidth
              variant="outlined"
              onClick={handleLogin}
              loading={loading}
              sx={{
                padding: "1em",
              }}
            >
              <Typography fontWeight={500}>Search</Typography>
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyBookingCard;
