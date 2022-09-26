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
        width: "100%",
        height: "50px",
        border: "1px solid #ebebeb",
        borderRadius: "2px",
        fontSize: "13px",
        color: "#19191a",
        textTransform: "uppercase",
        fontWeight: 500,
        paddingLeft: "20px",
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

const DatePickerComponentV2 = (props) => {
  const { name, dates, setDates, minDate, disabled } = props;
  const classes = useStyles(props);

  const handleOnChange = (date) => {
    if (name === "check_in" && dates.check_out) {
      setDates({ ...dates, [name]: date, check_out: "" });
    } else {
      setDates({ ...dates, [name]: date });
    }

    // setDates({ ...dates, [name]: date });
  };

  const handleGetMinDate = () => {
    return minDate
      ? new Date(moment(minDate).add(DATE_MIN_DATE, "days").format())
      : new Date(moment(new Date()).add(DATE_MIN_DATE, "days").format());
  };

  return (
    <div className={classes.content}>
      {/* <CalendarTodayIcon className={classes.icon} /> */}
      <DatePicker
        dateFormat="MMMM d, yyyy"
        className={classes.dateInput}
        selected={dates[name]}
        name={name}
        onChange={(date) => handleOnChange(date)}
        minDate={handleGetMinDate()}
        placeholderText="Select Date"
        shouldCloseOnSelect={false}
        autoComplete="off"
        onChangeRaw={(e) => e.preventDefault()}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePickerComponentV2;
