import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ExercisesPage from '../exercises-page';

describe('ExercisesPage', () => {
  it('sets the page title', () => {
    render(<ExercisesPage />);

    expect(document.title).toBe('Conjugate Training - Exercises');
  });
});
