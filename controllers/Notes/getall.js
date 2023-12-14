const Notes = require("../../models/notes.model");
const validate = require("../../lib/jsonValidator");
const getAllNotesSchema = require("../../jsonschema/Notes/getall");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class getAllNotes {
  process = async (req, res) => {
    try {
      validate(req.body, getAllNotesSchema);
      const { userId } = req.body;

      const notes = await Notes.find({ userId: userId });
      if (!notes) throw "Notes not found !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: notes
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new getAllNotes();
