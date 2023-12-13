const Notes = require("../../models/notes.model");
const validate = require("../../lib/validator");
const deleteNotesSchema = require("../../jsonschema/Notes/delete");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class deleteNotes {
  process = async (req, res) => {
    try {
      validate(req.body, deleteNotesSchema);
      const { id } = req.body;

      const deletedNotes = await Notes.deleteOne({ _id: id });
      if (!deletedNotes) throw "Notes not deleted !";

      res.status(200).json(deletedNotes);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteNotes();
