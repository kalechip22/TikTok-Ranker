let videoElmts = document.getElementsByClassName("tiktokDiv");
let reloadButtons = document.getElementsByClassName("reload");
let heartButtons = document.querySelectorAll("div.heart");
let nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", next);
let rows, chosen = -1;

for (let i=0; i<2; i++) {
  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() {
    reloadVideo(videoElmts[i])});
  heartButtons[i].addEventListener("click", function() {
    heartChange(i)});
}

// Grabs a random pair of TikTok videos from the database
getVideos();

async function getVideos() {
  sendGetRequest("/getTwoVideos")
    .then(function (res) {
      rows = res;
      let name1 = document.getElementById("name1");
      let name2 = document.getElementById("name2");
      name1.textContent = rows[0].nickname;
      name2.textContent = rows[1].nickname;

      for (let i=0; i<2; i++) {
        addVideo(rows[i].url,videoElmts[i]);
      }
      
      // Load the videos after the names are pasted in 
      loadTheVideos();
      
    })
    .catch(function(err) {
      console.log("GET video request error",err);
    });
}

async function heartChange(i) {
  try {
    let heart1 = document.getElementById("heart1");
    let heart2 = document.getElementById("heart2");
    let newHeart1 = document.getElementById("newHeart1");
    let newHeart2 = document.getElementById("newHeart2");
    console.log("HEART #", i);
    chosen = i;
  
    if (i == 0) {
      heart1.style.display = "none";
      newHeart1.style.display = "inline";
      heart2.style.display = "inline";
      newHeart2.style.display = "none";
    }

    else {
      heart1.style.display = "inline";
      newHeart1.style.display = "none";
      heart2.style.display = "none";
      newHeart2.style.display = "inline";
    }  
  } catch(err) {
    console.error(err);
  }
}

async function next() {
  try {
    let better, worse;
    if (chosen == -1) {
      console.log("Pick a favorite TikTok video");
      return 0;
    }
    else if (chosen == 0) {
      better = rows[0].rowIdNum;
      worse = rows[1].rowIdNum;
    }
    else {
      better = rows[1].rowIdNum;
      worse = rows[0].rowIdNum;
    }
    
    const pref = {
      better: better,
      worse: worse
    };
    sendPostRequest("/insertPref", JSON.stringify(pref))
    .then(function (res) {
      if (res == "pick winner") {
        window.location="/winner.html";
      }
      else {
        //window.location = "/compare.html";
        window.location.reload(true);
      }
    })
    .catch(function(err) {
      console.log("POST request error",err);
    });
  } catch(err) {
    console.error(err);
  }
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

async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: data };
 
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    console.log("RECEIVED: ", data);
    return data;
  } else {
    console.log("ERROR");
    throw Error(response.status);
  }
}