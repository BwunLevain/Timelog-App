function toggleThemeLogic(currentClasses, storage) {
    const isLight = currentClasses.includes('lightTheme');
    const nextState = !isLight;
    storage.setItem('light-theme', nextState ? 'enabled' : 'disabled');
    return nextState;
}

function getInitialTheme(storage) {
    return storage.getItem('light-theme') === 'enabled';
} 

module.exports = { toggleThemeLogic, getInitialTheme };