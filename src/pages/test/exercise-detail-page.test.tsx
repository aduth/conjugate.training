import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ExerciseDetailPage from '../exercise-detail-page';

describe('ExerciseDetailPage', () => {
  it('sets the page title', () => {
    render(<ExerciseDetailPage params={{ exercise: 'barbell-bench-press' }} />);

    expect(document.title).toBe('Conjugate Training - Exercise Detail');
  });
});
