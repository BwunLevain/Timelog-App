const STORAGE_KEY = 'time_log_history';

function formatDuration(ms) {
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function logCurrentTime(category, startTime, endTime = Date.now()) {
    const existingHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const durationMs = endTime - startTime;
    const duration = formatDuration(durationMs);

    const startD = new Date(startTime);
    const endD = new Date(endTime);

    const startStr = `${startD.getFullYear()}-${pad(startD.getMonth() + 1)}-${pad(startD.getDate())} ${pad(startD.getHours())}:${pad(startD.getMinutes())}:${pad(startD.getSeconds())}`;
    const endStr = `${endD.getFullYear()}-${pad(endD.getMonth() + 1)}-${pad(endD.getDate())} ${pad(endD.getHours())}:${pad(endD.getMinutes())}:${pad(endD.getSeconds())}`;

    const entry = {
        id: Date.now(), // id needed for editing
        category,
        start: startStr,
        end: endStr,
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

export { logCurrentTime, getHistory, clearHistory, formatDuration };