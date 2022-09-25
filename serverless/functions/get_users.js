const User = require("./../models/user");
const _ = require("lodash");

exports.handler = async (event, ct, callback) => {
  try {
    const result = await User.find();

    const parseResult = result.map((obj) => {
      return _.pick(
        obj,
        "_id",
        "first_name",
        "last_name",
        "username",
        "status",
        "createdAt"
      );
    });
    return {
      statusCode: 200,
      body: JSON.stringify(parseResult),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        success: "false",
        message: error.message,
      }),
    });
  }
};
