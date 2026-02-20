import { updateGraph } from './barchartDOM.js';

document.addEventListener('DOMContentLoaded', () => {
  const historyButton = document.getElementById('historyButton');
  const graphButton = document.getElementById('graphButton');
  const historySection = document.getElementById('historyOverviewArea');
  const graphSection = document.getElementById('graphView');

  // Initial state - show history, hide graph
  historySection.style.display = 'block';
  graphSection.style.display = 'none';
  graphSection.setAttribute('aria-hidden', 'true');

  historyButton.addEventListener('click', () => {
    historySection.style.display = 'block';
    graphSection.style.display = 'none';
  });

  graphButton.addEventListener('click', () => {
    historySection.style.display = 'none';
    graphSection.style.display = 'block';
    updateGraph();
  });
});