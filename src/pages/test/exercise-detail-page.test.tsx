import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import ExerciseDetailPage from '../exercise-detail-page';

describe('ExerciseDetailPage', () => {
  it('sets the page title', async () => {
    render(<ExerciseDetailPage params={{ exercise: 'barbell-bench-press' }} />);

    await waitFor(() => {
      expect(document.title).toBe('Conjugate Training - Barbell Bench Press');
    });
  });
});
