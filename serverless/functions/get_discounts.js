const Discounts = require("./../models/discounts");

exports.handler = async (event) => {
  try {
    const result = await Discounts.find();
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
