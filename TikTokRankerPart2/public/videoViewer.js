// This viewer takes a TikTok video URL and displays it in a nice magenta box, and gives it a reload button in case you want to watch it again. 

// for example, these are hardcoded
const example = 'https://www.tiktok.com/@cheyennebaker1/video/7088856562982423854';
//TRY TO DO THE NON CONST VERSION OF EXAMPLE TO SHOW LINK FROM DB
// let example = db.getTrue().url;

let myVidButton = document.getElementById("continue");
myVidButton.addEventListener("click",buttonPress);

// grab elements we'll use 
// these are global! 
let reloadButton = document.getElementById("reload");
let divElmt = document.getElementById("tiktokDiv");

// set up button
reloadButton.addEventListener("click",reloadVideo);

// add the blockquote element that TikTok wants to load the video into
// on start-up, load the videos
sendGetRequest() 
  .then(function (res) {
    console.log("GET request works");
  })
  .catch(function(err) {
    console.log("GET request error",err);
  });


async function sendGetRequest() {
  params = {
    method: 'GET', 
    headers: {'Content-Type': 'application/json'}
  };


  let response = await fetch("/getMostRecent");
  let link = await response.json();
  let divElmt = document.getElementById("tiktokDiv");
  globalThis.url = link.url;
  addVideo(link.url,divElmt);
  loadTheVideos();
  let nickname = document.getElementById("tiktok_name");
  let name = link.nickname;
  nickname.textContent = name;
}

// Add the blockquote element that tiktok will load the video into
async function addVideo(tiktokurl,divElmt) {

  let videoNumber = tiktokurl.split("video/")[1];

  let block = document.createElement('blockquote');
  block.className = "tiktok-embed";
  block.cite = tiktokurl;
  // have to be formal for attribute with dashes
  block.setAttribute("data-video-id",videoNumber);
  block.style = "width: 325px; height: 563px;"

  let section = document.createElement('section');
  block.appendChild(section);
  
  divElmt.appendChild(block);
}

// Ye olde JSONP trick; to run the script, attach it to the body
function loadTheVideos() {
  body = document.body;
  script = newTikTokScript();
  body.appendChild(script);
}

// makes a script node which loads the TikTok embed script
function newTikTokScript() {
  let script = document.createElement("script");
  script.src = "https://www.tiktok.com/embed.js"
  script.id = "tiktokScript"
  return script;
}

// the reload button; takes out the blockquote and the scripts, and puts it all back in again.
// the browser thinks it's a new video and reloads it
function reloadVideo () {
  
  // get the two blockquotes
  let blockquotes 
 = document.getElementsByClassName("tiktok-embed");

  // and remove the indicated one
    block = blockquotes[0];
    console.log("block",block);
    let parent = block.parentNode;
    parent.removeChild(block);

  // remove both the script we put in and the
  // one tiktok adds in
  let script1 = document.getElementById("tiktokScript");
  let script2 = script.nextElementSibling;

  let body = document.body; 
  body.removeChild(script1);
  body.removeChild(script2);
  addVideo(url,divElmt);
  loadTheVideos();
}



function buttonPress() {

  window.location = "myVideos.html";

}