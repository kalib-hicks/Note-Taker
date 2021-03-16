//setting variables
var express = require("express");
var path = require("path");
var fs = require("fs")

// express setup
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  
  });
  
  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      var id = notes[notes.length - 1].id + 1
      var newNote = { title: req.body.title, text: req.body.text, id: id }
      var activeNote = notes.concat(newNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(activeNote)
        res.json(activeNote);
      })
    })
  });

  //delete notes
  app.delete("/api/notes/:id", function (req, res) {
      const noteId = JSON.parse(req.params.id)
      console.log(noteId)
      fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
          if (error) {
              return console.log(error)
          }
          notes = JSON.parse(notes)

          fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
              if (error) {
                  return error
              }
              res.json(notes)
          })
      })
  })


  // GET route json
  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      console.log("Notes", data)
      res.json(JSON.parse(data))
    })
  });
  
  
  // server running
  app.listen(PORT, function () {
    console.log("Server running" + PORT);
  });
  