const Amenities = require("./../../models/amenities");

module.exports = async (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Amenities.findOne({
        name: new RegExp(`^${name}$`, "i"),
        status: { $in: ["ACT", "DEACT"] },
      });

      if (result) {
        reject({ message: "Item Already Exists!" });
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
