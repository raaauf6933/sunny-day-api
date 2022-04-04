import React from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  CardHeader,
  Container,
  CardActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import BookingStatus from "../../components/BookingStatus/BookingStatus";
import { makeStyles } from "@mui/styles";
import jwt_decode from "jwt-decode";
import { useParams, useLocation } from "react-router-dom";
import BookingSummary from "../../components/BookingSummary/BookingSummary";
import { VAT_RATE } from "../../../config";
import { getNoNights } from "../../../misc";
import { GET_BOOKING, UPLOAD_RECEIPT } from "../api";
import ApiAxios from "../../../apiAxios";
import Timeline from "../components/Timeline";
import { useSnackbar } from "notistack";
import Form from "./../../../admin/components/Form/Form";
import moment from "moment";
import ModifyBookingModal from "./../components/ModifyBookingModal";
import apiAxios from "../../../apiAxios";
import { GUEST_MODIFY_BOOKING } from "./../api";
import { parse as parseQs } from "qs";

const useStyles = makeStyles(
  () => ({
    card: {},
    root: {
      marginTop: "5em",
      marginBottom: "5em",
    },
  }),
  {
    name: "MyBookingDetails",
  }
);

const MyBookingDetails = (props) => {
  const { onModifyBooking, onClose } = props;
  const location = useLocation();
  const qs = parseQs(location.search.substr(1));
  const params = qs;
  const { id } = useParams();
  const classes = useStyles(props);
  const jwtId = jwt_decode(id);
  const { enqueueSnackbar } = useSnackbar();
  const [booking, setBooking] = React.useState({});
  const { guest, check_in, check_out, billing, rooms, status, events } =
    booking;
  const upload = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  const getBooking = async () => {
    try {
      const result = await ApiAxios({
        method: "POST",
        url: GET_BOOKING,
        data: { id: jwtId._id },
      });
      setBooking(result.data);
    } catch (error) {
      throw error;
    }
  };

  const uploadReceipt = async (data) => {
    data.append("data", JSON.stringify({ id: jwtId._id }));
    setLoading(true);
    try {
      await ApiAxios({
        method: "POST",
        url: UPLOAD_RECEIPT,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          data: "application/json",
        },
      });

      getBooking();
      setLoading(false);
      enqueueSnackbar("Image Uploaded!", {
        variant: "success",
      });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        "Invalid file format. Please use valid image file (png/jpg)",
        {
          variant: "error",
        }
      );
      throw error;
    }
  };

  React.useEffect(() => {
    getBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtId._id]);

  const getNoQuantity = (roomtype_id) => {
    return rooms
      ? rooms.filter((obj) => obj.roomtype_id === roomtype_id).length
      : 1;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = rooms
      ? rooms.filter(
          (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i
        )
      : [];

    const countRooms = removeDuplicates.map((e) => {
      return {
        room_name: e.roomtype_name,
        rate: e.room_amount,
        qty: getNoQuantity(e.roomtype_id),
        amount: getRoomAmount(e.roomtype_id, e.room_amount),
      };
    });

    return countRooms;
  };

  const handleVat = () => {
    const vatable_sales = billing?.total_amount / VAT_RATE;
    const vat = billing?.total_amount - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  const checkFiles = async (files) => {
    const toUpload = [];

    Array.from(files).map((file) => toUpload.push(file));

    if (toUpload.length === 0) {
      alert("error");
    } else {
      var formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
      uploadReceipt(formData);
    }
  };

  const handleSubmit = async (e) => {
    const getNewNoQuantity = (roomtype_id) => {
      return e.room_details.filter((obj) => obj.roomtype_id === roomtype_id)
        .length;
    };

    const getNewRoomAmount = (roomtype_id, rate) => {
      const roomTotalAmount = parseInt(getNewNoQuantity(roomtype_id)) * rate;

      console.log(roomTotalAmount);
      return roomTotalAmount;
    };

    const handleGetNewRooms = () => {
      const removeDuplicates = e.room_details.filter(
        (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i
      );

      const countRooms = removeDuplicates.map((e) => {
        return {
          room_name: e.roomtype_name,
          rate: e.room_amount,
          qty: getNewNoQuantity(e.roomtype_id),
          amount: getNewRoomAmount(e.roomtype_id, e.room_amount),
        };
      });

      return countRooms;
    };

    const handleNewGetNoNights = () => {
      const start = moment(e.date[0], "YYYY-MM-DD");
      const end = moment(e.date[1], "YYYY-MM-DD");
      const nights = Math.abs(moment.duration(start.diff(end)).asDays());
      return nights;
    };

    const getNewSubTotal = () => {
      let total = 0;
      handleGetNewRooms().map((e) => (total += e.amount));

      console.log(handleGetNewRooms());
      return total;
    };

    const getNewTotalAmount = () => {
      return getNewSubTotal() * handleNewGetNoNights();
    };

    const data = {
      id: jwtId._id,
      check_in: moment(e.date[0]).format("YYYY-MM-DD"),
      check_out: moment(e.date[1]).format("YYYY-MM-DD"),
      rooms: e.room_details,
      totalAmount: getNewTotalAmount(),
    };

    try {
      await apiAxios({ url: GUEST_MODIFY_BOOKING, method: "POST", data });
      enqueueSnackbar("Saved Changes!", {
        variant: "success",
      });

      //fetch booking
      getBooking();
      onClose();
    } catch (error) {
      getBooking();
      onClose();
      if (error?.data?.code === "ROOM_TAKEN") {
        enqueueSnackbar("Some of Selected Rooms Already Taken", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(error.data.message || "Something Went Wrong", {
          variant: "error",
        });
      }
    }
  };

  return (
    // <div className={classes.root}>
    <>
      <Container maxWidth="md" className={classes.root}>
        <Box sx={{ boxShadow: 3 }}>
          <Card className={classes.card}>
            <CardHeader
              title={
                <Box display="flex" justifyContent="space-between">
                  <h4>Booking Summary</h4>
                  <div
                    style={{
                      fontSize: "0.5em",
                    }}
                  >
                    <BookingStatus status={status} />
                  </div>
                </Box>
              }
            />
            <Divider variant="fullWidth" />
            <CardContent>
              <BookingSummary
                booking_details={{
                  ...guest,
                  check_in,
                  check_out,
                  no_nights: getNoNights(check_in, check_out),
                  rooms: handleGetRooms(),
                  sub_total: billing?.sub_total,
                  vat: handleVat(),
                  total_amount: billing?.total_amount,
                }}
              />
              <div>
                <h5>
                  <b>How to Pay?</b>
                </h5>
                <ul>
                  <li>
                    Kindly deposit your payment to our selected bank account or
                    Gcash
                  </li>
                  <li>
                    Upload your Bank/Gcash Receipt and wait for Email
                    confirmation
                  </li>
                </ul>
                <h5>
                  <b>Mode of Payment</b>
                </h5>
                <ul>
                  <li>Gcash - 09352335202 | Villa Gregoria Resort</li>
                  <li>BPI - 75544452 | Villa Gregoria Resort</li>
                  <li>BDO - 23564343 43112 | Villa Gregoria Resort</li>
                </ul>
                <h5>
                  <b>Cancellation & Rebooking</b>
                </h5>
                <ul>
                  <li>
                    Cancellation of booking is not allowed if the booking is
                    confirmed
                  </li>
                  <li>
                    Rebooking/Modifying of booking is not allowed if the booking
                    is confirmed
                  </li>
                  <li>No Refund</li>
                </ul>
              </div>
              <Timeline events={events} />
            </CardContent>
            <CardActions>
              {status === "PENDING" ? (
                <>
                  <LoadingButton
                    fullWidth
                    onClick={() => upload.current.click()}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    <b>Upload Receipt</b>
                  </LoadingButton>
                  {/* <Button
                fullWidth
                onClick={}
                variant="contained"
                color="success"
              >
                <b>Upload Receipt</b>
              </Button> */}
                  <input
                    style={{ display: "none" }}
                    id="fileUpload"
                    onChange={(event) => checkFiles(event.target.files)}
                    multiple
                    type="file"
                    ref={upload}
                    accept="image/*"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
                    onClick={onModifyBooking}
                  >
                    <b>Modify Booking</b>
                  </Button>
                </>
              ) : null}
            </CardActions>
          </Card>{" "}
        </Box>
      </Container>
      <Form
        initial={{
          date: [
            new Date(moment(new Date()).add(1, "days").format()),
            new Date(
              moment(new Date(moment(new Date()).add(1, "days").format()))
                .add(1, "days")
                .format()
            ),
          ],
          room_details: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ data: formData, change, hasChanged, submit, reset }) => {
          return (
            <ModifyBookingModal
              open={params.action === "onModifyBooking"}
              onClose={onClose}
              formData={formData}
              change={change}
              hasChanged={hasChanged}
              onSubmit={() => {
                submit();
                reset();
              }}
            />
          );
        }}
      </Form>
    </>

    // </div>
  );
};

export default MyBookingDetails;
