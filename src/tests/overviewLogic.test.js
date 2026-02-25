import { describe, jest } from "@jest/globals";

// Create mock
const mockGetHistory = jest.fn();
const mockFormatDuration = jest.fn();

// Mock localStorage.js BEFORE importing the module under test
jest.unstable_mockModule("../scripts/localStorage.js", () => ({
  getHistory: mockGetHistory,
  formatDuration: mockFormatDuration,
}));

// Dynamically import SUT
const { filterByTimeInterval, parseLocaleDate, editHistoryEntry, deleteHistoryEntry } =
  await import("../scripts/overviewLogic.js");

describe("overviewLogic", () => {
  beforeEach(() => {
    mockGetHistory.mockReset();
    mockFormatDuration.mockReset();
    jest.restoreAllMocks();
  });

  // Test to see if date format is parsed correctly
  test("parseLocaleDate correctly parses to Date format", () => {
    const dateStr = "2026-02-23 12:34:56";
    const parsedDate = parseLocaleDate(dateStr);
    expect(parsedDate).toEqual(new Date(2026, 1, 23, 12, 34, 56));
  });

  // Test to see if error is thrown for invalid date format
  test("parseLocaleDate throws on invalid format", () => {
    expect(() => parseLocaleDate("23-02-2026")).toThrow("Invalid date format");
  });

  // Test to see if history filtering works as intended
  test("filterByTimeInterval filters history correctly", () => {
    mockGetHistory.mockReturnValue([
      { start: "2026-02-20 10:00:00", end: "2026-02-20 11:00:00" },
      { start: "2026-02-25 14:00:00", end: "2026-02-25 15:00:00" },
      { start: "2026-03-01 09:00:00", end: "2026-03-01 10:00:00" },
    ]);

    const startDate = new Date("2026-02-22");
    const endDate = new Date("2026-02-28");
    endDate.setHours(23, 59, 59, 999);

    const filtered = filterByTimeInterval(startDate, endDate);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].start).toBe("2026-02-25 14:00:00");
  });
});

describe("overviewLogic - edit & delete", () => {
  beforeEach(() => {
    mockGetHistory.mockReset();
    mockFormatDuration.mockReset();
    jest.restoreAllMocks();
  });

  test("editHistoryEntry updates correct entry", () => {
    const mockHistory = [
      { // two fake inputs, one of them is valid and the other one is not
        id: 1,
        start: "2026-02-20 10:00:00",
        end: "2026-02-20 11:00:00",
        duration: "01:00:00",
      },
      {
        id: 2,
        start: "2026-02-21 10:00:00",
        end: "2026-02-21 11:00:00",
        duration: "01:00:00",
      },
    ];

    mockGetHistory.mockReturnValue(mockHistory);
    mockFormatDuration.mockReturnValue("02:00:00");

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    // adds new dates
    const newStart = new Date(2026, 1, 20, 10, 0, 0);
    const newEnd = new Date(2026, 1, 20, 12, 0, 0);

    editHistoryEntry(1, newStart, newEnd); // update the first id with new start and end

    expect(mockFormatDuration).toHaveBeenCalledWith(
      newEnd - newStart
    );

    const savedData = JSON.parse(setItemSpy.mock.calls[0][1]);

    expect(savedData[0].end).toBe("2026-02-20 12:00:00"); // end should now be 12 instead of 11 and duration should be 2h
    expect(savedData[0].duration).toBe("02:00:00");
    expect(savedData[1]).toEqual(mockHistory[1]);
  });

  test("deleteHistoryEntry removes correct entry", () => {
    const mockHistory = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]; // an array with three id's

    mockGetHistory.mockReturnValue(mockHistory);

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    deleteHistoryEntry(2); // the 2nd gets removed

    const savedData = JSON.parse(setItemSpy.mock.calls[0][1]);

    expect(savedData).toEqual([ // which leave us with 2 id's left
      { id: 1 },
      { id: 3 },
    ]);
  });
});

describe("overviewLogic - edge cases", () => {
  beforeEach(() => {
    mockGetHistory.mockReset(); // reset before every test so that the tests dont contaminate eachother
    mockFormatDuration.mockReset();
  });

  test("filterByTimeInterval returns empty array if no entries match", () => {
    mockGetHistory.mockReturnValue([
      { start: "2026-01-01 10:00:00", end: "2026-01-01 11:00:00" }, // expect this date but since the dates below are wrong
    ]);

    const startDate = new Date("2026-02-01");
    const endDate = new Date("2026-02-05");
    endDate.setHours(23, 59, 59, 999);

    const result = filterByTimeInterval(startDate, endDate);
    expect(result).toEqual([]); // we instead expect an empty array
  });

  test("filterByTimeInterval includes items exactly on start/end boundaries", () => {
    mockGetHistory.mockReturnValue([ // makes it so that more tests are included
      { start: "2026-02-22 00:00:00", end: "2026-02-22 01:00:00" }, 
      { start: "2026-02-28 23:00:00", end: "2026-02-28 23:59:59" },
      { start: "2026-03-01 10:00:00", end: "2026-03-01 11:00:00" },
    ]);

    const startDate = new Date(2026, 1, 22, 0, 0, 0);
    const endDate = new Date(2026, 1, 28, 23, 59, 59);

    const result = filterByTimeInterval(startDate, endDate);
    expect(result).toHaveLength(2);
    expect(result[0].start).toBe("2026-02-22 00:00:00");
    expect(result[1].start).toBe("2026-02-28 23:00:00");
  });

  test("editHistoryEntry does not change history if id is not found", () => {
    const mockHistory = [{ id: 1, start: "2026-02-20 10:00:00", end: "2026-02-20 11:00:00", duration: "01:00:00" }];
    mockGetHistory.mockReturnValue(mockHistory);
    mockFormatDuration.mockReturnValue("01:00:00");

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem").mockClear();

    editHistoryEntry(999, new Date(), new Date());

    const savedData = JSON.parse(setItemSpy.mock.calls[0][1]); // expects to find an id but it wont, to cover "test branch"
    expect(savedData).toHaveLength(mockHistory.length);
    expect(savedData[0]).toEqual(mockHistory[0]);
  });
});