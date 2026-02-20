export function toggleThemeLogic(currentClasses, storage) {
    const isCurrentlyLight = currentClasses.includes('lightTheme');
    const nextState = !isCurrentlyLight;
    storage.setItem('light-theme', nextState ? 'enabled' : 'disabled');
    return nextState;
}

export function getInitialTheme(storage) {
    return storage.getItem('light-theme') === 'enabled';
}