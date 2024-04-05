const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const validate = require("../../lib/fileValidator");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class generateSpeech {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      console.log("Hit1")
      const allowedExtensions = ["txt"];
      const allowedMIMEType = ["text/plain"];
      const allowedFileSize = 100;

      validate(req.file, allowedExtensions, allowedMIMEType, allowedFileSize);
      console.log("Hit2")
      const filePath = path.join(os.tmpdir(), req.file.originalname);
      fs.writeFileSync(filePath, req.file.buffer);

      const text = fs.readFileSync(filePath, "utf8");

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      fs.unlinkSync(filePath);
      console.log("Hit3")
      const buffer = Buffer.from(await mp3.arrayBuffer());

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", "attachment; filename=speech.mp3");
      console.log("Hit4")
      res.status(200).send(buffer);
    } catch (error) {
      console.log("🚀 ~ error:", error)
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error,
      });
    }
  };
}

module.exports = new generateSpeech();
