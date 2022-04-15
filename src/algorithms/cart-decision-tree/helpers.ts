import { StudentAttributes } from './types';

type attribute = keyof StudentAttributes;

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

export const getColumnUniqueValues = (
  rows: StudentAttributes[],
  key: attribute
): Set<any> => {
  return new Set<any>(rows.map(row => row[key]));
};

export const computeInformationGain = (
  left: StudentAttributes[],
  right: StudentAttributes[],
  currentInfoGain: number
): number => {
  const leftRowsCount = left.length;
  const rightRowsCount = right.length;

  /**
   *    p = float(len(left)) / (len(left) + len(right))
    return current_uncertainty - p * gini(left) - (1 - p) * gini(right)
    */

  let p = leftRowsCount / leftRowsCount + rightRowsCount;
  const information_gain =
    currentInfoGain -
    p * computeGiniImpurity(left) -
    (1 - p) * computeGiniImpurity(right);

  return information_gain;
};
