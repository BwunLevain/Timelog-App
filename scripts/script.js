//trackers menu functions -- ADDED ON TOP OTHERWISE IT WILL START BY PLAY PAUSE STOP BUTTONS AND CRASHES ON PAGES LIKE OVERVIEW AND SETTINGS SINCE THOSE BUTTONS DONT EXIST --HANDE
function setupTrackersMenu() {
  const toggleBtn = document.getElementById('trackersToggle');
  const trackersMenu = document.getElementById('trackersMenu');
  
  if (!toggleBtn || !trackersMenu) return;
  
  toggleBtn.addEventListener('click', () => {
    trackersMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active');
  });
}


//start pause stop buttons
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



// training mode special buttons (set and exercise) ONLY UI!!! no logging

function setupSetAndExerciseButtons() {
  const logSetBtn = document.getElementById('logSetBtn');
  const logExerciseBtn = document.getElementById('logExerciseBtn');
  const totalSet = document.getElementById('totalSet');
  const totalExercise = document.getElementById('totalExercise');
  
  
  if (!logSetBtn && !logExerciseBtn) return;
  
  let setCount = 0;
  let exerciseCount = 0;
  
  if (logSetBtn && totalSet) {
    logSetBtn.addEventListener('click', () => {
      if (isRunning) return; 
      setCount++;
      totalSet.textContent = setCount;
    });
  }
  
  if (logExerciseBtn && totalExercise) {
    logExerciseBtn.addEventListener('click', () => {
      if (isRunning) return;
      exerciseCount++;
      totalExercise.textContent = exerciseCount;
    });
  }
}

if (typeof module === 'undefined') {
  setupTrackersMenu();
  setupSetAndExerciseButtons();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupTrackersMenu, setupSetAndExerciseButtons };
}