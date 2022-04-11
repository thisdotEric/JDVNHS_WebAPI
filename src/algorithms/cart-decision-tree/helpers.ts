import { StudentAttributes } from './types';

export interface ClassCount {
  trueCount: number;
  falseCount: number;
}

/**
 * Count the total number of true and false values of the given row
 * @param rows - Array of StudentsAttributes interface
 * @returns ClassCount object
 */
export const countClass = (rows: StudentAttributes[]): ClassCount => {
  const classCounts: ClassCount = { falseCount: 0, trueCount: 0 };

  for (let { conduct_intervention } of rows) {
    if (conduct_intervention) classCounts.trueCount++;
    else classCounts.falseCount++;
  }

  return classCounts;
};
