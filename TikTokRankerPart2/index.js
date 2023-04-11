// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");

// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');

// get Promise-based interface to sqlite3
// this also sets up the database
const db = require('./sqlWrap');


// create object to interface with express
const app = express();

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  console.log("body contains",req.body);
  next();
});

app.use(express.json());
app.use(bodyParser.text());


// make all the files in 'public' available 
app.use(express.static("public"));

app.get("/getLength", async function (req, res) {
  let result = await dumpTable();
  let n = result.length;
  if (n >= 8) {
    res.send("database full");
  }
  else {
    res.send("not full");
  }
});

app.get("/getMostRecent", async function (req, res) {
  const sql = 'select * from VideoTable where flag = TRUE';
  let result = await db.get(sql);
  console.log("Most Recent Video: ", result); 
  res.json(result);
});

app.get("/getList", async function (req, res) {
  let result = await dumpTable();
  console.log("List: ", result); 
  res.json(result);
});

// If no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/myVideos.html");
});


//db.deleteEverything();
app.post("/deleteVideo", async function (req, res) {
  let text = req.body;
  const sql = "delete from VideoTable where nickname=?";
  await db.run(sql, [text]);
  res.send("Deletion Sucess");
});

app.post("/videoData", async function (req, res) {
  await dumpTable()
    .then(function(result) {
      //console.log(result);
      let n = result.length;
      console.log(n + " items in the database");
      if (n < 8) {
        if (n >= 1) {
          setFalse()
            .catch(function(err) { console.log("Set false error",err)} );
        }
        insertVideo(req.body)
          .then(function() {
            res.send('recieved POST');
          })
          .catch(function(err) {
            console.log("Insert video error",err)} );
      }
      else {
        res.send("database full");
      }})
    .catch(function(err) {
        console.log("SQL error",err)} );
});

app.post("/addingNew", (req, res) => {
  console.log("sending Response to go home")
  return res.send('recieved POST'); 
})


// Need to add response if page not found!
app.use(function(req, res){
  res.status(404); res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});


// ******************************************** //
// Define async functions to perform the database 
// operations we need

// An async function to insert a video into the database
async function insertVideo(v) {
  const sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";
  await db.run(sql,[v.url, v.nickname, v.userid]);
}

// Async function to get most recent video's database row 
async function setFalse() {
  const sql = 'update VideoTable set flag = FALSE where flag = TRUE';
  await db.run(sql);
}

async function getRecent(id) {
  // warning! You can only use ? to replace table data, not table name or column name.
  const sql = 'select * from VideoTable where row.id=?';
  let result = await db.get(sql, [id]);
  return result;
}

// an async function to get a video's database row by its nickname
async function getVideo(nickname) {
  // warning! You can only use ? to replace table data, not table name or column name.
  const sql = 'select * from VideoTable where nickname = ?';

  let result = await db.get(sql, [nickname]);
  return result;
}

// an async function to get the whole contents of the database 
async function dumpTable() {
  const sql = "select * from VideoTable"
  let result = await db.all(sql)
  return result;
}