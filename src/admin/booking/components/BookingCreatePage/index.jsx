import React from "react";
import { TextField, Box } from "@mui/material";
import PageHeader from "./../../../components/PageHeader/PageHeader";
import { makeStyles } from "@mui/styles";
import Form from "./../../../components/Form/Form";
import DatePicker from "./components/DatePicker";
import RoomSection from "./components/RoomSection";
import GuestForm from "./components/GuestForm";

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: "#FFFFFF",
      padding: "1.5em",
      //   display: "flex",
      //   justifyContent: "center",
    },
    section: {
      marginBottom: "1em",
    },
  }),
  { name: "" }
);

const BookingCreatePage = (props) => {
  const classes = useStyles(props);
  const [value, setValue] = React.useState([null, null]);
  return (
    <>
      <PageHeader title={"Create Form"}></PageHeader>
      <Box className={classes.root}>
        <Form
          initial={{
            dates: [null, null],
          }}
        >
          {({ data, change }) => {
            return (
              <>
                {" "}
                <div className={classes.section}>
                  <h3>1. Choose Date</h3>
                  <DatePicker data={data} change={change} />
                </div>
                <div className={classes.section}>
                  <h3>2. Choose Rooms</h3>
                  <RoomSection />
                </div>
                <div className={classes.section}>
                  <h3>3. Guest Information</h3>
                  <GuestForm />
                </div>
              </>
            );
          }}
        </Form>
      </Box>
    </>
  );
};

export default BookingCreatePage;
