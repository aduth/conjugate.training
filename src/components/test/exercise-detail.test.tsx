import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createActivity } from '#entities/activity.ts';
import { addCustomExercise } from '#entities/exercise.ts';
import ExerciseDetail from '../exercise-detail.tsx';

describe('ExerciseDetail', () => {
  it('should render latest activities for exercise with recorded activity', async () => {
    await addCustomExercise('Barbell Bench Press');
    await createActivity({ exercise: 'Barbell Bench Press' });

    const { findByText } = render(<ExerciseDetail slug="barbell-bench-press" />);

    expect(await findByText('Barbell Bench Press')).toBeTruthy();
  });

  it('should render not found when exercise does not exist', async () => {
    const { findByText } = render(<ExerciseDetail slug="missing-exercise" />);

    expect(await findByText('Exercise not found')).toBeTruthy();
  });
});
