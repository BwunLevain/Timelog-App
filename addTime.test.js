import { isValid, toTotalSeconds, buildSession } from "./scripts/addTimeLogic.js";

describe('time validator tests', () => {

    test('should return true for correct time entry', () => {
        expect(isValid(1, 30, 30)).toBe(true);
    });

    test('inputs that are exactly at the boundary should return true', () => {
        expect(isValid(99, 59, 59)).toBe(true);
    });

    test('hours input over the limit should return false', () => {
        expect(isValid(100, 0, 0)).toBe(false);
    });

    test('minutes input over the limit should return false', () => {
        expect(isValid(0, 61, 0)).toBe(false);
    });

    test('seconds input over the limit should return false', () => {
        expect(isValid(0, 0, 61)).toBe(false);
    });

    test('all zero inputs should return true', () => {
        expect(isValid(0, 0, 0)).toBe(true);
    });
});

describe('time converter tests', () => {

    test('1 hour converts correctly to seconds', () => {
        expect(toTotalSeconds(1, 0, 0)).toBe(3600);
    });

    test('1 minute converts correctly to seconds', () => {
        expect(toTotalSeconds(0, 1, 0)).toBe(60);
    });

    test('1 second stays the same and does not convert ', () => {
        expect(toTotalSeconds(0, 0, 1)).toBe(1);
    });

    test('mixed hours, minutes and seconds should convert correctly to seconds ', () => {
        expect(toTotalSeconds(1, 50, 2)).toBe(6602);
    });

    test('all 0 inputs should return all zeroes', () => {
        expect(toTotalSeconds(0, 0, 0)).toBe(0);
    });
});

describe('build session tests', () => {

    test('startTime should correctly set the start time', () => {
        expect(buildSession(3600, "2026-02-20T10:00").startTime).toBe(new Date("2026-02-20T10:00").getTime())
    });

    test('endTime should correctly set the end time', () => {
        expect(buildSession(3600, "2026-02-20T10:00").endTime).toBe(new Date("2026-02-20T10:00").getTime() + (3600 * 1000))
    });

    test('should set the times correctly the time input is zero', () => {
        expect(buildSession(0, "2026-02-20T10:00").endTime).toBe(new Date("2026-02-20T10:00").getTime() + (0 * 1000))
    });
})