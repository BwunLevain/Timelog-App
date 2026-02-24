import { isValid, toTotalSeconds, buildSession } from "./addTimeLogic.js";
import { logCurrentTime } from "./localStorage.js";

const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addTimeButton");

addBtn.addEventListener("click", () => {
  const h = parseInt(hoursInput.value) || 0;
  const m = parseInt(minutesInput.value) || 0;
  const s = parseInt(secondsInput.value) || 0;

  if (!timeInput.value) {
    alert("Please enter a start time");
    return;
  }

  const now = new Date();
  const day = (now.getDate()).toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = (now.getFullYear()).toString().padStart(4, "0");

  const datePart = dateInput.value || `${year}-${month}-${day}`;
  const datetime = `${datePart}T${timeInput.value}`;

  if (!isValid(h, m, s)) {
    alert("Hours must be 99 or under, minutes and seconds must be 59 or under");
    return;
  }

  const totalSecs = toTotalSeconds(h, m, s);

  if (totalSecs === 0) {
    alert("Please enter a duration greater than 0");
    return;
  }

  saveSession(totalSecs, datetime);
  window.dispatchEvent(new CustomEvent("sessionAdded"));

  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;
  dateInput.value = "";
  timeInput.value = "";
});

function saveSession(totalSecs, datetime) {
  const { startTime, endTime } = buildSession(totalSecs, datetime);
  const category = document.querySelector(".statsContainer").dataset.category;
  logCurrentTime(category, startTime, endTime);

  document.querySelectorAll('.number-card').forEach(el => {
    el.setAttribute('datetime', datetime);
  });
}