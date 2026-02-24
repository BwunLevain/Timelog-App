import { jest } from '@jest/globals';

// Create mock
const mockGetHistory = jest.fn();

// Mock localStorage.js BEFORE importing the module under test
jest.unstable_mockModule('./scripts/localStorage.js', () => ({
  getHistory: mockGetHistory,
}));

// Dynamically import SUT
const { filterByTimeInterval, parseLocaleDate } = await import('./scripts/overviewLogic.js');

describe('overviewLogic', () => {

  beforeEach(() => {
    mockGetHistory.mockReset();
  });

  test('parseLocaleDate correctly parses to Date format', () => {
    const dateStr = '2026-02-23 12:34:56';
    const parsedDate = parseLocaleDate(dateStr);
    expect(parsedDate).toEqual(new Date(2026, 1, 23, 12, 34, 56));
  });

  test('filterByTimeInterval filters history correctly', () => {
    mockGetHistory.mockReturnValue([
      { start: '2026-02-20 10:00:00', end: '2026-02-20 11:00:00' },
      { start: '2026-02-25 14:00:00', end: '2026-02-25 15:00:00' },
      { start: '2026-03-01 09:00:00', end: '2026-03-01 10:00:00' },
    ]);

    const startDate = new Date('2026-02-22');
    const endDate = new Date('2026-02-28');
    endDate.setHours(23, 59, 59, 999);

    const filtered = filterByTimeInterval(startDate, endDate);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].start).toBe('2026-02-25 14:00:00');
  });

  test('parseLocaleDate falls back to native Date for non-matching formats', () => {
  const input = 'February 23, 2026 12:34:56';
  const parsed = parseLocaleDate(input);

  // Should equal what the native Date constructor produces
  expect(parsed).toEqual(new Date(input));
  });
});
