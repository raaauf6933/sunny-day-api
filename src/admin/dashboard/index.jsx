import React from "react";
import { Card, Typography, Grid, Box, Skeleton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { currencyFormat } from "./../../misc";
import { useAuth } from "./../context/auth/context";
import { GET_DASHBOARD_REPORT } from "./api";
import ApiAxios from "./../../apiAxios";
import { WindowTitle } from "./../components/WindowTitle/WindowTitle";

const Dashboard = () => {
  const [reports, setReports] = React.useState();
  const { user } = useAuth();

  const getDashboardReports = async () => {
    try {
      const result = await ApiAxios({
        method: "GET",
        url: GET_DASHBOARD_REPORT,
      });
      setReports(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getDashboardReports();
  }, []);

  return (
    <>
      <WindowTitle title={"Dashboard"} />
      <Typography variant="h3" gutterBottom>
        Hello there, {user.first_name}
      </Typography>

      <Grid container spacing={2} width="100%">
        <Grid item xs={12} sm={12} md={12}>
          <Card
            sx={{
              width: "100%",
            }}
          >
            <Box padding="10px">
              <Box display="flex" alignItems="center">
                <div
                  style={{
                    background: "#EFF5F8",
                    color: "#2151A1",
                    borderRadius: "10%",
                    padding: "0.5em",
                  }}
                >
                  <InsertChartOutlinedIcon
                    sx={{
                      fontSize: "4em",
                    }}
                  />
                </div>
                <Box marginLeft="1em">
                  <Typography variant="h6">Sales (today)</Typography>
                  <Typography variant="h4">
                    {reports?.sales_today !== undefined ? (
                      currencyFormat(reports.sales_today)
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <Box padding="10px">
              <Box display="flex" alignItems="center">
                <div
                  style={{
                    background: "#EFF5F8",
                    color: "#2151A1",
                    borderRadius: "10%",
                    padding: "0.5em",
                  }}
                >
                  <NotificationsActiveOutlinedIcon
                    sx={{
                      fontSize: "4em",
                    }}
                  />
                </div>
                <Box marginLeft="1em">
                  <Typography variant="h6">New Bookings (today)</Typography>
                  <Typography variant="h4">
                    {reports?.new_booking !== undefined ? (
                      reports?.new_booking
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <Box padding="10px">
              <Box display="flex" alignItems="center">
                <div
                  style={{
                    background: "#EFF5F8",
                    color: "#2151A1",
                    borderRadius: "10%",
                    padding: "0.5em",
                  }}
                >
                  <AccessTimeIcon
                    sx={{
                      fontSize: "4em",
                    }}
                  />
                </div>
                <Box marginLeft="1em">
                  <Typography variant="h6">Pending Bookings</Typography>
                  <Typography variant="h4">
                    {reports?.pending_booking !== undefined ? (
                      reports?.pending_booking
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <Box padding="10px">
              <Box display="flex" alignItems="center">
                <div
                  style={{
                    background: "#EFF5F8",
                    color: "#2151A1",
                    borderRadius: "10%",
                    padding: "0.5em",
                  }}
                >
                  <CheckCircleOutlinedIcon
                    fontSize="large"
                    sx={{
                      fontSize: "4em",
                    }}
                  />
                </div>
                <Box marginLeft="1em">
                  <Typography variant="h6">Confirmed Bookings</Typography>
                  <Typography variant="h4">
                    {reports?.confirmed_booking !== undefined ? (
                      reports?.confirmed_booking
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
