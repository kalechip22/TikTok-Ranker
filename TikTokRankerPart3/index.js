'use strict'
// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");

// local modules
const db = require("./sqlWrap");
const win = require("./pickWinner");


// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');

/* might be a useful function when picking random videos */
/*function getRandomInt(max) {
  let n = Math.floor(Math.random() * max);
  console.log(n);
  return n;
}*/

/* Start of code run on start-up */
// Create object to interface with express
const app = express();

// Code in this section sets up an express pipeline

// Print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})
// Make all the files in 'public' available 
app.use(express.static("public"));

// If no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/compare.html");
});

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());
//app.use(bodyParser.text());

app.get("/getTwoVideos", async function(req, res) {
  console.log("Getting Random Videos");
  try {
    const sql = "SELECT * FROM VideoTable ORDER BY RANDOM() LIMIT 2";
    let rows = await db.all(sql);
    //console.log("ROWS: ", rows);
    //console.log("JSON ROW: ", JSON.stringify(rows));
    res.json(rows);
  } catch(err) {
    res.status(400).send(err);
  }
});

app.post("/insertPref", async function (req, res) {
  try {
    let data = req.body;
    //console.log("DATA:", data, " ", data.better, data.worse);
    await insertVideo(data);
    let table = await dumpPrefTable();
    console.log("TABLE LENGTH:", table.length);
    if (table.length >= 15) {
      res.send("pick winner");
    }
    else {
      res.send("continue");
    }
  } catch(err) {
    res.status(400).send(err);
  }
});

app.get("/getWinner", async function(req, res) {
  console.log("getting winner");
  try {
  // change parameter to "false" to compute real winner based on PrefTable
  // parameter="true," uses fake preferences data and gets a random result
  // winner should contain the rowId of the winning video.
    let winner = await win.computeWinner(8,false);
    const sql = 'SELECT * from VideoTable where rowIdNum=?';
    let winnerData = await db.get(sql, [winner]);
    //console.log("WINNER: ", winner);
    //console.log("Data: ", winnerData);
    
    res.json(winnerData);
  } catch(err) {
    res.status(500).send(err);
  }
});


// Page not found
app.use(function(req, res){
  res.status(404); 
  res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

// Database Functions

// Async function to insert a video into the database
async function insertVideo(v) {
  const sql = "INSERT into PrefTable (better, worse) values (?,?)";
  await db.run(sql,[parseInt(v.better), parseInt(v.worse)]);
}

// Async function to get the whole contents of the VideoTable database 
async function dumpVideoTable() {
  const sql = "SELECT * from VideoTable";
  let result = await db.all(sql);
  return result;
}

// Async function to get the whole contents of the PrefTable database 
async function dumpPrefTable() {
  const sql = "SELECT * from PrefTable";
  let result = await db.all(sql);
  return result;
}