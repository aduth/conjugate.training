import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LatestActivitiesPage from '../latest-activities-page';

describe('LatestActivitiesPage', () => {
  it('sets the page title', () => {
    render(<LatestActivitiesPage />);

    expect(document.title).toBe('Conjugate Training - Latest Activities');
  });
});
