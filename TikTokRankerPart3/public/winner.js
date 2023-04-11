// when this page is opened, get the most recently added video and show it.
// function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");
// set up button to reload video in "tiktokDiv"
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});



// always shows the same hard-coded video.  You'll need to get the server to 
// compute the winner, by sending a 
// GET request to /getWinner,
// and send the result back in the HTTP response.

showWinningVideo();

function showWinningVideo() {
  sendGetRequest("/getWinner")
    .then(function (res) {
      console.log(res);
      let winningUrl = res.url;
      let name1 = document.getElementById("name1");
      name1.textContent = res.nickname;
      addVideo(winningUrl, divElmt);
      loadTheVideos();
    })
    .catch(function(err) {
      console.log("GET winner request error",err);
    });
}

async function sendGetRequest(url) {
  params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
     };
  
  let response = await fetch(url, params);
  if (response.ok) {
    let data = await response.json();
    console.log("RECEIVED: ", data);
    return data;
  } else {
    console.log("ERROR");
    throw Error(response.status);
  }
}