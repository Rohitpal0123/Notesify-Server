const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
// const validate = require("../../lib/fileValidator");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({ region: "ap-south-1" }); // replace with your region
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const url = require("url");

class generateTranscript {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      // function vadapao() {
      // const allowedExtensions = [
      //   "mp3",
      //   "mp4",
      //   "mpeg",
      //   "mpga",
      //   "m4a",
      //   "wav",
      //   "webm"
      // ];

      // const allowedMIMEType = [
      //   "audio/mp3",
      //   "audio/mp4",
      //   "audio/mpeg",
      //   "audio/mpga",
      //   "audio/m4a",
      //   "audio/wav",
      //   "audio/webm"
      // ];

      // const allowedFileSize = 25;

      // validate(req.file, allowedExtensions, allowedMIMEType, allowedFileSize);

      // Write the file to disk

      // const filePath = path.join(os.tmpdir(), req.file.originalname); // Modify this line
      // Assuming req.file.location contains the URL of the uploaded file
      // }

      // Write the file data to disk

      const fileUrl = new URL(req.file.location);
      const bucket = fileUrl.hostname.split(".")[0];
      const key = decodeURIComponent(fileUrl.pathname.slice(1));
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      const data = await s3.send(command);

      const filePath = path.join(os.tmpdir(), req.file.originalname);
      fs.writeFileSync(filePath, data.Body);

      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      });

      // Delete the file after processing
      fs.unlinkSync(filePath);

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: transcription
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new generateTranscript();
