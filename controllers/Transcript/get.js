const OpenAI = require("openai");
const fs = require("fs");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class getTranscript {
  process = async (req, res) => {
    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("./uploads/audio.mp3"),
        model: "whisper-1"
      });

      res.status(200).json(transcription);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getTranscript();
