function updateGraph() {
  const bars = barchartLogic();
  const activityList = document.querySelector('.activityList');
  
  // Clear out any old information
  activityList.innerHTML = '';
  
  bars.forEach(([name, width, time]) => {
    const activityLi = document.createElement('li');
    activityLi.className = 'activity graphItem';  // CHANGED: Use 'graphItem' instead of 'historyItem'
    activityLi.dataset.activity = name.toLowerCase();
    activityLi.dataset.value = time;
    
    const fillBar = document.createElement('div');
    fillBar.className = 'fill-bar'; 
    fillBar.style.width = `${width * 90}%`;
    if (width === 1) {
      fillBar.style.borderRadius = '1rem';
    }
    activityLi.appendChild(fillBar);
    
    if (width < 1) {
      const shadowBar = document.createElement('div');
      shadowBar.className = 'shadow-bar';
      shadowBar.style.left = `calc(5% + ${width * 90}%)`;
      shadowBar.style.width = `${(1 - width) * 90}%`;
      activityLi.appendChild(shadowBar);
    }
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'graphInfo';  // CHANGED: Use 'graphInfo' instead of 'historyInfo'
    
    const categoryP = document.createElement('p');
    categoryP.className = 'graphCategory'; 
    categoryP.textContent = name.toUpperCase();
    
    infoDiv.appendChild(categoryP);
    activityLi.appendChild(infoDiv);
    
    const durationTime = document.createElement('time');
    durationTime.className = 'graphDuration';
    durationTime.textContent = `${time.toFixed(1)}h`;
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    durationTime.setAttribute('datetime', `PT${hours}H${minutes}M`);
    
    activityLi.appendChild(durationTime);
    activityList.appendChild(activityLi);
  });
}