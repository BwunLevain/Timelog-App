function isValid(h, m, s) {
  return h <= 99 && m <= 59 && s <= 59;
}

function toTotalSeconds(h, m, s) {
  return h * 3600 + m * 60 + s;
}

function buildSession(totalSecs, datetime) {
  const startTime = new Date(datetime).getTime();
  const endTime = startTime + (totalSecs * 1000);
  return { startTime, endTime };
}

export { isValid, toTotalSeconds, buildSession };