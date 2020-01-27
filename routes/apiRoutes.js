
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