// index.js
// This is our main server file

// Include express
const express = require("express");

// Create object to interface with express
// and creates an instance of a server
const app = express();

// Allows it to read the text sent in
const bodyParser = require('body-parser');
app.use(bodyParser.text());

// Code in this section sets up an express pipeline
// Print info about incoming HTTP request for debugging
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

// Make all the files in 'public' available 
app.use(express.static("public"));

// If no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// Server recieves and responds to POST requests
app.post('/videoData', function(req, res, next) {
  console.log("Server recieved a post request at", req.url);
  let text = req.body;
  console.log("Sending:", text);
  res.send(text);
});

// Need to add response if page not found!
app.use(function(req, res) {
  res.status(404); res.type('txt');
  res.send('404 - File ' + req.url + ' not found');
});
// End of pipeline specification

// Now listen for HTTP requests
// It's an event listener on the server!
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});