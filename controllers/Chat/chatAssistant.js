const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const os = require("os");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const validate = require("../../lib/fileValidator");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class chatAssistant {
  process = async (req, res) => {
    try {
      const { behavior, prompt } = req.body;
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a helpful notes making assistant for Notesify a web app made to create and edit notes through audio and visuals and generate codes if necessary. Your behavior is suppose to be ${behavior}`
          },
          { role: "user", content: prompt }
        ],
        model: "gpt-3.5-turbo-1106"
      });
      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: completion.choices[0].message.content
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new chatAssistant();
