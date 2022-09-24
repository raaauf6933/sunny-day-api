const User = require("./../models/user");
const { generateAuthToken } = require("./utils/misc");
const sendResetEmail = require("./utils/sendResetEmail");

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  const user = await User.findOne({ email });
  if (!user)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        code: "USER_NO_FOUND",
        message: "user with given email doesn't exist",
      }),
    };

  const token = generateAuthToken({
    _id: user._id,
    username: user.username,
    email: email,
    first_name: user.first_name,
    last_name: user.last_name,
  });

  try {
    sendResetEmail("RESET_PASSWORD", {
      email,
      user,
      token,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", email }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: error.message,
      }),
    };
  }
};
