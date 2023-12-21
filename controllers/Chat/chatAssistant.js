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
      let chat = "";
      const { behavior, prompt } = req.body;
      const completion = await openai.chat.completions.create(
        {
          messages: [
            {
              role: "system",
              content: `You are a helpful notes making assistant for Notesify a web app made to create and edit notes through audio and visuals and generate codes if necessary. Your behavior is suppose to be ${behavior}`
            },
            { role: "user", content: prompt }
          ],
          model: "gpt-3.5-turbo",
          temperature: 0,
          stream: true
        },
        { responseType: "stream" }
      );
      // for await (const part of completion) {
      //   console.log(part);
      // }
      // res.json(completion);
      completion.then((resp) => {
        resp.data.on("data", (chunk) => {
          const payloads = chunk.toString().split("\n\n");
          for (const payload of payloads) {
            if (payload.includes("[DONE]")) {
              res.end();
              return;
            }
            if (payload.startsWith("data:")) {
              const data = JSON.parse(payload.replace("data: ", ""));
              try {
                const text = data.choices[0].delta?.content;
                if (text) {
                  console.log(text);
                  res.write(`${text}`);
                }
              } catch (error) {
                console.log(`Error with JSON.parse and ${payload}.\n${error}`);
              }
            }
          }
        });
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

module.exports = new chatAssistant();
