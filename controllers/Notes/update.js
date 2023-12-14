const Notes = require("../../models/notes.model");
const validate = require("../../lib/validator");
const updateNotesSchema = require("../../jsonschema/Notes/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class updateNotes {
  process = async (req, res) => {
    try {
      validate(req.body, updateNotesSchema);
      const { id, notes } = req.body;

      const updatedNotes = await Notes.updateOne({ _id: id }, { notes: notes });
      if (!updatedNotes) throw "Notes not upadted !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: updatedNotes
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new updateNotes();
