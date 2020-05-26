const { Router } = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/Notes.controller");

const router = Router();

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
