/**
 * @jest-environment jsdom
 */

// Import the functions from script.js
const { setupTrackersMenu, setupSetAndExerciseButtons } = require('./scripts/script.js');

//temporary test that always passes
test('always passes', () => {
  expect(true).toBe(true);
});

// trackers menu tests start here

test('open trackers menu when trackers button is clicked', () => {
  document.body.innerHTML = `<button id="trackersToggle"></button>
                             <div id="trackersMenu"></div>`;

  // Call the actual function from script.js
  setupTrackersMenu();

  const trackersBtn = document.getElementById('trackersToggle');
  const trackersMenu = document.getElementById('trackersMenu');

  trackersBtn.click();

  expect(trackersMenu.classList.contains('open')).toBe(true);
  expect(trackersBtn.classList.contains('active')).toBe(true);
});

test('close back trackers menu when trackers button is clicked', () => {
  document.body.innerHTML = `<button id="trackersToggle"></button>
                             <div id="trackersMenu"></div>`;

  // Call the actual function from script.js
  setupTrackersMenu();

  const trackersBtn = document.getElementById('trackersToggle');
  const trackersMenu = document.getElementById('trackersMenu');

  trackersBtn.click();
  trackersBtn.click();

  expect(trackersMenu.classList.contains('open')).toBe(false);
  expect(trackersBtn.classList.contains('active')).toBe(false);
});

//tests for exercise and set UI starts here

test('increases number of sets displayed when log set button is clicked', () => {
  document.body.innerHTML = `<button id="logSetBtn"></button>
                            <p id="totalSet">0</p>`;

  // Call the actual function from script.js
  setupSetAndExerciseButtons();
  
  const logSetBtn = document.getElementById('logSetBtn');
  const totalSet = document.getElementById('totalSet');

  logSetBtn.click();

  expect(totalSet.textContent).toBe('1');
});

test('increases number of exercises displayed when log exercise button is clicked', () => {
  document.body.innerHTML = `<button id="logExerciseBtn"></button>
                            <p id="totalExercise">0</p>`;

  // Call the actual function from script.js
  setupSetAndExerciseButtons();

  const logExerciseBtn = document.getElementById('logExerciseBtn');
  const totalExercise = document.getElementById('totalExercise');

  logExerciseBtn.click();

  expect(totalExercise.textContent).toBe('1');
});