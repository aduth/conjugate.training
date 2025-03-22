import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import EditActivityPage from '../edit-activity-page';
import { createActivity } from '#entities/activity';

describe('EditActivityPage', () => {
  it('sets the page title', async () => {
    const activityId = await createActivity({ exercise: 'Barbell Bench Press' });

    render(<EditActivityPage params={{ activityId }} />);

    expect(document.title).toBe('Conjugate Training - Edit Activity');
  });
});
