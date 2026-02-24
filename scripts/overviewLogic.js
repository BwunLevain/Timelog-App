import { getHistory } from './localStorage.js';

function filterByTimeInterval(startDate, endDate) {
  const history = getHistory();
  return history.filter(item => {
    const itemStart = parseLocaleDate(item.start);
    const itemEnd = parseLocaleDate(item.end);
    return itemStart >= startDate && itemEnd <= endDate;
  });
}

function parseLocaleDate(dateStr) {
  // Manually parse fixed format 'YYYY-MM-DD HH:mm:ss'
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
  if (match) {
    const [, year, month, day, hour, min, sec] = match.map(Number);
    return new Date(year, month - 1, day, hour, min, sec);
  }

  // Fallback for legacy or other formats
  return new Date(dateStr);
}

export { filterByTimeInterval, parseLocaleDate };