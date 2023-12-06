const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
