import { getHistory } from './localStorage.js'
import {getTime} from './script.js'

function parseDuration(duration) {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  const totalHours = hours + (minutes / 60) + (seconds / 3600);
  return totalHours
}

function getTotalTime() {
    const allHistory = getHistory()

    let totalStudyTime = 0;
    let totalExerciseTime = 0;
    let totalWorkTime = 0;

    for (const timerEntry of allHistory) {
        const hours = parseDuration(timerEntry.duration)
        switch (timerEntry.category) {
            case 'Study':
                totalStudyTime += hours
                break;
            case 'Exercise':
                totalExerciseTime += hours
                break;
            case 'Work':
                totalWorkTime += hours
                break;
            }   
    }

    totalStudyTime = Math.round(totalStudyTime * 100) / 100;
    totalExerciseTime = Math.round(totalExerciseTime * 100) / 100;
    totalWorkTime = Math.round(totalWorkTime * 100) / 100;

    const timerArray = [totalStudyTime, totalExerciseTime, totalWorkTime];

    if (timerArray.some(time => !Number.isFinite(time))) {
    throw new Error('Invalid duration');
  }

    if (timerArray.some(time => time < 0)) {
        throw new Error("Timer values cannot be negative");
    }

    else if (timerArray.every(time => time === 0)) {
        return { Study: 0, Exercise: 0, Work: 0 }
    }
    else {
       return { Study: totalStudyTime, Exercise: totalExerciseTime,  Work: totalWorkTime }
        
    } 

}

function getCurrentTime() {
    let currentTime = getTime()/3600

    currentTime = Math.round(currentTime * 100) / 100;

    return currentTime;
    
}

function getLongestTime() {
    const allHistory = getHistory()

    let longestStudyTime = 0;
    let longestExerciseTime = 0;
    let longestWorkTime = 0;

    for (const timerEntry of allHistory) {
        const hours = parseDuration(timerEntry.duration)
        if (hours < 0) {
            throw new Error('Timer values cannot be negative');
        }
        if (!Number.isFinite(hours)){
            throw new Error('Invalid duration');
        }
        switch (timerEntry.category) {
            case 'Study':
                if (hours > longestStudyTime ) {
                    longestStudyTime = hours;
                }
                break;
            case 'Exercise':
                if (hours > longestExerciseTime) {
                    longestExerciseTime = hours;
                }
                break;
            case 'Work':
                if (hours > longestWorkTime) {
                    longestWorkTime = hours;
                }
                break;
            }   
    }

    longestStudyTime = Math.round(longestStudyTime * 100) / 100;
    longestExerciseTime = Math.round(longestExerciseTime * 100) / 100;
    longestWorkTime = Math.round(longestWorkTime * 100) / 100;

    
    return { Study: longestStudyTime, Exercise: longestExerciseTime,  Work: longestWorkTime }
        
}

export { getTotalTime, parseDuration, getCurrentTime, getLongestTime }