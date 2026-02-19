import { toggleThemeLogic, getInitialTheme } from './scripts/themes.js';

describe('Theme Logic Module', () => {
    let mockStorage;

    beforeEach(() => {
        let store = {};
        mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { 
                store[key] = value.toString(); 
            },
            clear: () => { store = {}; }
        };  
    });

    describe('toggleThemeLogic()', () => {
        test('should return true and save "enabled" when toggling from dark (empty classes)', () => {
            const currentClasses = []; 
            const result = toggleThemeLogic(currentClasses, mockStorage);
            
            expect(result).toBe(true);
            expect(mockStorage.getItem('light-theme')).toBe('enabled');
        });

        test('should return false and save "disabled" when toggling from light (lightTheme present)', () => {
            const currentClasses = ['lightTheme', 'other-class'];
            const result = toggleThemeLogic(currentClasses, mockStorage);
            
            expect(result).toBe(false);
            expect(mockStorage.getItem('light-theme')).toBe('disabled');
        });
    });

    describe('getInitialTheme()', () => {
        test('should return true if storage contains "enabled"', () => {
            mockStorage.setItem('light-theme', 'enabled');
            expect(getInitialTheme(mockStorage)).toBe(true);
        });

        test('should return false if storage contains "disabled"', () => {
            mockStorage.setItem('light-theme', 'disabled');
            expect(getInitialTheme(mockStorage)).toBe(false);
        });

        test('should return false if storage is empty (default state)', () => {
            expect(getInitialTheme(mockStorage)).toBe(false);
        });
    });
});