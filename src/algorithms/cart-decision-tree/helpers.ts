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

  /**
   * For this dataset the only labels are true or false
   */
  for (let { conduct_intervention } of rows) {
    if (conduct_intervention) classCounts.trueCount++;
    else classCounts.falseCount++;
  }

  return classCounts;
};

/**
 * Computes the gini impurity of the given dataset
 * @param rows - Array of StudentAttriburtes interface
 * @returns number - Gini impurity value
 */
export const computeGiniImpurity = (rows: StudentAttributes[]): number => {
  const { falseCount, trueCount } = countClass(rows);
  const rowLength = rows.length;

  const true_lbl_probability = trueCount / rowLength;
  const false_lbl_probability = falseCount / rowLength;

  const gini_impurity =
    1 - Math.pow(true_lbl_probability, 2) - Math.pow(false_lbl_probability, 2);

  return gini_impurity;
};
