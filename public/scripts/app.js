//funtion to hit api for getting notes json
function getNotes() {
  $.ajax({
    type: "GET",
    url: "/api/notes",
    success: function(res) {
      alert(res);
      data = JSON.parse(res);
      alert(data.firstObject);
    }
  });
}

getNotes();

/*/function to add new note
//funcion takes an object comprising of notes and id
function saveNote(data) {
  var noteId = data.id;
  var noteNotes = data.notes;

  $.ajax({
    type: "POST",
    url: "/api/notes",
    data: `id=${noteId}&note=${noteNotes}`,
    success: function(res) {
      alert("Note Saved Successfully!");
      alert(res);
    }
  });
}*/

//function to add new note
//funcion takes just a string of note text to be save in the db.json
function saveNote(noteText) {
  $.ajax({
    type: "POST",
    url: "/api/notes",
    data: { note: noteText },
    success: function(res) {
      alert("Note Saved Successfully!");
      alert(res);
    }
  });
}
//saveNote("This is another note");

//function to delete notes
function deleteNote(id) {
  $.ajax({
    type: "DELETE",
    url: `/api/notes/${id}`,
    success: function(res) {
      alert("note deleted successfully");
      alert(res);
    }
  });
}

deleteNote("firstObject");
