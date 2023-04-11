let button = document.getElementById("continue");
button.addEventListener("click",buttonPress);

let myVidButton = document.getElementById("myVideoButton");
myVidButton.addEventListener("click",myVidButtonPress);

// given function that sends a post request
async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };
  

  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}




function buttonPress() { 
  // Get all the user info.
  let username = document.getElementById("user").value;
  let URL = document.getElementById("URL").value;
  let nickname = document.getElementById("nickname").value;

  const data = {
    userid: username,
    url: URL,
    nickname: nickname, 
  }

  sendPostRequest("/videoData", data)
  .then( function (response) {

     if (response == "database full") {
       alert("THE DATABASE IS FULL");
       document.myVideos.getElementById("continue").disabled = true;
       document.myVideos.getElementById("continue").style.opacity = "0.2";
    }
    else {
      window.location = "videoViewer.html";
    }
  })
  .catch( function(err) {
    console.log("POST request error",err);
  });
}

/* If the database does not exist, the example creates a new empty database. It has columns for the content manager's userid, the video URL, the video nickname, and a Boolean field, called the Flag, which is "TRUE" for the most-recently-added video and "FALSE" otherwise. */

function myVidButtonPress() {
  window.location = "myVideos.html";
}

