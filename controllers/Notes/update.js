const Notes = require("../../models/notes.model");

class updateNotes {
  process = async (req, res) => {
    try {
      const { id, notes } = req.body;

      const updatedNotes = await Notes.updateOne({ _id: id }, { notes: notes });
      if (!updatedNotes) throw "Notes not upadted !";

      res.status(200).json(updatedNotes);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new updateNotes();
