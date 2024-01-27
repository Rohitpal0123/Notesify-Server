const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "https://sahil1gupta.github.io", // replace with your client's origin
  }),
);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const transcriptRouter = require("./routes/transcript");
const translateRouter = require("./routes/translate");
const speechRouter = require("./routes/speech");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/transcript", transcriptRouter);
app.use("/translate", translateRouter);
app.use("/speech", speechRouter);
app.use("/notes", notesRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/", (req, res) => {
  res.send("Welcome to Notesify !");
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
