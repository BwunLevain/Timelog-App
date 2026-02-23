const STORAGE_KEY = 'time_log_history';

function formatDuration(ms) {
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function logCurrentTime(category, startTime, endTime = Date.now()) {
    const existingHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const durationMs = endTime - startTime;

    // Convert ms → hh:mm:ss
    const duration = formatDuration(durationMs);

    const entry = {
        category,
        start: new Date(startTime).toLocaleString(),
        end: new Date(endTime).toLocaleString(),
        duration
    };

    existingHistory.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingHistory));

    console.log(`Logged: ${entry.start} → ${entry.end}`);
    console.log(`Category: ${category}`);
    console.log(`Duration: ${duration}`);
}


function getHistory() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("History cleared.");
}

// Initializing a sample for localStorage
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('time_log_history')) {
    const sampleHistory = [
      {
        category: 'Study',
        start: '18/02/2026, 10:00:00',
        end: '18/02/2026, 10:30:00',
        duration: '00:30:00'
      },
      {
        category: 'Work',
        start: '18/02/2026, 11:00:00',
        end: '18/02/2026, 14:00:00',
        duration: '03:00:00'
      },
      {
        category: 'Exercise',
        start: '18/02/2026, 12:00:00',
        end: '18/02/2026, 13:30:00',
        duration: '01:30:00'
      }
    ];
    localStorage.setItem('time_log_history', JSON.stringify(sampleHistory));
    console.log('Sample history data added to localStorage.');
  }
});

export { logCurrentTime, getHistory, clearHistory, formatDuration };