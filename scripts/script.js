const timeDisplay = document.getElementById("timeDisplay");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

let timer = null;
let totalSeconds = 0;
let isRunning = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    // padstring is a string method, makes it so that the timer can say 00:02 and not 0.2 (adds a zero if needed)
    // also acts as a placeholder so that the timer looks a bit better
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(totalSeconds);
}

function startTimer() {
    if (isRunning) return; // having a problem where I can start multiple timers

    isRunning = true;
    timer = setInterval(() => { //this is an interval that will loop
        totalSeconds++;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer); //  it stops here since its "cleared"
    isRunning = false;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    totalSeconds = 0;
    updateDisplay(); 
}

playBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
stopBtn.addEventListener("click", stopTimer);

updateDisplay();
