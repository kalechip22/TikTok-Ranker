/* Enables strict mode*/
'use strict';

/* Sends post request */
async function sendPostRequest(url,data) {
  console.log("About to send POST request");
  console.log("DATA: ", data);
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data });
  if (response.ok) {
    console.log("Got POST request");
    let data = await response.text();
    return data;
  }
  else {
    throw Error(response.status);
  }
}


/* Checks if contiue button is clicked */
let cont = document.getElementById("continue");
cont.addEventListener("click", buttonAction);

/* Runs function when button is clicked */
function buttonAction() {
  let username = document.getElementById("username").value;
  let url = document.getElementById("tiktok_url").value;
  let nickname = document.getElementById("nickname").value; 
  let videoData = username + url + nickname;
  
  /*console.log("Username:", username);
  console.log("URL:", url);
  console.log("Nickname:", nickname); 
  console.log("Video Data:", videoData);*/
  console.log(videoData);
  
  sendPostRequest('/videoData', videoData)
    .then(function(data) {
      sessionStorage.setItem("name", nickname);
      window.location = "continue.html";  })
    .catch(function(error) {
      console.log("Error occurred:", error)});
}