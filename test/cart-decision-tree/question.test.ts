import { Question } from '../../src/algorithms/cart-decision-tree/cart.algorithm';

describe('Question class', () => {
  it('should create a question', () => {
    const question1 = new Question('gender', 'female');
    const expectedQuestionString = 'Is gender == female?';
    const actualQuestionString = question1.questionToString();

    const question2 = new Question('grading_period', 1);
    const expectedQuestionString2 = 'Is grading_period >= 1?';
    const actualQuestionString2 = question2.questionToString();

    expect(actualQuestionString).toBe(expectedQuestionString);
    expect(actualQuestionString2).toBe(expectedQuestionString2);
  });
});
