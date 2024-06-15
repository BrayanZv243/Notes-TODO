// Express js, endpoints
const express = require("express");
const app = express();

// Controllers
const NoteController = require("../Controllers/NoteController");

app.post("/note", NoteController.createNote);
app.get("/note", NoteController.getAllNotes);
app.put("/note/:id", NoteController.updateNote);
app.delete("/note/:id", NoteController.deleteNote);

module.exports = app;
