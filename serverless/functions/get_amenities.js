const Amenities = require("./../models/amenities");

exports.handler = async (event) => {
  try {
    const result = await Amenities.find();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
