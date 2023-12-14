const Notes = require("../../models/notes.model");
const validate = require("../../lib/jsonValidator");
const getNotesSchema = require("../../jsonschema/Notes/get");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class getNotes {
  process = async (req, res) => {
    try {
      validate(req.body, getNotesSchema);
      const { userId, title } = req.body;

      const notes = await Notes.find({ userId: userId, title: title });
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

module.exports = new getNotes();
