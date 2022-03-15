import React, { forwardRef } from "react";
// import DiscountList from "./view/DiscountList";
import { WindowTitle } from "../components/WindowTitle/WindowTitle";
import PageHeader from "../components/PageHeader/PageHeader";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createBookingTypeChoices, createSortChoices, dd } from "./handlers";
import Select from "./../../client-side/components/Select";
import Form from "./../components/Form/Form";
// import DatePicker from "@mui/lab/DatePicker";
import { LoadingButton } from "@mui/lab";
import DatePicker from "react-datepicker";
import moment from "moment";
import ApiAxios from "./../../apiAxios";
import { EXTRACT_REPORT } from "./api";
import { useSnackbar } from "notistack";
import { useAuth } from "./../context/auth/context";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: "#FFFFFF",
    },
    form: {
      "& > *": {
        marginBottom: "10px",
      },
    },
    cardActions: {
      display: "flex",
      justifyContent: "center",
    },
  }),
  { name: "Component" }
);

const Component = (props) => {
  const classes = useStyles(props);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const StartDate = forwardRef(({ value, onClick }, ref) => (
    <TextField
      fullWidth
      label="Start Date"
      onClick={onClick}
      ref={ref}
      value={value}
    ></TextField>
  ));

  const EndDate = forwardRef(({ value, onClick }, ref) => (
    <TextField
      fullWidth
      label="End Date"
      onClick={onClick}
      ref={ref}
      value={value}
    ></TextField>
  ));

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const result = await ApiAxios({
        url: EXTRACT_REPORT,
        method: "POST",
        data: formData,
      });

      pdfMake.createPdf(dd(result.data, formData, user)).open();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <WindowTitle title={"Reports"} />
      <PageHeader title={"Reports"} />
      <Box className={classes.root}>
        <Card>
          <Form
            initial={{
              status: "",
              sort_by: "",
              from: new Date(),
              to: new Date(),
            }}
            onSubmit={handleSubmit}
          >
            {({ data, change, submit }) => {
              return (
                <>
                  <CardContent className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Select
                          name="status"
                          value={data.status}
                          onChange={change}
                          label="Booking Status"
                          choices={createBookingTypeChoices()}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={12}>
                      <Select
                        label="Date Range"
                        choices={createDateRangeChoices()}
                      />
                    </Grid> */}
                      <Grid item xs={12} sm={12} md={12}>
                        <Select
                          name="sort_by"
                          value={data.sort_by}
                          onChange={change}
                          label="Sort By"
                          choices={createSortChoices()}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <DatePicker
                          selected={data.from}
                          dateFormat="MMMM d, yyyy"
                          name="from"
                          onChange={(date) => {
                            change({
                              target: {
                                name: "from",
                                value: date,
                              },
                            });

                            if (moment(date).isAfter(moment(data.to))) {
                              change({
                                target: {
                                  name: "to",
                                  value: date,
                                },
                              });
                            }
                          }}
                          customInput={<StartDate />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <DatePicker
                          selected={data.to}
                          name="to"
                          dateFormat="MMMM d, yyyy"
                          onChange={(date) => {
                            change({
                              target: {
                                name: "to",
                                value: date,
                              },
                            });
                          }}
                          customInput={<EndDate />}
                          minDate={new Date(moment(data.from).format())}
                        />
                      </Grid>
                    </Grid>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}

                    {/* </LocalizationProvider> */}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <LoadingButton
                      style={{ outline: "none" }}
                      sx={{ marginBottom: "1em" }}
                      onClick={submit}
                      loading={loading}
                      disabled={
                        !data.status || !data.sort_by || !data.from || !data.to
                      }
                      loadingPosition="end"
                      variant="contained"
                    >
                      <b>Generate</b>
                    </LoadingButton>
                  </CardActions>
                </>
              );
            }}
          </Form>
        </Card>
      </Box>
    </>
  );
};

export default Component;
