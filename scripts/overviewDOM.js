import { updateGraph } from './barchartDOM.js';
import { getHistory } from './localStorage.js';

function parseLocaleDate(dateStr) {
  if (dateStr.includes('T')) return new Date(dateStr);
  
  if (dateStr.includes('AM') || dateStr.includes('PM')) {
    return new Date(dateStr);
  }

  if (dateStr.includes('/') && dateStr.includes(',')) {
    const [datePart, timePart] = dateStr.split(', ');
    const [day, month, year] = datePart.split('/');
    return new Date(`${year}-${month}-${day}T${timePart}`);
  }

  return new Date(dateStr);
}

document.addEventListener('DOMContentLoaded', () => {
  const historyButton = document.getElementById('historyButton');
  const graphButton = document.getElementById('graphButton');
  const historySection = document.getElementById('historyOverviewArea');
  const graphSection = document.getElementById('graphView');

  // Initial state - show history, hide graph
  historySection.style.display = 'block';
  graphSection.style.display = 'none';
  graphSection.setAttribute('aria-hidden', 'true');

  // Enabling correct view depending on which button was pressed.
  historyButton.addEventListener('click', () => {
    historySection.style.display = 'block';
    graphSection.style.display = 'none';
    updateHistory();
  });

  graphButton.addEventListener('click', () => {
    historySection.style.display = 'none';
    graphSection.style.display = 'block';
    updateGraph();
  });

  function updateHistory() {
    const historyList = document.querySelector('.historyList')
    const history = getHistory();

    // Clearing history list initially
    historyList.innerHTML = '';

        // Recent entry should be first
    history.sort((a,b) => parseLocaleDate(b.start) - parseLocaleDate(a.start))

    history.forEach(entry => {
      const li = document.createElement('li')
      li.className = 'historyItem'

      const leftDiv = document.createElement('div');
      leftDiv.className = 'historyLeft';
      
      // Timer Category
      const categoryP = document.createElement('p');
      categoryP.className = 'timerCategory';
      const firstLetter = entry.category.charAt(0).toUpperCase();
      const rest = entry.category.slice(1).toLowerCase();
      categoryP.innerHTML = `<span class="first-letter">${firstLetter}</span>${rest}`;  // Use span for styling first letter larger
      leftDiv.appendChild(categoryP);

      // Timer date
      const dateP = document.createElement('p');
      dateP.className = 'timerDate';
      const startDate = parseLocaleDate(entry.start);
      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1).padStart(2, '0');
      const day = String(startDate.getDate()).padStart(2, '0');
      const date = `${year}-${month}-${day}`;
      dateP.textContent = date;
      leftDiv.appendChild(dateP)
      li.appendChild(leftDiv);

      // Timer time range 
      const timeP = document.createElement('p');
      timeP.className = 'timerTime';
      const startTime = parseLocaleDate(entry.start).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false });
      const endTime = parseLocaleDate(entry.end).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false });
      timeP.textContent = `${startTime} - ${endTime}`;
      li.appendChild(timeP);

      historyList.appendChild(li)
    })
    
    // Handle empty history
    if (history.length === 0) {
      const placeholder = document.createElement('li');
      placeholder.textContent = 'No history available.';
      placeholder.className = 'placeholder';
      historyList.appendChild(placeholder);
    }
  }
  
  updateHistory();
});