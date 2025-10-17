const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let scoreLeft = document.getElementById("leftBoard");
let scoreRight = document.getElementById("rightBoard");
let savedResult = document.getElementById("resultPrompt")
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let saveCount = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

function leftScorePlus() {
    let current = parseInt(scoreLeft.textContent);
    scoreLeft.textContent = current + 1;
}

function leftScoreMinus() {
    let current = parseInt(scoreLeft.textContent);
    if (current > 0) {
        scoreLeft.textContent = current - 1;
    }
}

function leftScoreReset() {
    scoreLeft.textContent = 0;
}

function rightScorePlus() {
    let current = parseInt(scoreRight.textContent);
    scoreRight.textContent = current + 1;
}

function rightScoreMinus() {
    let current = parseInt(scoreRight.textContent);
    if (current > 0) {
        scoreRight.textContent = current - 1;
    }
}

function rightScoreReset() {
    scoreRight.textContent = 0;
}

function save() {
  // Get current scores
  const leftScore = scoreLeft.textContent;
  const rightScore = scoreRight.textContent;

  // Increment the save counter
  saveCount++;

  // Create formatted result line
  const resultText = `${saveCount} - Team A: ${leftScore} | Team B: ${rightScore}`;

  // Display it on the page
  const p = document.createElement("p");
  p.textContent = resultText;
  savedResult.appendChild(p);
}