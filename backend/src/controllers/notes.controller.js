const notesController = {};

const NoteModel = require("../models/Note");

notesController.getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.json(notes);
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

notesController.createNote = async (req, res) => {
  try {
    const { title, content, date, author } = req.body;
    const newNote = new NoteModel({ title, content, date, author });
    const creation = await newNote.save();
    res.json({ message: "Nota guardada" });
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

notesController.getNoteById = async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

notesController.updateNote = async (req, res) => {
  try {
    const { title, content, date, author } = req.body;
    await NoteModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        content,
        author,
        date,
      }
    );
    res.json({ message: "Nota actualizada" });
  } catch (error) {
    console.log("-----------------------------------\n", error);
    res.status(500).end();
  }
};

notesController.deleteNote = async (req, res) => {
  try {
    const note = await NoteModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

module.exports = notesController;
