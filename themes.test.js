const { toggleThemeLogic, getInitialTheme } = require('./scripts/themes.js');

describe('Theme Logic', () => {
    let mockStorage;

    beforeEach(() => {
        let store = {};
        mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { store[key] = value; },
        };  
    });

    test('should return true and save "enabled" when toggling from dark', () => {
        const currentClasses = []; 
        const result = toggleThemeLogic(currentClasses, mockStorage);
        expect(result).toBe(true);
        expect(mockStorage.getItem('light-theme')).toBe('enabled');
    });

    test('should return false and save "disabled" when toggling from light', () => {
        const currentClasses = ['lightTheme'];
        const result = toggleThemeLogic(currentClasses, mockStorage);
        expect(result).toBe(false);
        expect(mockStorage.getItem('light-theme')).toBe('disabled');
    });

    test('getInitialTheme should return true if storage says enabled', () => {
        mockStorage.setItem('light-theme', 'enabled');
        expect(getInitialTheme(mockStorage)).toBe(true);
    });
});

