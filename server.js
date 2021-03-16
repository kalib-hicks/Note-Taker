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

// HTML routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});