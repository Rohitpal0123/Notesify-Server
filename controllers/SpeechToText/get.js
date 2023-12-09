const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class getTranscript {
  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
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
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getTranscript();
