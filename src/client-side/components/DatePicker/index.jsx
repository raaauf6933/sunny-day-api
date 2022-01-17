import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@mui/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import { DATE_MIN_DATE } from "../../../config";

const useStyles = makeStyles(
  () => {
    return {
      dateInput: {
        border: "none !important",
        fontSize: "20px",
        "&:focus": {
          outline: "none",
        },
      },
      content: {
        display: "flex",
        flexDirection: "row",
        color: "rgba(0, 0, 0, 0.4) !important",
      },
      icon: {
        fontSize: "28px !important",
        marginRight: "4px",
      },
    };
  },
  {
    name: "DatePickerComponent",
  }
);

const DatePickerComponent = (props) => {
  const { name, dates, setDates } = props;
  const classes = useStyles(props);

  const handleOnChange = (date) => {
    setDates({ ...dates, [name]: date });

    // setDates({ ...dates, [name]: date });
  };

  const handleGetMinDate = () => {
    return new Date(moment(new Date()).add(DATE_MIN_DATE, "days").format());
  };

  return (
    <div className={classes.content}>
      <CalendarTodayIcon className={classes.icon} />
      <DatePicker
        dateFormat="MMMM d, yyyy"
        className={classes.dateInput}
        selected={dates[name]}
        name={name}
        onChange={(date) => handleOnChange(date)}
        minDate={handleGetMinDate()}
        placeholderText="Select Date"
        shouldCloseOnSelect={false}
      />
    </div>
  );
};

export default DatePickerComponent;
