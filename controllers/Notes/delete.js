const Notes = require("../../models/notes.model");

class deleteNotes {
  process = async (req, res) => {
    try {
      const { id } = req.body;

      const deletedNotes = await Notes.deleteOne({ _id: id });
      if (!deletedNotes) throw "Notes not deleted !";

      res.status(200).json(deletedNotes);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteNotes();
