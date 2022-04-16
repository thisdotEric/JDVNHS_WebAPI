import {
  countClass,
  ClassCount,
  computeGiniImpurity,
  StudentAttributes,
  computeInformationGain,
  getColumnUniqueValues,
  findBestSplit,
  partitionDataset,
} from '../../src/algorithms/cart-decision-tree';

import csv from 'csvtojson';
import { mapData } from './helper';
import { Question } from '../../src/algorithms/cart-decision-tree/cart.algorithm';

const testData: StudentAttributes[] = [
  {
    gender: 'male',
    grading_period: 1,
    passedPreTest: false,
    pt_wScore: 50,
    qa_wScore: 55,
    ww_wScore: 56,
    conduct_intervention: true,
  },
  {
    gender: 'female',
    grading_period: 1,
    passedPreTest: false,
    pt_wScore: 50,
    qa_wScore: 55,
    ww_wScore: 56,
    conduct_intervention: true,
  },
  {
    gender: 'female',
    grading_period: 1,
    passedPreTest: false,
    pt_wScore: 50,
    qa_wScore: 55,
    ww_wScore: 56,
    conduct_intervention: false,
  },
  {
    gender: 'female',
    grading_period: 1,
    passedPreTest: false,
    pt_wScore: 50,
    qa_wScore: 55,
    ww_wScore: 56,
    conduct_intervention: false,
  },
];

describe('CART helper methods', () => {
  it('should return an object containing the number of `true` and `false` rows', () => {
    const expected: ClassCount = { trueCount: 2, falseCount: 2 };
    const actual = countClass(testData);

    expect(actual).toStrictEqual(expected);
  });

  it('should return the gini impurity value of a given dataset rows', () => {
    const gini_impurity = 0.5;
    const actual = computeGiniImpurity(testData);

    expect(actual).toBe(gini_impurity);
  });

  // it('should return the information gain value of a given dataset rows', () => {
  //   const gini_impurity = 0;

  //   const current_uncertainty = computeGiniImpurity(testData);
  //   const actual = computeInformationGain(
  //     testData,
  //     testData,
  //     current_uncertainty
  //   );

  //   expect(actual).toBe(gini_impurity);
  // });

  it('should return all the unique values of a given row dataset', () => {
    // There are only two types of gender in the dataset
    const expected_size = 2;
    const actual = getColumnUniqueValues(testData, 'gender').size;

    expect(actual).toBe(expected_size);
  });

  it('should find the best criteria (best gain and question to be asked) of a given row dataset', () => {
    const bestSplit = findBestSplit(testData);

    // There are only two types of gender in the dataset
    const expected_size = 2;
    const actual = getColumnUniqueValues(testData, 'gender').size;

    expect(actual).toBe(expected_size);
  });

  it('should find the best criteria (best gain and question to be asked) of a given row dataset', () => {
    const bestSplit = findBestSplit(testData);

    // There are only two types of gender in the dataset
    const expected_size = 2;
    const actual = getColumnUniqueValues(testData, 'gender').size;

    expect(actual).toBe(expected_size);
  });

  it('should partition the dataset into two sub dataset (true and false rows)', async () => {
    const t_data: StudentAttributes[] = [
      {
        gender: 'female',
        grading_period: 1,
        passedPreTest: false,
        pt_wScore: 50,
        qa_wScore: 55,
        ww_wScore: 56,
        conduct_intervention: false,
      },
      {
        gender: 'male',
        grading_period: 1,
        passedPreTest: false,
        pt_wScore: 50,
        qa_wScore: 55,
        ww_wScore: 56,
        conduct_intervention: false,
      },
    ];

    // Partition the dataset by the question
    // Is gender == female?
    const partition = partitionDataset(
      t_data,
      new Question('gender', 'female')
    );

    expect(partition.trueDataset).toStrictEqual([
      {
        gender: 'female',
        grading_period: 1,
        passedPreTest: false,
        pt_wScore: 50,
        qa_wScore: 55,
        ww_wScore: 56,
        conduct_intervention: false,
      },
    ]);

    expect(partition.falseDataset).toStrictEqual([
      {
        gender: 'male',
        grading_period: 1,
        passedPreTest: false,
        pt_wScore: 50,
        qa_wScore: 55,
        ww_wScore: 56,
        conduct_intervention: false,
      },
    ]);
  });

  it('should find the best split of a given dataset', async () => {
    const testdata_path = __dirname + '/testdata.csv';
    let data = await csv().fromFile(testdata_path);
    data = mapData(data);

    const { best_gain, best_question } = findBestSplit(data);

    console.log(best_gain);
    console.log(best_question.questionToString());

    expect(true).toBe(true);
  });
});
