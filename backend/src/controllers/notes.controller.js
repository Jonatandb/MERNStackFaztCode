const notesController = {};

notesController.getNotes = (req, res) =>
  res.json([
    { id: -1, note: "Jonatandb" },
    { id: -2, note: "Jonatandb -2" },
  ]);

notesController.createNote = (req, res) => res.json({ message: "Nota creada" });

notesController.getNoteById = (req, res) =>
  res.json({ id: -1, note: "Jonatandb" });

notesController.updateNote = (req, res) =>
  res.json({ message: "Nota actualizada" });

notesController.deleteNote = (req, res) =>
  res.json({ message: "Nota eliminada" });

module.exports = notesController;
