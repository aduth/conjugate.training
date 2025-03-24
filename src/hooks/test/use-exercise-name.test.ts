import { type Mock, describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useExerciseName from '../use-exercise-name';
import { db } from '#db';

vi.mock('#db', () => ({
  db: {
    exercises: {
      get: vi.fn().mockResolvedValue(undefined),
    },
  },
}));

describe('useExerciseName', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return undefined while loading', () => {
    const { result } = renderHook(() => useExerciseName('maybe-existent-slug'));

    expect(result.current).toBeUndefined();
  });

  it('should return null if no slug is provided', async () => {
    const { result } = renderHook(() => useExerciseName(null));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it('should return exercise name if slug is provided', async () => {
    (db.exercises.get as Mock).mockResolvedValue({ name: 'Barbell Squat' });

    const { result } = renderHook(() => useExerciseName('barbell-squat'));

    await waitFor(() => {
      expect(db.exercises.get).toHaveBeenCalledExactlyOnceWith({ slug: 'barbell-squat' });
    });
    expect(result.current).toBe('Barbell Squat');
  });

  it('should return null if exercise is not found', async () => {
    const { result } = renderHook(() => useExerciseName('non-existent-slug'));

    await waitFor(() => {
      expect(db.exercises.get).toHaveBeenCalledExactlyOnceWith({ slug: 'non-existent-slug' });
    });
    expect(result.current).toBeNull();
  });
});
