const { toggleThemeLogic, getInitialTheme } = require('./themes.js');

if (getInitialTheme(localStorage)) {
    document.body.classList.add('lightTheme');
}

function handleThemeToggle() {
    const currentClasses = Array.from(document.body.classList);
    const shouldBeLight = toggleThemeLogic(currentClasses, localStorage);
    
    if (shouldBeLight) {
        document.body.classList.add('lightTheme');
    } else {
        document.body.classList.remove('lightTheme');
    }
}

const toggleBtn = document.getElementById('darkModeButton');
if (toggleBtn) {
    toggleBtn.addEventListener('click', handleThemeToggle);
}