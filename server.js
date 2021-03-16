// set variables
var fs = require('fs');
var express = require("path");
var path = require("path");

//express
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// HTML GET routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes/html"));
});

//HTML POST routes
app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if(error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        var id = notes[notes.length - 1].id + 1
        var newNote = {title: req.body.title, text: req.body.text, id: id }
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

//GET routes from json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
        console.log("Notes", data)
        res.json(JSON.parse(data))
    })
});
