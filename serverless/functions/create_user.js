const User = require("./../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

exports.handler = async (event, ct, callback) => {
  const { username, password, first_name, last_name, email, user_type } =
    JSON.parse(event.body);

  let user = await User.findOne({ username });
  let verifyEmail = await User.findOne({ email });
  if (user)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: "Username already registered.",
      }),
    };

  if (verifyEmail)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: "Email already registered.",
      }),
    };

  try {
    user = new User({
      first_name,
      last_name,
      email,
      username,
      password,
      status: "ACT",
      user_type,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return {
      statusCode: 200,
      body: JSON.stringify(_.pick(user, ["_id", "username"])),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 404,
      body: JSON.stringify({
        success: "false",
        message: error.message,
      }),
    });
  }
};
