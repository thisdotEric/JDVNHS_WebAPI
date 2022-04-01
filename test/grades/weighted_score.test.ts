import { computeWeightedScore } from '../../src/algorithms/grades';

describe('Weighted scores unit tests', () => {
  it('should compute for rounded (2 decimal places) weighted score', () => {
    const percentageScore = 90.63;
    const weightOfComponent = 0.3;

    const computedWS = /** 90.63 * 0.3 = */ 27.19;

    const actual = computeWeightedScore(percentageScore, weightOfComponent);
    expect(actual).toEqual(computedWS);
  });

  it('should throw an error when the total raw score or weight of component is a negative number', () => {
    expect(() => {
      computeWeightedScore(89, -30);
    }).toThrowError(
      'Total raw score or weight of component should be an unsigned number'
    );

    expect(() => {
      computeWeightedScore(-89, 20);
    }).toThrowError(
      'Total raw score or weight of component should be an unsigned number'
    );
  });

  // it('should throw an error if the total raw score or highest possible score is not an integer', () => {
  //   const totalRawScore = 100.22;
  //   const highestPossibleScore = 160.23;

  //   expect(() => {
  //     computePercentageScore(totalRawScore, highestPossibleScore);
  //   }).toThrowError('Scores should be a whole number');
  // });
});
