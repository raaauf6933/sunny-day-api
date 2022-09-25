const User = require("./../models/user");

exports.handler = async (event, ct, callback) => {
  const body = { ...JSON.parse(event.body) };
  try {
    const result = await User.findById(body.id);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    // not found
    if (error.kind === "ObjectId") {
      return callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      });
    } else {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      });
    }
  }
};
