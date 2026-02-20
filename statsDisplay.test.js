import { describe, expect, jest } from '@jest/globals';

global.document = { addEventListener: jest.fn() };

const mockGetHistory = jest.fn();
const mockGetTime= jest.fn();

jest.unstable_mockModule('./scripts/localStorage.js', () => ({
  getHistory: mockGetHistory,
}));

jest.unstable_mockModule('./scripts/script.js', () => ({
    getTime: mockGetTime,
}))

const { getTotalTime, getLongestTime, getCurrentTime } = await import('./scripts/statsDisplayLogic.js');

describe('getTotalTime tests', () => {
    beforeEach(() => {
    mockGetHistory.mockReset();
    });

    test('Should return correct total time for all three categories', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '05:00:00'},
            {category: 'Exercise', duration: '07:00:00'},
            {category: 'Work', duration: '09:00:00'},
        ]);

        expect(getTotalTime()).toEqual({ Study: 5, Exercise: 7, Work: 9 });

    });

    test('Should return all zeros when history is empty', () => {
        mockGetHistory.mockReturnValue([]);

        expect(getTotalTime()).toEqual({ Study: 0, Exercise: 0, Work: 0 });
    })  

    test('Should throw error if time is negative', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '-02:00:00'} 
        ]);

        expect(() => getTotalTime()).toThrow('Timer values cannot be negative');
    });

    test('Should throw error on invalid duration', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: 'a'} 
        ]);

        expect(() => getTotalTime()).toThrow('Invalid duration');
    });

    test('Should handle multiple entries for the same category', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '02:00:00'},
            {category: 'Study', duration: '01:00:00'} 
        ]);

        expect(getTotalTime()).toEqual({Study: 3, Exercise: 0, Work: 0});
    })

    test('Should handle unknown categories', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Doomscrolling', duration: '02:00:00'}
        ]);

        expect(getTotalTime()).toEqual({ Study: 0, Exercise: 0, Work: 0 });
    });

    test('Should handle multiple entries across multiple categories', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '02:00:00'},
            {category: 'Study', duration: '01:00:00'},
            {category: 'Work', duration: '01:00:00'},
            {category: 'Exercise', duration: '04:00:00'},
            {category: 'Work', duration: '03:00:00'},
            {category: 'Exercise', duration: '01:00:00'}
        ]);

        expect(getTotalTime()).toEqual({ Study: 3, Exercise: 5, Work: 4 });
    });
  
});

describe('getLongestTime tests', () => {
    beforeEach(() => {
    mockGetHistory.mockReset();
    });

    test('Should return correct longest time for each category', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Work', duration: '05:00:00'},
            {category: 'Work', duration: '03:00:00'},
        ]);

        expect(getLongestTime()).toEqual({ Study: 0, Exercise: 0, Work: 5 });
    });

    test('Should return correct longest time for all three categories', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '02:00:00'},
            {category: 'Study', duration: '01:00:00'},
            {category: 'Work', duration: '01:00:00'},
            {category: 'Exercise', duration: '04:00:00'},
            {category: 'Work', duration: '03:00:00'},
            {category: 'Exercise', duration: '01:00:00'}
        ]);

        expect(getLongestTime()).toEqual({ Study: 2, Exercise: 4, Work: 3 });
    });

    test('Should return all zeros when history is empty', () => {
        mockGetHistory.mockReturnValue([]);

        expect(getLongestTime()).toEqual({ Study: 0, Exercise: 0, Work: 0 });
    });

    test('Should throw error if time is negative', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: '-02:00:00'}
        ]);

        expect(() => getLongestTime()).toThrow('Timer values cannot be negative');        
    });

    test('Should throw error on invalid duration', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Study', duration: 'a'} 
        ]);

        expect(() => getLongestTime()).toThrow('Invalid duration');
    });

    test('Should handle unknown categories', () => {
        mockGetHistory.mockReturnValue([
            {category: 'Doomscrolling', duration: '02:00:00'},
            {category: 'Doomscrolling', duration: '05:00:00'}
        ]);

        expect(getLongestTime()).toEqual({ Study: 0, Exercise: 0, Work: 0 });
    });


});


describe('Current session tests', () => {
    beforeEach(() => {
    mockGetTime.mockReset();
    });

    test('Should return the correct time for current session', () => {
        mockGetTime.mockReturnValue(60);

        expect(getCurrentTime()).toEqual(0.02);
    });

    test('Should return zero if timer is not running', () => {
        mockGetTime.mockReturnValue(0);

        expect(getCurrentTime()).toEqual(0);
    });

    test('Should return the corrct time for larger time values', () => {
        mockGetTime.mockReturnValue(7200);

        expect(getCurrentTime()).toEqual(2);
    });

    test('Should round the numbers correctly for odd numbers that dont divide evenly into hours', () => {
        mockGetTime.mockReturnValue(2571);

        expect(getCurrentTime()).toEqual(0.71);
    });
    

});