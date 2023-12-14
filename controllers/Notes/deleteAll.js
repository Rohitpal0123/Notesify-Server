const Notes = require("../../models/notes.model");
const validate = require("../../lib/jsonValidator");
const deleteAllNotesSchema = require("../../jsonschema/Notes/deleteAll");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class deleteAllNotes {
  process = async (req, res) => {
    try {
      validate(req.body, deleteAllNotesSchema);
      const { userId } = req.body;

      const deletedNotes = await Notes.deleteMany({ userId: userId });
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

module.exports = new deleteAllNotes();
