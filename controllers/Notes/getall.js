const Notes = require("../../models/notes.model");

class getAllNotes {
  process = async (req, res) => {
    try {
      const { userId } = req.body;

      const notes = await Notes.find({ userId: userId });
      if (!notes) throw "Notes not found !";

      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllNotes();
