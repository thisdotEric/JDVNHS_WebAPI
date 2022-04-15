import {
  countClass,
  ClassCount,
  computeGiniImpurity,
  StudentAttributes,
  computeInformationGain,
  getColumnUniqueValues,
} from '../../src/algorithms/cart-decision-tree';

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
});
