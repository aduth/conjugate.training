import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ExerciseDetailPage from '../exercise-detail-page';
import { createActivity } from '#entities/activity.ts';
import { addCustomExercise } from '#entities/exercise.ts';

describe('ExerciseDetailPage', () => {
  it('sets the page title', () => {
    render(<ExerciseDetailPage params={{ exercise: 'barbell-bench-press' }} />);

    expect(document.title).toBe('Conjugate Training - Exercise Detail');
  });

  it('should render latest activities for exercise with recorded activity', async () => {
    await addCustomExercise('Barbell Bench Press');
    await createActivity({ exercise: 'Barbell Bench Press' });

    const { findByText } = render(
      <ExerciseDetailPage params={{ exercise: 'barbell-bench-press' }} />,
    );

    expect(await findByText('Barbell Bench Press')).toBeTruthy();
  });
});
