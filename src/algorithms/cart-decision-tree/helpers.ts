import {
  DecisionNode,
  DecisionTreeNode,
  LeafNode,
  Question,
} from './cart.algorithm';
import { StudentAttributes } from './types';

export type StudentAttributeKey = keyof StudentAttributes;
const AllKeys: StudentAttributeKey[] = [
  'gender',
  'passedPreTest',
  'pt_wScore',
  'qa_wScore',
  'ww_wScore',
];

export interface ClassCount {
  trueCount: number;
  falseCount: number;
}

export interface BestSplitCriteria {
  best_gain: number;
  best_question: Question;
}

export interface PartitionedDataset {
  trueDataset: StudentAttributes[];
  falseDataset: StudentAttributes[];
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
  key: StudentAttributeKey
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

  let p = leftRowsCount / leftRowsCount + rightRowsCount;
  const information_gain =
    currentInfoGain -
    p * computeGiniImpurity(left) -
    (1 - p) * computeGiniImpurity(right);

  return information_gain;
};

export const partitionDataset = (
  rows: StudentAttributes[],
  question: Question
): PartitionedDataset => {
  let trueDataset: StudentAttributes[] = [];
  let falseDataset: StudentAttributes[] = [];

  for (let row of rows) {
    /**
     * True rows does not correspond to the label of the current row
     * `trueDataset` name just corresponds to the fact the its row that matches a given question
     * This is same for `falseDataset`
     */
    if (question.checkMatch(row)) trueDataset.push(row);
    else falseDataset.push(row);
  }

  return {
    trueDataset,
    falseDataset,
  };
};

/**
 * This will be a recursive function to find the best question and best gain of a given dataset
 * @param rows
 * @returns
 */
export const findBestSplit = (rows: StudentAttributes[]): BestSplitCriteria => {
  let best_gain = 0;

  // TODO: Watchout for side effect
  let best_question: Question = new Question('gender', 'male');

  // Compute the gini impurity index of the given row
  const current_uncertainty = computeGiniImpurity(rows);

  for (let key of AllKeys) {
    let unique_values = getColumnUniqueValues(rows, key);

    for (let val of unique_values) {
      let question = new Question(key, val);

      const { trueDataset, falseDataset } = partitionDataset(rows, question);

      if (trueDataset.length == 0 || falseDataset.length == 0) continue;

      let gain = computeInformationGain(
        trueDataset,
        falseDataset,
        current_uncertainty
      );

      if (gain >= best_gain) {
        best_gain = gain;
        best_question = question;

        console.log('-----------');
        console.log(key, val);
        console.log(best_gain, best_question.questionToString());
        console.log('-----------');
      }
    }
  }

  return {
    best_gain,
    best_question,
  };
};

export const buildTree = (
  rows: StudentAttributes[]
): LeafNode | DecisionNode => {
  const { best_gain, best_question } = findBestSplit(rows);

  if (best_gain == 0) return new LeafNode(rows);

  const { trueDataset, falseDataset } = partitionDataset(rows, best_question);

  const trueBranch = buildTree(trueDataset);

  const falseBranch = buildTree(falseDataset);

  return new DecisionNode(best_question, trueBranch, falseBranch);
};

export const classify = (
  row: StudentAttributes,
  node: LeafNode | DecisionNode
): any => {
  if (node instanceof LeafNode) return node.classCounts;

  if (node.question.checkMatch(row)) return classify(row, node.trueBranch);
  else return classify(row, node.falseBranch);
};

export const printTree = (node: any, spacing: string = ' ') => {
  if (node instanceof LeafNode) {
    console.log(`${spacing} Predict ${node.classCounts}`);
    return;
  }

  console.log(`${spacing} Predict ${node.question.questionToString()}`);
  console.log(`${spacing} --> True: `);
  printTree(node.trueBranch, spacing + '  ');

  console.log(`${spacing} --> False: `);
  printTree(node.trueBranch, spacing + '  ');
};
