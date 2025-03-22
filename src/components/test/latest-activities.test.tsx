import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LatestActivities from '../latest-activities';
import { createActivity } from '#entities/activity';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

describe('LatestActivities', () => {
  it('renders the component with no activities', async () => {
    const { findByText } = render(<LatestActivities />);

    expect(await findByText('No activities yet')).toBeTruthy();
  });

  it('renders latest activities and handles pagination', async () => {
    const { findByText, queryByText, getByRole } = render(<LatestActivities perPage={1} />);

    // Create activities out of order to verify rendering in date order
    await act(async () => {
      await createActivity({ exercise: 'Barbell Bench Press', createdAt: new Date(2025, 0, 1) });
      await createActivity({ exercise: 'Barbell Squat', createdAt: new Date(2025, 0, 2) });
    });

    expect(await findByText('Barbell Squat')).toBeTruthy();
    expect(getByRole('button', { name: 'Edit activity: Barbell Squat' })).toBeTruthy();
    expect(queryByText('Barbell Bench Press')).toBeNull();

    const loadMoreButton = getByRole('button', { name: 'Load More' });
    await userEvent.click(loadMoreButton);

    expect(await findByText('Barbell Bench Press')).toBeTruthy();
    expect(queryByText('Barbell Squat')).toBeTruthy();
  });
});
