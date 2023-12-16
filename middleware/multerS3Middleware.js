const multerS3 = require("multer-s3");
const s3 = require("../lib/awsS3");

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: "notesify-textandaudio", // storage access type
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  }
});
console.log("🚀 ~ s3Storage:", s3Storage);
console.log("Access Key ID:", process.env.ACCESS_KEY_ID);
console.log("Secret Access Key:", process.env.SECRET_ACCESS_KEY);

module.exports = s3Storage;
