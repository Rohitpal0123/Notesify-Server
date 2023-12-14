const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class translateAudio {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      // Write the file to disk
      const filePath = path.join(os.tmpdir(), req.file.originalname); // Modify this line
      fs.writeFileSync(filePath, req.file.buffer);

      const translation = await openai.audio.translations.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      });

      // Delete the file after processing
      fs.unlinkSync(filePath);

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: translation
      });
    } catch (error) {
      res.status(400).json({
        type: RESPONSE_MESSAGE.FAILED,
        data: error
      });
    }
  };
}

module.exports = new translateAudio();
