jest.mock('./scripts/localStorage.js'); 

const { getHistory } = require('./scripts/localStorage.js');
const barchartLogic = require('./scripts/barchartLogic.js'); //

describe('barchartLogic', () => {
  beforeEach(() => {
    getHistory.mockReset();
  });

  // Check output
  it('Should return following output', () => {
    // Mock history - simulating: Work=10h, Study=5h, Exercise=3h
    getHistory.mockReturnValue([
      { category: 'Work', duration: '10:00:00' }, // 10.0
      { category: 'Study', duration: '05:00:00' }, // 5.0
      { category: 'Exercise', duration: '03:00:00' } // 3.0
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Work', 1, 10.0],
      ['Study', 0.5, 5.0],
      ['Exercise', 0.3, 3.0]
    ]);
  });

  // Reject negative time
  it('Should throw error if time is negative', () => {
    getHistory.mockReturnValue([
      // Will result in NaN
      { category: 'Study', duration: '-05:00:00' } 
    ]);
    expect(() => barchartLogic()).toThrow('Timer values cannot be negative'); // Adjust if needed
  });

  // Check zero output
  it('Should return zero width and time', () => {
    getHistory.mockReturnValue([]); // Empty -> all 0
    const result = barchartLogic();
    expect(result).toEqual([
      ['Work', 0, 0],
      ['Study', 0, 0],
      ['Exercise', 0, 0]
    ]);
  });

  // Check sorting
  it('Should sort correctly. study > exercise > work', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '03:00:00' }, // 3.0
      { category: 'Study', duration: '10:00:00' }, // 10.0
      { category: 'Exercise', duration: '05:00:00' } // 5.0
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Study', 1, 10.0],
      ['Exercise', 0.5, 5.0],
      ['Work', 0.3, 3.0]
    ]);
  });

  // Check one input being zero
  it('Should handle one input being zero', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '00:00:00' }, // 0
      { category: 'Study', duration: '02:00:00' }, // 2.0
      { category: 'Exercise', duration: '01:00:00' } // 1.0
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Study', 1, 2.0],
      ['Exercise', 0.5, 1.0],
      ['Work', 0, 0]
    ]);
  });

  // Check two inputs being zero
  it('Should handle two inputs being zero', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '00:00:00' }, // 0
      { category: 'Study', duration: '00:00:00' }, // 0
      { category: 'Exercise', duration: '05:00:00' } // 5.0
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Exercise', 1, 5.0],
      ['Work', 0, 0],
      ['Study', 0, 0]
    ]);
  });

  // Check that multiple entries work and that adding works
  it('Should sum multiple entries per category', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '01:00:00' },
      { category: 'Work', duration: '02:00:00' },
      { category: 'Study', duration: '04:00:00' },
      { category: 'Exercise', duration: '00:30:00' },
      { category: 'Exercise', duration: '00:30:00' }
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Study', 1, 4.0],
      ['Work', 0.75, 3.0],
      ['Exercise', 0.25, 1.0]
    ]);
  });

  // Handle rounding
  it('Should handle rounding to one decimal', () => {
    getHistory.mockReturnValue([
      // 1.25 => 1.3
      { category: 'Work', duration: '01:15:00' },
      // 0.75 => 0.8
      { category: 'Study', duration: '00:45:00' }
    ]);
    const result = barchartLogic();
    expect(result[0][2]).toBe(1.3);
    expect(result[1][2]).toBe(0.8);
    expect(result[2][2]).toBe(0);
    expect(result[1][1]).toBeCloseTo(0.8 / 1.3, 1);
  });

  // Check if a category has a different name from expected
  it('Should ignore unknown categories', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '01:00:00' }, //1.0
      { category: 'AI-kompis consultation', duration: '1000:00:00' }
    ]);
    const result = barchartLogic();
    expect(result).toEqual([
      ['Work', 1, 1.0],
      ['Study', 0, 0],
      ['Exercise', 0, 0]
    ]);
  });

  // Check if duration does not have the correct time format
  it('Should throw on invalid duration', () => {
    getHistory.mockReturnValue([
      { category: 'Work', duration: '01:00' }
    ]);
    expect(() => barchartLogic()).toThrow('Invalid duration');
  });
});