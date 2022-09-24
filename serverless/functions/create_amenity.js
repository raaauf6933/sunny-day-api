const validateAmenity = require("./utils/validateAmenity");
const Amenities = require("./../models/amenities");

exports.handler = async (event) => {
  const { name, rate } = JSON.parse(event.body);

  try {
    await validateAmenity(name);

    let amenity = new Amenities({
      name,
      rate,
      status: "ACT",
    });

    const result = await amenity.save();
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
