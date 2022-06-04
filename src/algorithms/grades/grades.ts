import { roundOff } from './utils';

export const computePercentageScore = (
  totalRawScore: number,
  highestPossibleScore: number
): number => {
  if (totalRawScore > highestPossibleScore)
    throw new Error('Total score is more than the highest possible score');

  if (
    !Number.isInteger(totalRawScore) ||
    !Number.isInteger(highestPossibleScore)
  )
    throw new Error('Scores should be a whole number');

  const score = (totalRawScore / highestPossibleScore) * 100;

  return roundOff(score);
};

export const computeWeightedScore = (
  percentageScore: number,
  weightOfComponent: number
): number => {
  if (percentageScore < 0 || weightOfComponent < 0)
    throw new Error(
      'Total raw score or weight of component should be an unsigned number'
    );

  const decimalWeightedScore = percentageScore * weightOfComponent;

  return roundOff(decimalWeightedScore);
};

export const computeFinalGrade = (quarterlyGrades: number[]): number => {
  const finalGrade =
    quarterlyGrades.reduce((prev: number, curr: number) => prev + curr) / 4;

  return roundOff(finalGrade);
};
