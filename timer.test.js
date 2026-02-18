const { startTimer, pauseTimer, stopTimer, getTime } = require("./scripts/script.js");

jest.useFakeTimers(); // makes it so that we can use time however we want

describe("Test the timer logic", () => {

    beforeEach(() => {
        stopTimer(); // reset timer
    });

    test("starts counting", () => {
        startTimer();
        jest.advanceTimersByTime(3000); //adds 3 sec to the timer
        expect(getTime()).toBe(3);
    });

    test("pauses correctly", () => {
        startTimer();
        jest.advanceTimersByTime(2000);
        pauseTimer();
        jest.advanceTimersByTime(2000);
        expect(getTime()).toBe(2);
    });

    test("stops and resets", () => {
        startTimer();
        jest.advanceTimersByTime(5000);
        stopTimer();
        expect(getTime()).toBe(0);
    });

    test("cannot start multiple timers", () => {
        startTimer();
        startTimer(); // second click should do nothing since you cant have 2 timers at the same time
        jest.advanceTimersByTime(2000);
        expect(getTime()).toBe(2);
    });
});