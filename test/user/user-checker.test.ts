import { expect } from 'chai';
import checkUserType from '../../src/algorithms/user/user-checker';

describe('user id checker', () => {
  it("should return 'student' when valid student LRN in passed", () => {
    const studentLRN = '123456789123';

    const actual = checkUserType(studentLRN);
    const expected = 'student';
    expect(actual).to.deep.equal(expected);
  });

  it("should return 'teacher' when valid teacher id is passed", () => {
    const teacherID = '1111111';

    const actual = checkUserType(teacherID);
    const expected = 'teacher';
    expect(actual).to.deep.equal(expected);
  });

  it("should return 'invalid' when invalid LRN or teacher id is passed", () => {
    const user_id = '111111w1';

    const actual = checkUserType(user_id);
    const expected = 'invalid';
    expect(actual).to.deep.equal(expected);
  });
});
