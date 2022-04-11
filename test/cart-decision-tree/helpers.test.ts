import {
  countClass,
  ClassCount,
} from '../../src/algorithms/cart-decision-tree';

describe('CART helper methods', () => {
  it('should return an object containing the number of `true` and `false` rows', () => {
    const expected: ClassCount = { trueCount: 2, falseCount: 1 };
    const actual = countClass([
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
    ]);

    expect(actual).toStrictEqual(expected);
  });
});
