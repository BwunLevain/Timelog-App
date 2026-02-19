import { startTimer, pauseTimer, stopTimer, formatTime } from "./script.js";

const timeDisplay = document.getElementById("timeDisplay");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

function updateDisplay(seconds) {
    timeDisplay.textContent = formatTime(seconds);
}

playBtn.addEventListener("click", () => startTimer(updateDisplay));
pauseBtn.addEventListener("click", pauseTimer);
stopBtn.addEventListener("click", () => stopTimer(updateDisplay));

updateDisplay(0);