const STORAGE_KEY = 'time_log_history';

function logCurrentTime(category, startTime) {
    const existingHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const endTime = Date.now();
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
    // Restored the logical OR (||)
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("History cleared.");
}