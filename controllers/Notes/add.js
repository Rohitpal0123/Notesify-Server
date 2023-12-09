const Notes = require("../../models/notes.model");

class addNotes {
  async notesExists(userId, title) {
    try {
      const notesExists = await Notes.findOne({ userId: userId, title: title });
      if (notesExists != null) throw "Notes with given title already exists !";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const { userId, title, description, notes } = req.body;
      await this.notesExists(userId, title);
      const newNotes = await Notes.create({
        userId,
        title,
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
