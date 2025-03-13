import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExerciseDetailBackLink from '../exercise-detail-back-link';

describe('ExerciseDetailBackLink', () => {
  it('should render link back to exercises', () => {
    const { getByRole } = render(<ExerciseDetailBackLink />);

    const link = getByRole('link', { name: 'Back to exercises' }) as HTMLLinkElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/exercises');
  });

  it('should render link back to adding activity if referred via history link', () => {
    history.replaceState({ activityForm: { exercise: 'Barbell Bench Press' } }, '');
    const { getByRole } = render(<ExerciseDetailBackLink />);

    const link = getByRole('link', { name: 'Back to new activity' }) as HTMLLinkElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/activities/new');
  });
});
