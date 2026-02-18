const barchartLogic = require('./scripts/barchartLogic');

describe('barchartLogic', () => {
  // Check output
  it('Should return following output', () => {
    const result = barchartLogic(10, 5, 3);
    expect(result).toEqual([
      ['Work', 1, 10],
      ['Study', 0.5, 5],
      ['Exercise', 0.3, 3]
    ]);
  });

  // Reject negative time
  it('Should throw error if time is negative', () => {
    expect(() => barchartLogic(10, -5, 3)).toThrow('Timer values cannot be negative');
    expect(() => barchartLogic(-1, 0, 0)).toThrow('Timer values cannot be negative');
  });

  // Check zero output
  it('Should return zero width and time', () => {
    const result = barchartLogic(0, 0, 0);
    expect(result).toEqual([
      ['Work', 0, 0],
      ['Study', 0, 0],
      ['Exercise', 0, 0]
    ]);
  });

  // Check sorting
  it('Should sort correctly. study > exercise > work', () => {
    const result = barchartLogic(3, 10, 5);
    expect(result).toEqual([
      ['Study', 1, 10],
      ['Exercise', 0.5, 5],
      ['Work', 0.3, 3]
    ]);
  });

  // Check one input being zero
  it('Should handle one input being zero', () => {
    const result = barchartLogic(0, 2, 1);
    expect(result).toEqual([
      ['Study', 1, 2],
      ['Exercise', 0.5, 1],
      ['Work', 0, 0]
    ]);
  });

  // Check two inputs being zero
  it('Should handle two inputs being zero', () => {
    const result = barchartLogic(0, 0, 5);
    expect(result).toEqual([
      ['Exercise', 1, 5],
      ['Work', 0, 0],
      ['Study', 0, 0]
    ]);
  });
});