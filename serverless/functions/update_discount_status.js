const Discounts = require("./../models/discounts");

exports.handler = async (event) => {
  const { id, status } = JSON.parse(event.body);

  try {
    const result = await Discounts.findByIdAndUpdate(id, {
      status,
    });

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
