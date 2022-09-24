const Amenities = require("./../models/amenities");

exports.handler = async (event) => {
  const { id, name, rate, status } = JSON.parse(event.body);

  try {
    const result = await Amenities.findByIdAndUpdate(id, {
      rate,
      status,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    };
  }
};
