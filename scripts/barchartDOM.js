function updateGraph(totWorkTime, totStudyTime, totExerciseTime) {

  const bars = barchartLogic(totWorkTime, totStudyTime, totExerciseTime);
  const activityList = document.querySelector('.activityList');
  
  // Clear out any old information
  activityList.innerHTML = '';
  
  // Loop through each sorted bar and create new HTML elements
  bars.forEach(([name, width, time]) => {
    // Create the main <div class="activity"> element
    const activityDiv = document.createElement('div');
    activityDiv.className = 'activity';
    activityDiv.dataset.activity = name;
    activityDiv.dataset.value = time;
    
    // Create the label <span>
    const labelSpan = document.createElement('span');
    labelSpan.className = 'activityLabel';
    labelSpan.textContent = name;
    
    // Create the bar <div> and set its width
    const valueBarDiv = document.createElement('div');
    valueBarDiv.className = 'valueBar';
    valueBarDiv.style.width = `${width * 100}%`;
    
    // Put the label and bar inside the activity div
    activityDiv.appendChild(labelSpan);
    activityDiv.appendChild(valueBarDiv);
    
    // Add the whole activity div to the list
    activityList.appendChild(activityDiv);
  });
}