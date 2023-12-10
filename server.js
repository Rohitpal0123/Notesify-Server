const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const transcriptRouter = require("./routes/transcript");
const translateRouter = require("./routes/translate");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/user");

app.use("/transcript", transcriptRouter);
app.use("/translate", translateRouter);
app.use("/notes", notesRouter);
app.use("/user", userRouter);
app.use("/", (req, res) => {
  res.send("Welcome to Notesify !");
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
