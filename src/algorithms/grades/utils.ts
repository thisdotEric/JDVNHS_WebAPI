export const roundOff = (value: number) => {
  if (value < 0) throw new Error('Grade must be an unsigned number');

  return Math.round((value + Number.EPSILON) * 100) / 100;
};
