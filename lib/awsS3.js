const { S3Client } = require("@aws-sdk/client-s3");

// create s3 instance using S3Client
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
  name: "rohitgpal",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID, // store it in .env file to keep it safe
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  region: "ap-south-1"
});
console.log("🚀 ~ s3:", s3);

module.exports = s3;
