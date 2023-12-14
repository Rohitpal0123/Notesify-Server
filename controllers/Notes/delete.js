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

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: deletedNotes
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new deleteNotes();
