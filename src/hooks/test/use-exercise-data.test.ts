import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useExerciseData, { isIncludedExercise } from '../use-exercise-data';

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

describe('useExerciseData', () => {
  it('fetches and filters exercises correctly', async () => {
    const { result } = renderHook(() => useExerciseData());

    await waitFor(() => expect(result.current).toEqual(['Barbell Bench Press', 'Barbell Squat']));
  });

  it('returns filtered exercises based on query', async () => {
    const { result } = renderHook(() => useExerciseData('bench'));

    await waitFor(() => expect(result.current).toEqual(['Barbell Bench Press']));
  });

  it('returns empty array if no exercises match the query', async () => {
    const { result } = renderHook(() => useExerciseData('deadlift'));

    await waitFor(() => expect(result.current).toEqual([]));
  });
});
