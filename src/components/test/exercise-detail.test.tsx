import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExerciseDetail from '../exercise-detail';

describe('ExerciseDetail', () => {
  it('should render link back to exercises', () => {
    const { getByRole } = render(<ExerciseDetail slug="barbell-bench-press" />);

    const backToExercisesLink = getByRole('link', { name: 'Back to exercises' });

    expect(backToExercisesLink).toBeTruthy();
  });
});
