/* eslint-disable no-throw-literal */
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("./utils/misc");

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  let user = await User.findOne({ username });
  if (!user)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: "Invalid email or password.",
      }),
    };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: "Invalid email or password.",
      }),
    };

  const token = generateAuthToken({
    _id: user._id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    user_type: user.user_type,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "success", token }),
  };
};
