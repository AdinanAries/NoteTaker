const express = require("express");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const app = express();

var Notes;
fs.readFile("./db/db.json", "utf8", function(err, contents) {
  Notes = JSON.parse(contents);
});

//route for getting notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//middleware parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route to get my css file
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/assets/css", "styles.css"));
});

//route for getting my js file
app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/assets/js", "index.js"));
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
//This endpoint to take just notes as string and generate the note ID using a third party library
app.post("/api/notes", (req, res) => {
  var newId = uuid.v4();
  var newTitle = req.body.title;
  var newNote = req.body.text;

  const newObj = {
    id: newId,
    title: newTitle,
    text: newNote
  };
  //adding new note to Notes
  Notes.push(newObj);
  let newJson = JSON.stringify(Notes);

  fs.writeFile("./db/db.json", newJson, function(err) {
    if (err) throw err;
    console.log(`${JSON.stringify(newObj)} had been added to db.json`);
    //reset Notes to newly created object
    fs.readFile("./db/db.json", "utf8", function(err, contents) {
      Notes = JSON.parse(contents);
    });
  });

  res.json(Notes);
});

//API route to delet note
app.delete("/api/notes/:id", (req, res) => {
  Notes = Notes.filter(el => el.id !== req.params.id);

  let newJson = JSON.stringify(Notes);

  fs.writeFile("./db/db.json", newJson, function(err) {
    if (err) throw err;
    //reset Notes to newly created object
    fs.readFile("./db/db.json", "utf8", function(err, contents) {
      Notes = JSON.parse(contents);
    });
  });

  res.json(Notes);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("node server ready on port:" + PORT);
});
