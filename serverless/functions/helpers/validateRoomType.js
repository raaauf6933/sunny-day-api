const { find } = require("lodash");
const RoomTypes = require("./../../models/rooms");

module.exports = async (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await RoomTypes.findOne({
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
