import { getCurrentTime, getLongestTime, getTotalTime } from './statsDisplayLogic.js'

function updateTotalTimeDisplay () {
    const totalTimeDisplays = document.getElementById('totalTime');
    const categories = document.querySelector('.statsContainer').dataset.category;
    const stats = getTotalTime();
    
    totalTimeDisplays.textContent = `${stats[categories]}h`
}

updateTotalTimeDisplay()

function updateCurrentTimeDisplay() {
    const currentTimeDisplays = document.getElementById('currentSession');
    
    currentTimeDisplays.textContent = `${getCurrentTime()}h`
}

updateCurrentTimeDisplay()

function updateLongestTimeDisplay() {
    const longestTimeDisplays= document.getElementById('longestSession');
    const categories = document.querySelector('.statsContainer').dataset.category;
    const stats = getLongestTime();

    longestTimeDisplays.textContent= `${stats[categories]}h`
}

updateLongestTimeDisplay()

setInterval(() => { updateCurrentTimeDisplay() }, 1000)
