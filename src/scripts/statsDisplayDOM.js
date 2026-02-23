import { getCurrentTime, getLongestTime, getTotalTime } from './statsDisplayLogic.js'

function updateTotalTimeDisplay () {
    const totalTimeDisplays = document.getElementById('totalTime');
    const categories = document.querySelector('.statsContainer').dataset.category;
    const stats = getTotalTime();
    
    totalTimeDisplays.textContent = `${stats[categories]}h`
}

function updateCurrentTimeDisplay() {
    const currentTimeDisplays = document.getElementById('currentSession');
    currentTimeDisplays.textContent = `${getCurrentTime()}h`
}

function updateLongestTimeDisplay() {
    const longestTimeDisplays= document.getElementById('longestSession');
    const categories = document.querySelector('.statsContainer').dataset.category;
    const stats = getLongestTime();

    longestTimeDisplays.textContent= `${stats[categories]}h`
}

updateTotalTimeDisplay();
updateCurrentTimeDisplay();
updateLongestTimeDisplay();

setInterval(() => { updateCurrentTimeDisplay() }, 1000);

window.addEventListener("sessionAdded", () => {
  updateTotalTimeDisplay();
  updateLongestTimeDisplay();
});