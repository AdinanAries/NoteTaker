//funtion to hit api for getting notes json
function getNotes() {
  $.ajax({
    type: "GET",
    url: "http://localhost:5000/api/notes",
    success: function(res) {
      console.log(res);
      alert(res);
      //parsing json response for individual data parts collection
      const data = JSON.parse(res);
      alert(data);
    }
  });
}

getNotes();

//function to add new note
//funcion takes an object comprising of notes and id
function saveNote(data) {
  var noteId = data.id;
  var noteNotes = data.notes;

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/api/notes",
    data: `id=${noteId}&note=${noteNotes}`,
    success: function(res) {
      alert("Note Saved Successfully!");
      alert(res);
    }
  });
}

//function to add new note
//funcion takes just a string of note text to be save in the db.json
function saveNote(note) {
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/api/notes",
    data: `note=${note}`,
    success: function(res) {
      alert("Note Saved Successfully!");
      alert(res);
    }
  });
}
