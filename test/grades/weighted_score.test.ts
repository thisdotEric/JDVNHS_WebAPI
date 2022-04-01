import { computeWeightedScore } from '../../src/algorithms/grades';

describe('Weighted scores unit tests', () => {
  it('should compute for rounded (2 decimal places) weighted score', () => {
    const weightOfComponentForWrittenWork = 0.3;
    const weightOfComponentForPerformanceTask = 0.5;

    // 90.63 * 0.3 = 27.19;
    expect(
      computeWeightedScore(90.63, weightOfComponentForWrittenWork)
    ).toEqual(27.19);

    // 83.33 * 0.5 = 41.67
    expect(
      computeWeightedScore(83.33, weightOfComponentForPerformanceTask)
    ).toEqual(41.67);
  });

  it('should throw an error when the total raw score or weight of component is a negative number', () => {
    expect(() => {
      computeWeightedScore(89, -0.3);
    }).toThrowError(
      'Total raw score or weight of component should be an unsigned number'
    );

    expect(() => {
      computeWeightedScore(-89, 0.3);
    }).toThrowError(
      'Total raw score or weight of component should be an unsigned number'
    );
  });
});
