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

/* =========================
   CATEGORY FUNCTIONS
   ========================= */

// Edit an existing category name
function editCategory(categoryName) {
  // Get categories from LocalStorage (or empty array if none exist)
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  // Find the category by name
  const category = categories.find(cat => cat.name === categoryName);
  if (!category) return;

  // Ask user for a new category name
  const newName = prompt("Enter new category name:", category.name);
  if (!newName || newName.trim() === "") return;

  // Update category name
  category.name = newName.trim();

  // Save updated categories back to LocalStorage
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Filter categories based on a selected date interval
function getFilteredCategoriesByDateInterval(startDate, endDate) {
  // Get categories from LocalStorage
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  // Convert input dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Filter categories whose date is within the interval
  const filteredCategory = categories.filter(cat => {
    const categoryDate = new Date(cat.date);
    return categoryDate >= start && categoryDate <= end;
  });

  // Return filtered result
  return filteredCategory;
}



