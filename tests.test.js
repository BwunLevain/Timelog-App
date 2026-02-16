/**
 * @jest-environment jsdom
 */

const { setupTrackersMenu } = require('./scripts/navigation.js');
const { setupSetAndExerciseButtons } = require('./scripts/training.js');

//temporary test that always passes
test('always passes', () => {
  expect(true).toBe(true);
});

// trackers menu tests start here

test('open trackers menu when trackers button is clicked', () => {
  document.body.innerHTML = `<button id="trackersToggle"></button>
                             <div id="trackersMenu"></div>`;

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
                            <button id="logExerciseBtn"></button>
                            <p id="totalSet">0</p>
                            <p id="totalExercise">0</p>`;

  setupSetAndExerciseButtons();
  
  const logSetBtn = document.getElementById('logSetBtn');
  const totalSet = document.getElementById('totalSet');

  logSetBtn.click();

  expect(totalSet.textContent).toBe('1');
});

test('increases number of exercises displayed when log exercise button is clicked', () => {
  document.body.innerHTML = `<button id="logSetBtn"></button>
                            <button id="logExerciseBtn"></button>
                            <p id="totalSet">0</p>
                            <p id="totalExercise">0</p>`;

  setupSetAndExerciseButtons();

  const logExerciseBtn = document.getElementById('logExerciseBtn');
  const totalExercise = document.getElementById('totalExercise');

  logExerciseBtn.click();

  expect(totalExercise.textContent).toBe('1');
});

test('does not increment sets when timer is running', () => {
  global.isRunning = true;
  
  document.body.innerHTML = `<button id="logSetBtn"></button>
                            <button id="logExerciseBtn"></button>
                            <p id="totalSet">0</p>
                            <p id="totalExercise">0</p>`;

  setupSetAndExerciseButtons();
  
  const logSetBtn = document.getElementById('logSetBtn');
  const totalSet = document.getElementById('totalSet');

  logSetBtn.click();

  expect(totalSet.textContent).toBe('0');
  
  delete global.isRunning;
});