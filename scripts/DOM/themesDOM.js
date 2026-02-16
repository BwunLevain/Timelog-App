import { toggleThemeLogic, getInitialTheme } from '../logic/themes.js';

if (getInitialTheme(localStorage)) {
    document.body.classList.add('lightTheme');
}

export function changeTheme() {
    const currentClasses = Array.from(document.body.classList);
    
    const shouldBeLight = toggleThemeLogic(currentClasses, localStorage);
    
    if (shouldBeLight) {
        document.body.classList.add('lightTheme');
    } else {
        document.body.classList.remove('lightTheme');
    }
}

//Add eventlisterner here