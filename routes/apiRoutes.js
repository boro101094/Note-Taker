
// dependencies 
const path = require('path');
const fs = require('fs')

// uniqid -> will help to generate unique ids for the object
var uniqid = require('uniqid');


// routing
module.exports = (app) => {

  // GET /api/notes should read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // add it to the db.json file, and then return the new note to the client. 
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };
    // write new file to db.json
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


  //BONUS - Delete Notes
  // /api/notes/:id will receive the id of a note to delete.
  app.delete('/api/notes/:id', (req, res) => {
    // reading notes form db.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};