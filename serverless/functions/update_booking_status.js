const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const auth = require("./middleware/auth");
const { IsJsonString } = require("./utils/misc");
const { bookingStatus, bookingType } = require("./utils/enums");
const {
  updatePending,
  updateConfirmed,
  updateCheckIn,
  cancelBooking,
} = require("./helpers/bookings/updateBookingStatus");

const UpdateBookingStatus = async (event, context, callback) => {
  const { body, user } = event;
  const { id, status, paymentAmount, check_in, check_out } = body;

  const user_name = `${user.first_name} ${user.last_name}`;

  try {
    let result;
    switch (status) {
      case bookingStatus.PENDING:
        result = await updatePending({ id, status, paymentAmount, user_name });
        break;
      case bookingStatus.CONFIRMED:
        result = await updateConfirmed({
          id,
          status,
          paymentAmount,
          user_name,
          check_in,
          check_out,
        });
        break;
      case bookingStatus.CHECK_IN:
        result = await updateCheckIn({
          id,
          status,
          paymentAmount,
          user_name,
          check_in,
          check_out,
        });
        break;
      case bookingStatus.CANCELLED:
        result = await cancelBooking({ id, status, user_name });
        break;
      default:
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (IsJsonString(error.message)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: "failed",
          ...JSON.parse(error.message),
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: "failed", message: error.message }),
      };
    }
  }
};

const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: auth,
  };
};

exports.handler = middy(UpdateBookingStatus)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
