const ContentSettings = require("./../models/content_settings");

exports.handler = async (event) => {
  try {
    const result = await ContentSettings.find();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
      },
      body: JSON.stringify(result[0].toJSON()),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
