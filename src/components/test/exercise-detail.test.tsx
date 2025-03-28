import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createActivity } from '#entities/activity';
import { addCustomExercise } from '#entities/exercise';
import ExerciseDetail from '../exercise-detail';

describe('ExerciseDetail', () => {
  it('should render latest activities for exercise with recorded activity', async () => {
    await addCustomExercise('Barbell Bench Press');
    await createActivity({ exercise: 'Barbell Bench Press' });

    const { findByRole } = render(<ExerciseDetail slug="barbell-bench-press" />);

    expect(await findByRole('heading', { name: 'Barbell Bench Press' })).toBeTruthy();
  });

  it('should render not found when exercise does not exist', async () => {
    const { findByText } = render(<ExerciseDetail slug="missing-exercise" />);

    expect(await findByText('Exercise not found')).toBeTruthy();
  });
});
