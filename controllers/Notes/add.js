const Notes = require("../../models/notes.model");

class addNotes {
  process = async (req, res) => {
    try {
      const { name, description, notes } = req.body;
      const newNotes = await Notes.create({
        name,
        description,
        notes
      });

      if (!newNotes) throw "Notes not added !";

      res.status(400).json(newNotes);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new addNotes();
