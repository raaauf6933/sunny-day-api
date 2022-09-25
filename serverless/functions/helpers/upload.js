const multer = require("multer");

const excelFilter = (file, cb) => {
  if (
    file.mimetype.includes("image/png") ||
    file.mimetype.includes("image/jpeg")
  ) {
    cb(null, true);
  } else {
    cb(new Error(file));
  }
};

const storage = multer.diskStorage({
  //   destination: function (file, callback) {
  //     callback(null, __dirname + "\\upload");
  //   },
  filename: function (file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: excelFilter,
  limits: {
    fileSize: 1000000 * 10, //10mb
  },
}).any("file");
