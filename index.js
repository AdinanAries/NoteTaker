const express = require("express");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const app = express();

var Notes;
fs.readFile("./notes/db.json", "utf8", function(err, contents) {
  Notes = JSON.parse(contents);
  console.log(Notes);
  //console.log(JSON.stringify(Notes));
});

//route for getting notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//middleware parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//adding static assets
app.use(express.static(path.join(__dirname, "staticAssets")));

//route to get my css file
app.get("/styles/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/styles", "style.css"));
});

//route for getting my js file
app.get("/scripts/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/scripts", "app.js"));
});

//route for getting index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//API route for getting notes
app.get("/api/notes", (req, res) => {
  res.json(JSON.stringify(Notes));
});

//API route for adding notes
//This endpoint to take just notes as string and generate the note ID using a third party library
app.post("/api/notes", (req, res) => {
  const newNoteID = uuid.v4(); //new id for newly added note
  var newNoteText = req.body.note; // actual note content from ajax post request
  console.log(newNoteID);
  console.log(newNoteText);
  //adding new note to Notes
  Notes[newNoteID] = newNoteText;
  res.json(JSON.stringify(Notes));
  //write code that updates or replaces existing db.json on the file system
});

//API route to delet note
app.delete("/api/notes/:id", (req, res) => {
  //checking is this note exists
  NoteID = req.params.id;
  //checking is provided id exist for Notes Object
  const found = Notes.hasOwnProperty(NoteID);

  if (found) {
    delete Notes[NoteID];
    res.json(JSON.stringify(Notes));
    //write code that replaces or updates existing db.json file
  } else {
    res.status(400).json({ msg: "There isn't any note with provided id" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("node server ready on port:" + PORT);
});
