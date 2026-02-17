const barchartLogic = require('./scripts/barchartLogic');

describe('barchartLogic', () => {
  it('Should return following output', () => {
    const result = barchartLogic(10, 5, 3);
    expect(result).toEqual([
      ['work', 1, 10],
      ['study', 0.5, 5],
      ['exercise', 0.3, 3]
    ]);
  });

  it('Should throw error if time is negative', () => {
    expect(() => barchartLogic(10, -5, 3)).toThrow('Timer values cannot be negative');
    expect(() => barchartLogic(-1, 0, 0)).toThrow('Timer values cannot be negative');
  });

  it('Should return zero width and time', () => {
    const result = barchartLogic(0, 0, 0);
    expect(result).toEqual([
      ['work', 0, 0],
      ['study', 0, 0],
      ['exercise', 0, 0]
    ]);
  });

  it('Should sort correctly. study > exercise > work', () => {
    const result = barchartLogic(3, 10, 5);
    expect(result).toEqual([
      ['study', 1, 10],
      ['exercise', 0.5, 5],
      ['work', 0.3, 3]
    ]);
  });

  it('Should handle one input being zero', () => {
    const result = barchartLogic(0, 2, 1);
    expect(result).toEqual([
      ['study', 1, 2],
      ['exercise', 0.5, 1],
      ['work', 0, 0]
    ]);
  });

    it('Should handle two inputs being zero', () => {
    const result = barchartLogic(0, 0, 5);
    expect(result).toEqual([
      ['exercise', 1, 5],
      ['work', 0, 0],
      ['study', 0, 0]
    ]);
  });
});