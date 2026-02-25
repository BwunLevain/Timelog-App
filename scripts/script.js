import { logCurrentTime } from "./localStorage.js";

let timer = null;
let totalSeconds = 0;
let isRunning = false;
let startTime = 0;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  // padstring is a string method, makes it so that the timer can say 00:02 and not 0.2 (adds a zero if needed)
  // also acts as a placeholder so that the timer looks a bit better
}

// Pure logic functions, no DOM
function startTimer(updateCallback) {
  if (isRunning) return;

  isRunning = true;
  startTime = Date.now();
  timer = setInterval(() => {
    //this is an interval that will loop
    totalSeconds++;
    if (updateCallback) updateCallback(totalSeconds);
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer); // it stops here since its "cleared"
  isRunning = false;
}

function stopTimer(updateCallback) {
  clearInterval(timer);
  logCurrentTime("CATEGORY", startTime, Date.now());
  isRunning = false;
  totalSeconds = 0;
  if (updateCallback) updateCallback(totalSeconds);
}

function getTime() {
  return totalSeconds;
}

export { startTimer, pauseTimer, stopTimer, getTime, formatTime };
