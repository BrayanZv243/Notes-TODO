const express = require("express");
const app = express();

app.use(require("./NoteRouter"));

module.exports = app;
