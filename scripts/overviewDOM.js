import { updateGraph } from './barchartDOM.js';
import { getHistory } from './localStorage.js';
import { filterByTimeInterval, parseLocaleDate } from './overviewLogic.js';


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

  function updateHistory(customHistory = null) {
  const historyList = document.querySelector('.historyList');
  const history = customHistory || getHistory();

  // Clearing history list initially
  historyList.innerHTML = '';

  // Recent entry should be first
  history.sort((a, b) => parseLocaleDate(b.start) - parseLocaleDate(a.start));

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


 function setupRangeSelector() {
  const rangeSelectorButton = document.getElementById('rangeSelectorButton');
  rangeSelectorButton.addEventListener('click', () => {
    const startDateStr = prompt('Enter start date (YYYY-MM-DD)');
    const endDateStr = prompt('Enter end date (YYYY-MM-DD)');

    if (!startDateStr || !endDateStr) {
      return; // Cancel if no input
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    endDate.setHours(23, 59, 59, 999); // Include full end day

    if (isNaN(startDate) || isNaN(endDate)) {
      alert('Invalid date format.');
      return;
    }

    const filteredHistory = filterByTimeInterval(startDate, endDate);
    updateHistory(filteredHistory);
  });
} 

function setupResetSelector() {
  const allTimeSelectorButton = document.getElementById('allTimeSelectorButton');
  if (allTimeSelectorButton) {
    allTimeSelectorButton.addEventListener('click', () => {
      updateHistory(); // Reset to full history
    });
  }
}

updateHistory();
setupRangeSelector();
setupResetSelector();

});