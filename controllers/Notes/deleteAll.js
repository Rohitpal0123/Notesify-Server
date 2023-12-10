const Notes = require("../../models/notes.model");

class deleteAllNotes {
  process = async (req, res) => {
    try {
      const { userId } = req.body;

      const deletedNotes = await Notes.deleteMany({ userId: userId });
      if (!deletedNotes) throw "Notes not deleted !";

      res.status(200).json(deletedNotes);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteAllNotes();
