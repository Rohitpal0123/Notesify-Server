const OpenAI = require("openai");
const fs = require("fs");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class getTranscript {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const filePath = req.file.path;
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      });

      res.status(200).json(transcription.text);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getTranscript();
