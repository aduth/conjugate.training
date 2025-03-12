import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Route, Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import ExerciseDetailBackLink from '../exercise-detail-back-link';

describe('ExerciseDetailBackLink', () => {
  it('should render link back to exercises', () => {
    const { getByRole } = render(<ExerciseDetailBackLink slug="barbell-bench-press" />);

    const link = getByRole('link', { name: 'Back to exercises' }) as HTMLLinkElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/exercises');
  });

  it('should render link back to adding activity if referred via history link', () => {
    const { hook, searchHook } = memoryLocation({ path: '/?referrer=add-activity', static: true });
    const { getByRole } = render(
      <Router hook={hook} searchHook={searchHook}>
        <Route path="/">
          <ExerciseDetailBackLink slug="barbell-bench-press" />
        </Route>
      </Router>,
    );

    const link = getByRole('link', { name: 'Back to new activity' }) as HTMLLinkElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/activities/new?exercise=barbell-bench-press');
  });
});
