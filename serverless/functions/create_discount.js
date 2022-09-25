const Discounts = require("./../models/discounts");
const validateDiscount = require("./helpers/discount/validateDiscount");

exports.handler = async (event, ct, callback) => {
  const { name, type, discount_rate } = JSON.parse(event.body);

  try {
    await validateDiscount(name);

    let discount = new Discounts({
      name,
      type,
      discount_rate,
      status: "ACT",
    });

    const result = await discount.save();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    });
  }
};
