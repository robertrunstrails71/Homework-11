let db = require("../db/db.json");
const fs = require('fs');

function reindexDB(dbArray){
  let newDB = [];
  for (let i = 0; i < dbArray.length; i++) {
    let reIndexedNote = dbArray[i];
    reIndexedNote.id = i + 1;
    newDB[i] = reIndexedNote;
  }
  return newDB;
}

function writeDB(dbArray){
  fs.writeFile('./db/db.json', JSON.stringify(dbArray), function (err) {
    if (err) throw err;
  });
}

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
    res.json(db);
  });

    app.post("/api/notes", function(req, res) {
        const newNote = req.body;
        db.push(newNote);
        db = reindexDB(db);
        writeDB(db);
        res.json(newNote);
  });

  
  app.delete("/api/notes/:id", function(req, res) {
        const deletedNoteID = req.params.id;
        const deletedNote = db.splice(deletedNoteID-1, 1);
        db = reindexDB(db);
        writeDB(db);
        res.json(deletedNote);
  });
};