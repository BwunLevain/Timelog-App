import { getHistory, formatDuration } from "./localStorage.js";

// Function that filters the localStorage history to user input date
function filterByTimeInterval(startDate, endDate) {
  const history = getHistory();
  return history.filter((item) => {
    const itemStart = parseLocaleDate(item.start);
    const itemEnd = parseLocaleDate(item.end);
    return itemStart >= startDate && itemEnd <= endDate;
  });
}

// Parsing user input
function parseLocaleDate(dateStr) {
  // Manually parse fixed format 'YYYY-MM-DD HH:mm:ss'
  const match = dateStr.match(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
  );
  if (match) {
    const [, year, month, day, hour, min, sec] = match.map(Number);
    return new Date(year, month - 1, day, hour, min, sec);
  } else {
    // If the string does not match raise error
    throw new Error(
      `Invalid date format: "${dateStr}". Expected "YYYY-MM-DD HH:mm:ss"`,
    );
  }
}
// Formats the time so that it fits the local time, mirrors the time and date that your computer is in
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

// edit button
function editHistoryEntry(id, newStart, newEnd) {
  const history = getHistory();
  
  const saveStart = formatLocalDate(newStart);
  const saveEnd = formatLocalDate(newEnd);
  
  const updatedHistory = history.map((entry) => {
    if (Number(entry.id) === Number(id)) {
      return {
        ...entry,
        start: saveStart,
        end: saveEnd,
        duration: formatDuration(newEnd - newStart),
      };
    }
    return entry;
  });
  localStorage.setItem("time_log_history", JSON.stringify(updatedHistory));
}

// delete button
function deleteHistoryEntry(id) {
  const history = getHistory();

  const updatedHistory = history.filter(
    (entry) => Number(entry.id) !== Number(id)
  );

  localStorage.setItem("time_log_history", JSON.stringify(updatedHistory));
}

export { filterByTimeInterval, parseLocaleDate, editHistoryEntry, deleteHistoryEntry, };