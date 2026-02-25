import { toggleThemeLogic, getInitialTheme } from './themes.js';
import { clearHistory } from './localStorage.js';

const toggleBtn = document.getElementById('darkModeButton');
const resetBtn = document.getElementById('localStorageResetButton');

const isInitialLight = getInitialTheme(localStorage);

if (isInitialLight) {
    document.body.classList.add('lightTheme');
}

if (toggleBtn) {
    toggleBtn.textContent = isInitialLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

function handleThemeToggle() {
    const currentClasses = Array.from(document.body.classList);
    
    const shouldBeLight = toggleThemeLogic(currentClasses, localStorage);
    
    if (shouldBeLight) {
        document.body.classList.add('lightTheme');
        toggleBtn.textContent = 'Switch to Dark Mode';
    } else {
        document.body.classList.remove('lightTheme');
        toggleBtn.textContent = 'Switch to Light Mode';
    }
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', handleThemeToggle);
}

//reset local storage button
if (resetBtn) {
    resetBtn.addEventListener('click', clearHistory);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

resetBtn.addEventListener('click', () => {
    clearHistory();
    showToast('Storage cleared successfully!');
});