function barchartLogic(totWorkTime, totStudyTime, totExerciseTime) {
  
  const timerArray = [totWorkTime, totStudyTime, totExerciseTime];
 
  // Check if timer is below zero
  if (timerArray.some(time => time < 0)) {
    throw new Error("Timer values cannot be negative");
  }

  // Check if all timers are zero
  else if (timerArray.every(time => time === 0)) {
    return [
      ["Work", 0, 0],
      ["Study", 0, 0],
      ["Exercise", 0, 0]
    ];
  }
  else {
    const timers = [
      { name: 'Work', time: totWorkTime },
      { name: 'Study', time: totStudyTime },
      { name: 'Exercise', time: totExerciseTime }
    ];

    // Find the largest bar
    let bar1Time = -1;
    let bar1Name = '';
    for (const timer of timers) {
      if (timer.time > bar1Time) {
        bar1Time = timer.time;
        bar1Name = timer.name;
      }
    }

    // Find second largest bar
    let bar2Time = -1;
    let bar2Name = '';
    for (const timer of timers) {
      if (timer.name !== bar1Name && timer.time > bar2Time) {
        bar2Time = timer.time;
        bar2Name = timer.name;
      }
    }

    // Find the remaining bar 
    let bar3Time = -1;
    let bar3Name = '';
    for (const timer of timers) {
    if (timer.name !== bar1Name && timer.name !== bar2Name && timer.time > bar3Time) {
      bar3Time = timer.time;
      bar3Name = timer.name;
      }
    }

    // Width proportion calculation
    let bar1Width = 1;
    let bar2Width = bar2Time/bar1Time;
    let bar3Width = bar3Time/bar1Time;

    const bar1Array = [bar1Name, bar1Width, bar1Time];
    const bar2Array = [bar2Name, bar2Width, bar2Time];
    const bar3Array = [bar3Name, bar3Width, bar3Time];

    return [bar1Array, bar2Array, bar3Array];
  }
}
module.exports = barchartLogic;