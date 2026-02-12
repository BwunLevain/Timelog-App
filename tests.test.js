//temporary test that always passes
test('always passes', () => {
  expect(true).toBe(true);
});

// trackers menu tests start here

test('open trackers menu when trackers button is clicked', () => {
  document.body.innerHTML = `<button id="trackersToggle"></button>
                             <div id="trackersMenu"></div>`;

  const trackersBtn= document.getElementById('trackersToggle');
  const trackersMenu= document.getElementById('trackersMenu');

  trackersBtn.addEventListener('click', () => {
  trackersMenu.classList.toggle('open');
  trackersBtn.classList.toggle('active'); 
  });

  trackersBtn.click();

  expect(trackersMenu.classList.contains('open')).toBe(true);
  expect(trackersBtn.classList.contains('active')).toBe(true);
});

test('close back trackers menu when trackers button is clicked', () => {
  document.body.innerHTML = `<button id="trackersToggle"></button>
                             <div id="trackersMenu"></div>`;

  const trackersBtn= document.getElementById('trackersToggle');
  const trackersMenu= document.getElementById('trackersMenu');  

  trackersBtn.addEventListener('click', () => {
  trackersMenu.classList.toggle('open');
  trackersBtn.classList.toggle('active'); 
  });

  trackersBtn.click();
  trackersBtn.click();

  expect(trackersMenu.classList.contains('open')).toBe(false);
  expect(trackersBtn.classList.contains('active')).toBe(false);                
});


//tests for exercise and set UI starts here

test('increases number of sets displayed when log set button is clicked', () => {
  document.body.innerHTML= `<button id="logSet"></button>
                            <p id="totalSet"></p>`;
                            
  const logSetBtn = document.getElementById('logSet');
  const totalSet = document.getElementById('totalSet');

  let setCount = 0;
  let isRunning = false;

  logSetBtn.addEventListener('click', () => {
    if (isRunning) return;
    setCount++;
    totalSet.textContent = setCount;
  });

  logSetBtn.click();

  expect(totalSet.textContent).toBe('1');

});

test('increases number of exercises displayed when log exercise button is clicked', () => {
  document.body.innerHTML= `<button id="logExercise"></button>
                            <p id="totalExercise"></p>`;
   
  const logExerciseBtn = document.getElementById('logExercise');
  const totalExercise = document.getElementById('totalExercise');

  let exerciseCount = 0;
  let isRunning = false;

  logExerciseBtn.addEventListener('click', () => {
    if (isRunning) return;
    exerciseCount++;
    totalExercise.textContent = exerciseCount;
  });

  logExerciseBtn.click();

  expect(totalExercise.textContent).toBe('1');

});