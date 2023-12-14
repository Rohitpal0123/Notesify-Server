const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");
const validate = require("../../lib/fileValidator");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class generateTranscript {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const allowedExtensions = [
        "mp3",
        "mp4",
        "mpeg",
        "mpga",
        "m4a",
        "wav",
        "webm"
      ];

      const allowedMIMEType = [
        "audio/mp3",
        "audio/mp4",
        "audio/mpeg",
        "audio/mpga",
        "audio/m4a",
        "audio/wav",
        "audio/webm"
      ];

      const allowedFileSize = 25;

      validate(req.file, allowedExtensions, allowedMIMEType, allowedFileSize);

      // Write the file to disk
      const filePath = path.join(os.tmpdir(), req.file.originalname); // Modify this line
      fs.writeFileSync(filePath, req.file.buffer);

      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      });

      // Delete the file after processing
      fs.unlinkSync(filePath);

      res.status(200).json({ notes: transcription.text });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new generateTranscript();
