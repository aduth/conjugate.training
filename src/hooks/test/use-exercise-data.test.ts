import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useExerciseData from '../use-exercise-data';

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
