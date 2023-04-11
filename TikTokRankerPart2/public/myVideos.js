let button = document.getElementById("addNew");
button.addEventListener("click", buttonPress);


// CHANGE TO DELETEVID INSTEAD OF BUTTONPRESS IDK HOW TO DELETE THO
let vid1 = document.getElementById("video1");
vid1.addEventListener("click",
  deleteVidButton1);
let vid2 = document.getElementById("video2");
vid2.addEventListener("click", deleteVidButton2);
let vid3 = document.getElementById("video3");
vid3.addEventListener("click", deleteVidButton3);
let vid4 = document.getElementById("video4");
vid4.addEventListener("click", deleteVidButton4);
let vid5 = document.getElementById("video5");
vid5.addEventListener("click", deleteVidButton5);
let vid6 = document.getElementById("video6");
vid6.addEventListener("click", deleteVidButton6);
let vid7 = document.getElementById("video7");
vid7.addEventListener("click", deleteVidButton7);
let vid8 = document.getElementById("video8");
vid8.addEventListener("click", deleteVidButton8);

setLinks();

// given function that sends a post request
async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data };

  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

async function sendGetRequest(url) {
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

async function setLinks() {
  sendGetRequest("/getList")
    .then(function (res) {

      var names = JSON.parse(res);
      for (var k=0; k < 8; k++) {
        let j = k + 1;
        let placeholder = "name" + j;
        let vid = document.getElementById(placeholder);
        vid.textContent = "";
      }
      
      for (var i = 0; i < names.length; i++)
      {
        let j = i + 1;
        let placeholder = "name" + j;
        let vid = document.getElementById(placeholder);
        vid.textContent = names[i].nickname;
      }

    })
    .catch(function(err) {
      console.log("GET link request error",err);
    });
    
  sendGetRequest("/getLength")
    .then(function (response) {
      if (response == "database full") {
        alert("THE DATABASE IS FULL");
        document.getElementById("addNew").disabled = true;
        document.getElementById("addNew").style.opacity = "0.2";
        document.getElementById("continue").disabled = false;
        document.getElementById("continue").style.opacity = "1";
      }
      else {
        document. getElementById("continue").disabled = true;
        document.getElementById("continue").style.opacity = "0.2";
        document.getElementById("addNew").disabled = false;
        document.getElementById("addNew").style.opacity = "1";
      }
    })
    .catch(function(err) {
      console.log("GET request error",err);
    });
}

function buttonPress(){
  //window.location="/tiktokpets.html";
  sendGetRequest("/getLength")
    .then(function (response) {
      console.log("GET request works");
      if (response == "database full") {
        document.getElementById("continue").disabled = false;
        console.log("ALERT");
        alert("THE DATABASE IS FULL");
        document.getElementById("addNew").disabled = true;
        document.getElementById("addNew").style.opacity = "0.2";
        
      }
      else {
        document. getElementById("continue").disabled = true;
        document.getElementById("addNew").disabled = false;
        document.getElementById("addNew").style.opacity = "1";
         window.location="/tiktokpets.html";
      }
    })
    .catch(function(err) {
      console.log("GET request error",err);
    });
  

}

async function deleteVidButton1() {
  console.log("Deleting a video number 1");
  let vid = document.getElementById("name1");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton2() {
  console.log("Deleting a video number 2");
  let vid = document.getElementById("name2");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton3() {
  console.log("Deleting a video number 3");
  let vid = document.getElementById("name3");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton4() {
  console.log("Deleting a video number 4");
  let vid = document.getElementById("name4");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton5() {
  console.log("Deleting a video number 5");
  let vid = document.getElementById("name5");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton6() {
  console.log("Deleting a video number 6");
  let vid = document.getElementById("name6");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton7() {
  console.log("Deleting a video number 7");
  let vid = document.getElementById("name7");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}

async function deleteVidButton8(){
  console.log("Deleting a video number 8");
  let vid = document.getElementById("name8");
  let data = vid.textContent;
  sendPostRequest('/deleteVideo', data)
  .then(function (res) {
      console.log("POST delete request works");
    
      setLinks();
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
}
