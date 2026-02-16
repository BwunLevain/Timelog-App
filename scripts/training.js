// training mode special buttons (set and exercise) ONLY UI!!! no logging

function increaseCounter(currentCount) {
  return currentCount + 1;
}


function setupSetAndExerciseButtons() {
  const logSetBtn = document.getElementById('logSetBtn');
  const logExerciseBtn = document.getElementById('logExerciseBtn');
  const totalSet = document.getElementById('totalSet');
  const totalExercise = document.getElementById('totalExercise');
  
  if (!logSetBtn || !logExerciseBtn || !totalSet || !totalExercise) return;
  
  let setCount = 0;
  let exerciseCount = 0;
  
  logSetBtn.addEventListener('click', () => {
    if (typeof isRunning !== 'undefined' && isRunning) return;    
    setCount = increaseCounter(setCount);
    totalSet.textContent = setCount;
  });



  logExerciseBtn.addEventListener('click', () => {
    if (typeof isRunning !== 'undefined' && isRunning) return;
    exerciseCount = increaseCounter(exerciseCount);
    totalExercise.textContent = exerciseCount;
  });
}

setupSetAndExerciseButtons();