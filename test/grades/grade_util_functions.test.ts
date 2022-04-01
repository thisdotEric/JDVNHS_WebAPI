import { roundOff } from '../../src/algorithms/grades/utils';

describe('Grade computation utility function tests', () => {
  it('should compute for rounded (2 decimal places) value', () => {
    expect(roundOff(56.559)).toEqual(56.56);
    expect(roundOff(80.999)).toEqual(81);
    expect(roundOff(65.232)).toEqual(65.23);
  });

  it('should throw an error when value passed is a negative number', () => {
    expect(() => {
      roundOff(-89);
      roundOff(-39);
      roundOff(-80);
    }).toThrowError('Grade must be an unsigned number');
  });
});
