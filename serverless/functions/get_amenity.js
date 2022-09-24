const Amenities = require("./../models/amenities");

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  try {
    const result = await Amenities.findById(id);

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
