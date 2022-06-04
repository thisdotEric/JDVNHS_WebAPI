import { computePercentageScore } from '../../src/algorithms/grades';

describe('Percentage scores unit test', () => {
  it('should return the computed percentage score rounded in two decimal place', () => {
    // Percentage score: 145 / 160 * 100 = 90.63
    expect(computePercentageScore(145, 160)).toEqual(90.63);

    // Percentage score: 94 / 160 * 100 = 58.75
    expect(computePercentageScore(94, 160)).toEqual(58.75);

    // Percentage score: 54 / 160 * 100 = 33.75
    expect(computePercentageScore(54, 160)).toEqual(33.75);
  });

  it('should throw an error when the total raw score is higher than the highest total possible score', () => {
    const totalRawScore = 200;
    const highestPossibleScore = 160;

    expect(() => {
      computePercentageScore(totalRawScore, highestPossibleScore);
    }).toThrowError('Total score is more than the highest possible score');
  });

  it('should throw an error if the total raw score or highest possible score is not an integer', () => {
    const totalRawScore = 100.22;
    const highestPossibleScore = 160.23;

    expect(() => {
      computePercentageScore(totalRawScore, highestPossibleScore);
    }).toThrowError('Scores should be a whole number');
  });
});
