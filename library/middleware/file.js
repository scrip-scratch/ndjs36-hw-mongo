const multer = require("multer");
const path = require("path");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "bookFile") {
      cb(null, "public/books");
    } else {
      cb(null, "public/covers");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "bookFile") {
      cb(null, file.originalname.split(".")[0] + "-" + Date.now() + ".pdf");
    } else {
      cb(null, file.originalname.split(".")[0] + "-" + Date.now() + ".png");
    }
  },
});

// const fileFilter = (req, file, cb) => {
//   var extention = path.extname(file.originalname);
//   if (extention !== ".pdf") {
//     return cb(new Error("Only pdf are allowed"));
//   }
//   cb(null, true);
// };

module.exports = multer({ storage: storageConfig });
