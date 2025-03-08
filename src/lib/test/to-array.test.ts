import { describe, it, expect } from 'vitest';
import toArray from '../to-array';

describe('toArray', () => {
  it('should return an array when given a single value', () => {
    expect(toArray(1)).to.deep.equal([1]);
  });

  it('should return the same array when given an array', () => {
    expect(toArray([1, 2, 3])).to.deep.equal([1, 2, 3]);
  });
});
