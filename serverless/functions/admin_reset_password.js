const bcrypt = require("bcrypt");
const User = require("./../models/user");

exports.handler = async (event) => {
  const { id, password } = JSON.parse(event.body);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  try {
    const result = await User.findByIdAndUpdate(
      id,
      {
        password: newPassword,
      },
      {
        new: true,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
