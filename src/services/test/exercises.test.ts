import { describe, it, expect } from 'vitest';
import { isIncludedExercise } from '../exercises';

describe('isIncludedExercise', () => {
  it('should return true for strength exercises without accommodation variations', () => {
    const exercise = { category: 'strength', name: 'Squat' };

    expect(isIncludedExercise(exercise)).toBe(true);
  });

  it('should return false for non-strength exercises', () => {
    const exercise = { category: 'cardio', name: 'Skating' };

    expect(isIncludedExercise(exercise)).toBe(false);
  });

  it('should return false for strength exercises with accommodation variations', () => {
    const exercise1 = { category: 'strength', name: 'Band Squat' };
    const exercise2 = { category: 'strength', name: 'Squat with Bands' };
    const exercise3 = { category: 'strength', name: 'Squat with Chains' };
    const exercise4 = { category: 'strength', name: 'Band Bench Press' };
    const exercise5 = { category: 'strength', name: 'Hip Lift with Band' };

    expect(isIncludedExercise(exercise1)).toBe(false);
    expect(isIncludedExercise(exercise2)).toBe(false);
    expect(isIncludedExercise(exercise3)).toBe(false);
    expect(isIncludedExercise(exercise4)).toBe(false);
    expect(isIncludedExercise(exercise5)).toBe(false);
  });

  it('should return true for band-assisted strength exercises', () => {
    const exercise = { category: 'strength', name: 'Band Assisted Pull-Up' };

    expect(isIncludedExercise(exercise)).toBe(true);
  });
});
