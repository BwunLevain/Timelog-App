const { toggleThemeLogic, getInitialTheme } = require('./scripts/themes.js');


if (getInitialTheme(localStorage)) {
    document.body.classList.add('lightTheme');
}

function changeTheme() {
    const currentClasses = Array.from(document.body.classList);
    
    const shouldBeLight = toggleThemeLogic(currentClasses, localStorage);
    
    if (shouldBeLight) {
        document.body.classList.add('lightTheme');
    } else {
        document.body.classList.remove('lightTheme');
    }
}

//eventlisterner
const toggleBtn = document.getElementById('darkModeButton');
toggleBtn.addEventListener('click', () => {
    changeTheme();
})

