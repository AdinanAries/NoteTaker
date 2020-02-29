const express = require("express");
const path = require("path");
const app = express();

const fs = require("fs");

var Notes;
fs.readFile("./notes/db.json", "utf8", function(err, contents) {
  Notes = JSON.parse(contents);
});

//route for getting notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//route for getting index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//API route for getting notes
app.get("/api/notes", (req, res) => {
  res.json(Notes);
});

//API route for adding notes
app.post("/api/notes", (req, res) => {
  var newNote = req.body();
});

//API route to delet note
app.delete("/api/notes/:id", (req, res) => {});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("node server ready on port:" + PORT);
});
